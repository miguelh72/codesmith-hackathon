import './Config.css';

export default function Config(props) {
  // TODO develop
  return (
    <div id="config" className="wrapper">
      <header>
        <img id="logo" src="wizard-logo.png" alt="Codesmith Wizard logo" />
        <h1>Configuration</h1>
      </header>
      <div className="form">
        <h3>Change Slack Name</h3>
        <input type="text" id="first" name="first" placeholder="First Name" value={props.nameFormValues[0]} onChange={props.handleNameChange} />
        <input type="text" id="last" name="last" placeholder="Last Name" value={props.nameFormValues[1]} onChange={props.handleNameChange} />
        <button id="save" className="btn" type="submit" onClick={props.handleNameSubmission}>Save</button>
      </div>
      <div className="form">
        <h3>Set Slack Organization</h3>
        <input type="text" id="slackorg" name="slackorg" placeholder="First Name" value={props.slackOrgFormValue} onChange={props.handleSlackOrgFormValueChange} />
        <button id="saveSlackOrg" className="btn" type="submit" onClick={props.handleSaveSlackOrgSubmission}>Save</button>
      </div>
      <div id='settings' onClick={props.closeConfig}><img src="back.png" alt="settings" /></div>
    </div>
  );
}