import './Teleport.css';

export default function Teleport(props) {
  return (
    <div id="teleport" className="wrapper">
      <header>
        <img id="logo" src="wizard-logo.png" alt="Codesmith Wizard logo" />
        <h1>Welcome, {props.name}! </h1>
      </header>
      <main>
        <p className='light'>Spell is ready to cast!</p>
        <a className='btn' href={props.lastPPLink} target="_blank" rel="noreferrer">🗲 Teleport 🗲</a>
      </main>
      <div id='settings' onClick={props.openConfig}><img src="settings.png" alt="settings" /></div>
    </div>
  );
}