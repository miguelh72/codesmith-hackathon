/*global chrome*/

import { useCallback, useEffect, useState } from 'react';

import './DefaultPopup.css';

function DefaultPopup(props) {
  // initial value for username from storage

  /* State */

  const [name, setName] = useState(undefined);
  const [lastPPLink, setLastPPLink] = useState(undefined);
  const [nameFormValue, setNameFormValue] = useState('');

  /* Effect hooks */

  useEffect(() => {
    chrome.storage.sync.get(['name', 'lastPPLink'], function (result) {
      setName(result.name);
      setLastPPLink(result.lastPPLink);
    });
  }, []);

  /* Callbacks */

  const handleNameChange = useCallback(event => setNameFormValue(event.target.value), []);

  const handleNameSubmission = useCallback(
    () => {
      setName(nameFormValue);
      setNameFormValue('');

      // Store name to chrome storage
      chrome.storage.sync.set({ name: nameFormValue }, () => {
        console.log('Name is set to ' + nameFormValue + 'in local storage'); // TODO remove

        chrome.storage.sync.get(['name'], function (result) {
          console.log({ result });
          console.log('Value currently is ' + result.name);
        });
      });
    },
    [nameFormValue]
  )

  /* Render */

  return (
    <div className="App">
      <header className="App-header">
        <h1> CodeSmith Wizard </h1>

        { /* TODO add logo */}

      </header>
      <main>
        {name
          ? <>
            <h2>Hi, {name}!</h2>
            {lastPPLink && <a href={lastPPLink} target="_blank" rel="noreferrer">Join Room!</a>}
          </>
          : <>
            <h2>Welcome to CodeSmith Wizard!</h2>
            <p>Are you tired of searching through #general on Slack for your partner's room link?</p>
            <p>Set up your name the way it appears in discord group messages and this extension will always let you know where to go.</p>
            <p>It's like a magic link!</p>
            <h3>Name To Match</h3>
            <p>Less is more</p>
            <input type="text" id="name" name="name" value={nameFormValue} onChange={handleNameChange} />
            <button id="save" type="submit" onClick={handleNameSubmission}>Save</button>
          </>
        }
      </main>
    </div>
  );
}

export default DefaultPopup;
