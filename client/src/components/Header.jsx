import React from 'react';

export default function Header(props) {
  const { renderToHomePage } = props;
  return (
    <div>
      <nav>
        <h1 onClick={renderToHomePage}>POINTS of INTEREST</h1>
        <button onClick={props.logout}>logout</button>
        <h1>Username</h1>
      </nav>
    </div>
  )
}