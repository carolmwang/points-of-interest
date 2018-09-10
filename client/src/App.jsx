import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import {
  fetchCities,
  oneCity,
  getUserInfo,
  getAllCityPosts,
  fetchPOI,
  createPost,
  editPost,
  deletePost,
}
  from './services/api';

import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import City from './components/City';
import User from './components/User';
import EditPost from './components/EditPost';
import './App.css'

const BASE_URL = process.env.REACT_APP_API_URL

class App extends Component {
  constructor() {
    super();

    this.state = {
      idCity: '',
      city: {},
      cityName: '',
      cities: [],
      userInfo: {},
      userPosts: [],
      postEdit: [],
      poi: [],
      user_id: '',
      username: '',
      email: '',
      password: '',
      isLoggedIn: false,
      isEdit: false,
      isRegister: false,
      currentView: 'HomePage'
    };
    this.logout = this.logout.bind(this)
    // this.isLoggedIn = this.isLoggedIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.cancel = this.cancel.bind(this)
    this.showRegisterForm = this.showRegisterForm.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.randomCity = this.randomCity.bind(this)
    this.poiCity = this.poiCity.bind(this)
    this.pickCity = this.pickCity.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.newPost = this.newPost.bind(this)
    this.findUserId = this.findUserId.bind(this)
    this.handleUserProfile = this.handleUserProfile.bind(this)
    this.editPostView = this.editPostView.bind(this)
    this.handleEditPost = this.handleEditPost.bind(this)
    this.handlePostDelete = this.handlePostDelete.bind(this)
    this.renderToHomePage = this.renderToHomePage.bind(this)
  }

  // AUTH Functions 
  // references:
  // https://medium.com/@nick.hartunian/knock-jwt-auth-for-rails-api-create-react-app-6765192e295a
  // JZ react-rails-token-auth repo
  cancel() {
    this.setState({
      name: '',
      sugar: '',
      isEdit: false,
      selectedJuiceId: null,
    })
  }

  showRegisterForm() {
    this.setState({
      isRegister: true,
    })
  }

