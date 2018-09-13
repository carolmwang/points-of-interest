import React from 'react';

// Header function
// shows the user button and logout button if user is logged in
// shows login button if user is not logged in
export default function Header(props) {
  const { renderToHomePage } = props;
  return (
    <div className="header-space">
      <section className="hero is-medium has-bg-img">
        <div className="hero-body">
          <p onClick={renderToHomePage} className="title is-1 has-text-white-ter has-text-weight-bold is-center header">POINTS of INTEREST</p>
        </div>
      </section>
      <nav className="navbar is-warning">
        <div className="navbar-end">
          <div className="navbar-menu">
            <a onClick={renderToHomePage} className="navbar-item">Home</a>
            {
              props.isLoggedIn ?
                (
                  <div className="navbar-item has-dropdown is-hoverable">

                    <a className="navbar-link">{props.userInfo.username}</a>

                    <div className="navbar-dropdown is-right is-boxed is-active">
                      <a onClick={props.handleUserProfile} className="navbar-item">Profile</a>
                      <a onClick={props.logout} className="navbar-item">Logout</a>
                    </div>
                  </div>
                )
                :
                <div className="navbar-item has-dropdown is-hoverable">

                  <a className="navbar-link">Sign In</a>
                  <div className="navbar-dropdown is-right is-boxed is-active">
                    <a onClick={props.handleLogin} className="navbar-item">Login</a>
                    <a onClick={props.handleRegister} className="navbar-item">Register</a>
                  </div>
                </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}
