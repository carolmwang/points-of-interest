import React from 'react';

export default function Login(props) {
  return (
    <div className="columns is-centered">
    <div className="column is-one-fifth">
      <form>
        <label>Email: </label>
        <br />
        <input
          name="email"
          onChange={props.handleChange}
          value={props.email.value}
          type="email"
          className="input is-warning is-small forminput"
        />
        <br /><br />
        <label>Password:</label>
        <br />
        <input
          name="password"
          onChange={props.handleChange}
          value={props.password.value}
          type="password"
          className="input is-warning is-small forminput"
        />
      </form>
      <br />
      <a onClick={props.register} className="button is-warning">Register</a> | <a onClick={props.login} className="button is-warning">Login</a>
    </div>
    </div>
  )
}

