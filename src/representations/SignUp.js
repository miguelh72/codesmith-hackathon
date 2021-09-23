import './SignUp.css';

export default function SignUp(props) {


  console.log({ props });

  return (
    <div id="signup" className="wrapper">
      <header>
        <img id="logo" src="wizard-logo.png" alt="Codesmith Wizard logo" />
        <h1>Codesmith Wizard</h1>
      </header>
      <p className="light">Ready for PP?</p>
      <p className="light">Don't know where to go?</p>
      <p className="light">Let CS Wizard help!</p>
      <div className="form">
        <h3>What's your Slack name?</h3>
        <input type="text" id="first" name="first" placeholder="First Name" value={props.nameFormValues[0]} onChange={props.handleNameChange} />
        <input type="text" id="last" name="last" placeholder="Last Name" value={props.nameFormValues[1]} onChange={props.handleNameChange} />
        <button id="save" className="btn" type="submit" onClick={props.handleNameSubmission}>Submit</button>
      </div>
    </div>
  );
}