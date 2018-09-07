import React, { Component } from 'react';
import {
  fetchCities,
  getAllUserPosts,
  getAllCityPosts,
  getOneUserPost,
  fetchPOI,
  createPost,

} from './services/api';

import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
// import NewPost from './components/NewPost';

const BASE_URL = process.env.REACT_APP_API_URL

fetchCities()
  .then(data => console.log(data));


getAllUserPosts(3)
  .then(data => console.log(data));

getAllCityPosts(2623)
  .then(data => console.log(data));

getOneUserPost(3, 3)
  .then(data => console.log(data));

// fetchPOI(186) 
// .then(data => console.log(data))

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      poi_id: '',
      city_id: '',
      user_id: '',
      username: '',
      email: '',
      password: '',
      isLoggedIn: null,
      isEdit: false,
      selectedJuiceId: null,
      isRegister: false,
      currentView: 'Login'
    }

    this.renderToHomePage = this.renderToHomePage.bind(this);
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.delete = this.delete.bind(this)
    this.submitNew = this.submitNew.bind(this)
    this.edit = this.edit.bind(this)
    // this.showEditForm = this.showEditForm.bind(this)
    // this.cancel = this.cancel.bind(this)
    this.register = this.register.bind(this)
    this.showRegisterForm = this.showRegisterForm.bind(this)
  }

  componentDidMount() {

    fetchCities().then(data => this.setState({ cities: data }))
  }

  renderToHomePage() {
    this.setState({
      currentView: 'HomePage'
    })
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    });
    ;
  }

  // AUTHENTICATION
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
    .then(data => console.log(data))
      .then(res => res.json())
      .then(res => localStorage.setItem("jwt", res.jwt))
      .then(() => this.setState({
        isLoggedIn: true,
      }))
      .then(() => console.log('yay it worked'))
      // this.getJuices())
      .catch(err => console.log(err))
  }

  edit(id) {
    const jwt = localStorage.getItem("jwt")
    const body = { "juice": { "name": this.state.name, "sugar": this.state.sugar } }
    const init = {
      headers: { "Authorization": `Bearer ${jwt}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(body)
    }
    fetch(`${BASE_URL}/juices/${id}`, init)
      .then(() => this.getJuices())
      .then(this.setState({
        name: '',
        sugar: '',
        isEdit: false,
        selectedJuiceId: null,
      }))
      .catch(err => err.message)

  }
  submitNew() {
    const jwt = localStorage.getItem("jwt")
    const body = {
      "post": {
        "content": this.state.content,
        "poi_id": this.state.poi_id
      },
      "city_id": this.state.city_id,
      "user_id": this.state.user_id
    }
    const init = {
      headers: { "Authorization": `Bearer ${jwt}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body)
    }
    this.createPost(this.state.cityId, init)
      .then(data => console.log(data))
      .catch(err => err.message)
  }

  delete(id) {
    const jwt = localStorage.getItem("jwt")
    const init = {
      headers: { "Authorization": `Bearer ${jwt}` },
      method: 'DELETE',
      mode: 'cors',
    }
    fetch(`${BASE_URL}/juices/${id}`, init)
      .then(() => this.getJuices())
      .catch(err => err.message)
  }

  isLoggedIn() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res,
    })
    return res;
  }

  logout() {
    localStorage.removeItem("jwt")
    this.setState({
      isLoggedIn: false,
      juices: [],
      name: "",
      email: "",
    })
  }



  // componentDidMount() {
  //   this.isLoggedIn()
  //   this.getJuices()
  // }

  // render views
  determineWhichToRender() {
    const { currentView, content, poi_id, city_id, user_id, username, email, isLoggedIn } = this.state;

    switch (currentView) {
      case 'HomePage':
        return <HomePage />

      // case 'NewPost':
      //   return <NewPost
      //     content={content}
      //     poi_id={poi_id}
      //     city_id={city_id}
      //     user_id={user_id}
      //     handleChange={this.handleChange}
      //     submitNew={this.submitNew}
      //     isLoggedIn={isLoggedIn}
      //   />

      case 'Login':
        return <Login handleChange={this.handleChange}
          login={this.login}
          logout={this.logout}
          email={this.state.email}
          password={this.state.password}
          isRegister={this.state.isRegister}
          register={this.register}
        />
    }

  }
  //   render() {
  //     const display = this.state.isLoggedIn ? this.state.juices.map(juice => {
  //           return (<Juice 
  //           key={juice.id} 
  //           juice={juice} 
  //           delete={this.delete} 
  //           edit={this.submitEdit}
  //           showEditForm={this.showEditForm}
  //           />)
  //         }) : <Login handleChange={this.handleChange}
  //                  login={this.login}
  //                  logout={this.logout}
  //                  email={this.state.email}
  //                  password={this.state.password}
  //                  isRegister={this.state.isRegister}
  //                  register={this.register}
  //                  />
  //     return (
  //       <div className="App">
  //         <Header 
  //         logout={this.logout} 
  //         create={this.create}
  //         showRegisterForm={this.showRegisterForm}
  //         />
  //         <div> {display} </div>
  //         <JuiceForm 
  //         handleChange={this.handleChange} 
  //         submitNew={this.submitNew} 
  //         name={this.state.name}
  //         sugar={this.state.sugar}
  //         isEdit={this.state.isEdit}
  //         id={this.state.selectedJuiceId}
  //         edit={this.edit}
  //         cancel={this.cancel}
  //         />
  //       </div>
  //     );
  //   }
  // }
  render() {

    return (
      <div>
        <Header renderToHomePage={this.renderToHomePage} logout={this.logout} showRegisterForm={this.showRegisterForm} />
        {this.determineWhichToRender()}
      </div>
    );
  }
}

export default App;
