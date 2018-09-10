import React from 'react';

// Header function
// shows the user button and logout button if user is logged in
// shows login button if user is not logged in
export default function Header(props) {
  const { renderToHomePage } = props;
  return (
    <section className="hero">

      <div className="hero-body title is-1 is-center">
        <h1 onClick={renderToHomePage} className="has-text-centered">POINTS of INTEREST</h1>

        {
          props.isLoggedIn ?

            (
              <div>
                <button onClick={props.handleUserProfile} className="button is-warning category-button">{props.userInfo.username}</button>
                <button onClick={props.logout} className="button is-warning category-button">logout</button>
              </div>
            )
            :

            <button onClick={props.handleLogin} className="button is-warning is-hovered">Login</button>
        }


      </div>
    </section>
  )
}