import React, { Component } from 'react';
import { fetchPOI, getAllCityPosts } from '../services/api';
import CategoryPOI from './CategoryPOI'
import Posts from './Posts'

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_id: this.props.city_id,
      poi: [],
      poiCity: '',
      categories: ["discovering", "eating", "going_out", "hiking", "playing", "relaxing", "shopping", "sightseeing", "sleeping", "doing_sports", "traveling"],
      category: 'discovering',
      posts: [],
      isLoggedIn: props.isLoggedIn,
      user_id: props.user_id,
    }
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  componentDidMount() {
    fetchPOI(this.state.city_id, this.state.category)
      .then(data =>
        this.setState({
          poi: data.data.places,
          poiCity: data.data.places[0] ? data.data.places[0].name_suffix : "Nothing to do here..",
        }))
    getAllCityPosts(this.props.id)
        .then(data => 
          {console.log(data);
        this.setState({
          posts: data,
        })})
  }

  handleCategoryClick(ev) {
    ev.preventDefault();
    this.setState({
      category: ev.target.value
    })
    fetchPOI(this.state.city_id, this.state.category)
      .then(data =>
        this.setState({
          poi: data.data.places,
        }))
  }


  render() {
    return (
      <div>

        <nav>
          {
            this.state.categories.map(category => {
              return (
                <button value={category} onClick={this.handleCategoryClick}>{category}</button>
              )
            })
          }
        </nav>

        <h3>{this.state.poiCity}</h3>
        <CategoryPOI poi={this.state.poi} />
        <Posts 
        posts={this.state.posts} 
        cityid={this.state.city_id} 
        handlePostLogin={this.props.handlePostLogin}
        isLoggedIn= {this.state.isLoggedIn}
        newPost = {this.props.newPost}
        user_id = {this.state.user_id}/>
        

      </div>
    )
  }
}

export default City;