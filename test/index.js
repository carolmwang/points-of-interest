const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

const opts = {
  method: 'DELETE',
  body: JSON.stringify({
    data: {
      content: "test",
      poi_id: "poi:12025",
      city_id: 2623,
      user_id: 3
      }
  }),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer $2a$10$UjB/Xb2ebdC044r8UGXE3OVyx/pjMkJ/dpUBP6Fs.SaiKGSwk8kEO'
  }
};


// fetch(`${BASE_URL}/cities/2623/posts`, opts)
//   .then(resp => resp.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(`error: ${err}`))

fetch(`${BASE_URL}/users/3/posts/3`, opts)
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(err => console.log(`error: ${err}`))