  register() {
    const url = `${BASE_URL}/users`
    const body = { "user": { "email": this.state.email, "password": this.state.password } }
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(body)
    }
    fetch(url, init)
      .then(res => res.json())
      .then(this.setState({
        isRegister: false,
      }))
      .catch(err => err.message)
  }

  findUserId() {
    const jwt = localStorage.getItem("jwt")
    const decoded = jwtDecode(jwt)
    getUserInfo(decoded.sub)
      .then(data =>
        this.setState({
          user_id: data.id,
          userInfo: data,
          isLoggedIn: true,
          currentView: 'HomePage'
        }))
  }



  login() {
    const url = `${BASE_URL}/user_token`;
    const body = { "auth": { "email": this.state.email, "password": this.state.password } }
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(body),
    }
    fetch(url, init)
      .then(res => res.json())
      .then(res => localStorage.setItem("jwt", res.jwt))
      .then(this.findUserId())
      .catch(err => console.log(err))

  }

  // isLoggedIn() {
  //   const res = !!(localStorage.getItem("jwt"));
  //   this.setState({
  //     isLoggedIn: res,
  //   })
  //   this.userInfo(this.state.user_id)
  //   return res;
  // }

  logout() {
    localStorage.removeItem("jwt")
    this.setState({
      isLoggedIn: false,
      name: '',
      email: '',
      user_id: '',
      currentView: 'HomePage',
    })
  }
  // END OF AUTH


  // organize cities alphabetically------POST MVP

  // When page loads, fetch cities and set it to state
  componentDidMount() {
    fetchCities()
      .then(data => this.setState({ cities: data.cities }))
  }

  //renders to the homepage (for logo)
  renderToHomePage() {
    this.setState({
      currentView: 'HomePage'
      
    })
  }

  // handles the random city view after user clicks the button from the HomePage
  randomCity(random_city) {
    this.setState({
      idCity: random_city.id,
      city: random_city,
      city_id: random_city.data_id,
      cityName: random_city.name,
      currentView: 'City',
    })
  }

  // handles the city view when a user chooses a city themselves
  pickCity(id) {
    oneCity(id)
      .then(data =>
        this.setState({
          idCity: data.city.id,
          city: data.city,
          city_id: data.city.data_id,
          currentView: 'City',
        }))
  }

  // shows all POI for the chosen city
  poiCity() {
    fetchPOI()
      .then(data => {
        this.setState({
          poi: data.data.places
        })
      })
  }

  //handles form change events
  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    })
  }

  // create a new post on a specific city if user has logged in 
  newPost(post) {
    const jwt = localStorage.getItem("jwt")
    const init = {
      headers: { "Authorization": `Bearer ${jwt}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(post)
    }
    createPost(this.state.idCity, init)
      .then(data => 
        this.setState({
          currentView: 'User',
        })
      
      )
      .catch(err => err.message)
  }

  // sets state to the login page
  handleLogin() {
    this.setState({
      currentView: 'Login'
    })
  }

  // changes the view to the user profile when user clicks username
  handleUserProfile() {
    this.setState({
      currentView: 'User'
    })
  }

  // renders the view to edit post when user wants to make a change
  editPostView(post) {
    this.setState({
      currentView: 'EditPost',
      postEdit: post
    })
  }

  // handles the edited post and sets the view to the User page
  handleEditPost(post) {
    const jwt = localStorage.getItem("jwt")
    const init = {
      headers: { "Authorization": `Bearer ${jwt}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(post)
    }
    editPost(this.state.user_id, this.state.postEdit.id, init)
      .then(data => {
        this.setState({
          currentView: 'User'
        })
      }
      )
      .catch(err => err.message)
  }

  // handles the deleted post and sets the view to the User page
  handlePostDelete() {
    const jwt = localStorage.getItem("jwt")
    const init = {
      headers: { "Authorization": `Bearer ${jwt}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      method: 'DELETE',
      mode: 'cors',
    }
    deletePost(this.state.user_id, this.state.postEdit.id, init)
      .then(data => {
        this.setState({
          currentView: 'User'
        })
      }
      )
      .catch(err => err.message)
  }

  // render views:: Switch Statement
  determineWhichToRender() {
    const {
      currentView,
      idCity,
      city,
      cities,
      city_id,
      user_id,
      isLoggedIn
    } = this.state;

    switch (currentView) {
      case 'HomePage':
        return <HomePage
          city={city}
          cities={cities}
          randomCity={this.randomCity}
          pickCity={this.pickCity}
          findCity={this.findCity}
          login={this.handleLogin}
        />

      case 'City':
        return <City
          city_id={city_id}
          cityName={this.state.cityName}
          id={idCity}
          handleChange={this.handleChange}
          isLoggedIn={isLoggedIn}
          newPost={this.newPost}
          user_id={user_id}
        />

      case 'Login':
        return <Login handleChange={this.handleChange}
          login={this.login}
          logout={this.logout}
          email={this.state.email}
          password={this.state.password}
          isRegister={this.state.isRegister}
          register={this.register}
        />
      case 'User':
        return <User user_id={user_id}
          editPost={this.editPostView}
          userPosts={this.state.userPosts} />
      case 'EditPost':
        return <EditPost
          postEdit={this.state.postEdit}
          handleEditPost={this.handleEditPost}
          handlePostDelete={this.handlePostDelete} />
    }

  }

  render() {
    return (
      <div className="App">
        <Header
          renderToHomePage={this.renderToHomePage}
          logout={this.logout}
          isLoggedIn={this.state.isLoggedIn}
          showRegisterForm={this.showRegisterForm}
          handleLogin={this.handleLogin}
          userInfo={this.state.userInfo}
          handleUserProfile={this.handleUserProfile} />
        {this.determineWhichToRender()}
      </div>
    );
  }
}


export default App;
