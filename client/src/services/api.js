const BASE_URL = process.env.REACT_APP_API_URL

export function fetchPOI(id) {
  const opts = {
    headers: {
      'x-api-key': 'bOOrD46mXo6vdCBapUWFI82347FpbTbWauCD4vBf'
    }
  }
  return fetch(`https://api.sygictravelapi.com/1.0/en/places/list?parents=city:${id}&levels=poi&limit=1024&categories=discovering`, opts)
  .then(resp => resp.json())
}

// get all posts by one user
export function getAllUserPosts(id) {
  return fetch(`${BASE_URL}/users/${id}/posts`)
  .then(resp => resp.json())
}

// get all posts for a city
export function getAllCityPosts(id) {
  return fetch(`${BASE_URL}/cities/${id}/posts`)
  .then(resp => resp.json())
}

// get one post by one user
export function getOneUserPost(user_id, id) {
  return fetch(`${BASE_URL}/users/${user_id}/posts/${id}`)
  .then(resp => resp.json())
}

