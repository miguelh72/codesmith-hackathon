import './MissingInfo.css';

export default function MissingInfo(props) {
  return (
    <div id="missinginfo" className="wrapper">
      <header>
        <img id="logo" src="wizard-logo.png" alt="Codesmith Wizard logo" />
        <h1>Welcome, {props.name}! </h1>
      </header>
      <main>
        <p className="light">Wizard needs to Conjure...</p>
        <a className='btn' href={`https://${props.slackOrg}/messages/general`} target="_blank" rel="noreferrer">Open Slack!</a>
      </main>
      <div id='settings' onClick={props.openConfig}><img src="settings.png" alt="settings" /></div>
    </div>
  );
}