const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

const opts = {
  method: 'POST',
  body: JSON.stringify({
    auth: {email: "testemail@testemail.com", password: "testpassword"}
  }),
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json', 'Accept': 'application/json'
  }
};

fetch(`${BASE_URL}/user_token`, opts)
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(err => console.log(`error: ${err}`))


// fetch(`${BASE_URL}/cities/2623/posts`, opts)
//   .then(resp => resp.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(`error: ${err}`))

// fetch(`${BASE_URL}/users/3/posts/3`, opts)
//   .then(resp => resp.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(`error: ${err}`))