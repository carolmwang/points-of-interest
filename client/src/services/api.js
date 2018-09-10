const BASE_URL = process.env.REACT_APP_API_URL

export function fetchCities() {
  return fetch(`${BASE_URL}/cities`)
  .then(resp => resp.json())
}

export function oneCity(id) {
  return fetch(`${BASE_URL}/cities/${id}`)
  .then(resp => resp.json())
}

export function fetchPOI(id, category) {
  const opts = {
    headers: {
      'x-api-key': 'bOOrD46mXo6vdCBapUWFI82347FpbTbWauCD4vBf'
    }
  }
  return fetch(`https://api.sygictravelapi.com/1.0/en/places/list?parents=${id}&levels=poi&limit=1024&categories=${category}`, opts)
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

export function getUserInfo(user_id) {
  return fetch(`${BASE_URL}/users/${user_id}`)
  .then(resp => resp.json())
}

// new post
export function createPost(city_id, init) {
  return fetch(`${BASE_URL}/cities/${city_id}/posts`, init)
  .then(resp => resp.json())
}

export function editPost(user_id, post_id, init) {
  return fetch(`${BASE_URL}/users/${user_id}/posts/${post_id}`,init)
  .then(resp => resp.json())
}

export function deletePost(user_id, post_id, init) {
  return fetch(`${BASE_URL}/users/${user_id}/posts/${post_id}`, init)
  .then(resp => resp.json())
}
