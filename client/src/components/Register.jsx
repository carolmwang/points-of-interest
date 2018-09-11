import React from 'react';

export default function Register(props) {
  return (
    <div className="columns is-centered">
    <div className="column is-half">
      <form>
      <div className="field is-grouped is-horizontal">
        <label className="label is-small">FIRST NAME</label>
        <input
          name="first_name"
          onChange={props.handleChange}
          value={props.first_name.value}
          type="text"
          className="input is-warning is-small forminput"
          placeholder="eg. John"
          required
        />
        <label className="label is-small">LAST NAME</label>
        <input
          name="last_name"
          onChange={props.handleChange}
          value={props.last_name.value}
          type="text"
          className="input is-warning is-small forminput"
          placeholder="eg. Doe"
          required
        />
        </div>
        <input
          name="email"
          onChange={props.handleChange}
          value={props.email.value}
          type="email"
          placeholder="Email"
          className="input is-warning is-small forminput"
          required
        />
        <br /><br />
        <input
          name="username"
          onChange={props.handleChange}
          value={props.username.value}
          type="text"
          placeholder="Username"
          className="input is-warning is-small forminput"
          required
        />
        <br /><br />
        <div className="field is-grouped is-horizontal">
        <label className="label is-small">PASSWORD</label>
        <input
          name="password"
          onChange={props.handleChange}
          value={props.password.value}
          type="password"
          placeholder="Password"
          className="input is-warning is-small forminput"
          required
        />
        <label className="label is-small">CONFIRM PASSWORD</label>
        <input
          name="password_confirmation"
          onChange={props.handleChange}
          value={props.password_confirmation.value}
          type="password"
          placeholder="Confirm Password"
          className="input is-warning is-small forminput"
          required
        />
        <br /><br />
        </div>
      </form>
      <a onClick={props.register} className="button is-warning">Register</a> | <a onClick={props.cancel} className="button is-warning">Cancel</a>

    </div>
    </div>
  )
}

