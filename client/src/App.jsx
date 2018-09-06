import React, { Component } from 'react';
import {
  getAllUserPosts,
  getAllCityPosts,
  getOneUserPost,
  fetchPOI,
} from './services/api';

import Header from './components/Header';
import HomePage from './components/HomePage';


getAllUserPosts(3)
  .then(data => console.log(data));

getAllCityPosts(2623)
  .then(data => console.log(data));

getOneUserPost(3, 3)
  .then(data => console.log(data));

fetchPOI(186) 
.then(data => console.log(data))

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'HomePage'
    }

    this.renderToHomePage = this.renderToHomePage.bind(this);

  }

  renderToHomePage() {
    this.setState({
      currentView: 'HomePage'
    })
  }

  // render views
  determineWhichToRender() {
    const { currentView } = this.state;

    switch (currentView) {
      case 'HomePage':
        return <HomePage />
    }
  }

  render() {
    
    return (
      <div>
        <Header renderToHomePage={this.renderToHomePage}/>
        {this.determineWhichToRender()}
      </div>
    );
  }
}

export default App;
