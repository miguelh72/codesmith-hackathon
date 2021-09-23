/* global chrome */
import { useEffect, useCallback, useState } from 'react';

import './App.css';

import SignUp from './../representations/SignUp';
import MissingInfo from './../representations/MissingInfo';
import Teleport from './../representations/Teleport';
import Config from './../representations/Config';

function App(props) {
  /* State */

  const [name, setName] = useState(undefined); // [first, last]
  const [lastPPLink, setLastPPLink] = useState(undefined);
  const [nameFormValues, setNameFormValues] = useState(['', '']);
  const [showConfig, setShowConfig] = useState(false);
  const [slackOrg, setSlackOrg] = useState('codesmithremo-0tu5630.slack.com');
  const [slackOrgFormValue, setSlackOrgFormValue] = useState(slackOrg);

  /* Effect hooks */

  useEffect(() => {
    chrome.storage.sync.get(['name', 'lastPPLink', 'slackOrg'], function (result) {
      setName(result.name[0]);
      setNameFormValues(result.name);
      setLastPPLink(result.lastPPLink);
      setSlackOrg(result.slackOrg || 'codesmithremo-0tu5630.slack.com');
    });
  }, []);

  /* Callbacks */

  const handleNameChange = useCallback(event => {
    if (event.target.id === 'first') {
      setNameFormValues([event.target.value, nameFormValues[1]]);
    }
    if (event.target.id === 'last') {
      setNameFormValues([nameFormValues[0], event.target.value]);
    }
  }, [nameFormValues]);

  const handleNameSubmission = useCallback(
    () => {
      setName(nameFormValues[0]);
      setNameFormValues(['', '']);

      // Store name to chrome storage
      chrome.storage.sync.set({ name: nameFormValues }, () => {
        console.log('Name is set to ' + nameFormValues.join(' ') + 'in local storage'); // TODO remove
      });
    },
    [nameFormValues]
  );

  const handleSlackOrgFormValueChange = useCallback(
    (event) => {
      setSlackOrgFormValue(event.target.value);
    }, []
  );

  const handleSaveSlackOrgSubmission = useCallback(
    () => {
      setSlackOrg(slackOrgFormValue);
      // Store name to chrome storage
      chrome.storage.sync.set({ slackOrg: slackOrgFormValue }, () => {
        console.log('slackOrg is set to ' + slackOrgFormValue.join(' ') + 'in local storage'); // TODO remove
      });
    }, [slackOrgFormValue]
  )

  const openConfig = useCallback(
    () => {
      setShowConfig(true);
    }, []
  );

  const closeConfig = useCallback(
    () => {
      setShowConfig(false);
    }, []
  );

  /* Render */
  if (showConfig) return <Config
    nameFormValues={nameFormValues}
    handleNameChange={handleNameChange}
    handleNameSubmission={handleNameSubmission}
    slackOrg={slackOrg}
    slackOrgFormValue={slackOrgFormValue}
    handleSlackOrgFormValueChange={handleSlackOrgFormValueChange}
    handleSaveSlackOrgSubmission={handleSaveSlackOrgSubmission}
    closeConfig={closeConfig}
  />;
  else if (!name)
    return <SignUp
      nameFormValues={nameFormValues}
      handleNameChange={handleNameChange}
      handleNameSubmission={handleNameSubmission}
    />;
  else if (!lastPPLink /* TODO or too old */)
    return <MissingInfo
      name={name}
      lastPPLink={lastPPLink}
      slackOrg={slackOrg}
      setShowConfig={setShowConfig}
      openConfig={openConfig}
    />;
  else
    return <Teleport
      name={name}
      lastPPLink={lastPPLink}
      setShowConfig={setShowConfig}
      openConfig={openConfig}
    />;
}

export default App;