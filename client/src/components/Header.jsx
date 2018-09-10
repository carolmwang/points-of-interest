import React from 'react';

export default function Header(props) {
  const { renderToHomePage } = props;
  return (
    <div>
      <nav>
        <h1 onClick={renderToHomePage}>POINTS of INTEREST</h1>

       {
         props.isLoggedIn ?

         (
           <div>
         <h3 onClick={props.handleUserProfile}>{props.userInfo.username}</h3>
         <button onClick={props.logout}>logout</button>
         </div>
        )
         :

         <button onClick={props.handleLogin}>Login</button>
       }
      </nav>
    </div>
  )
}