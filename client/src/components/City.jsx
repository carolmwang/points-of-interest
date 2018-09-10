import React, { Component } from 'react';
import { fetchPOI, getAllCityPosts } from '../services/api';
import CategoryPOI from './CategoryPOI'
import Posts from './Posts'

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_id: this.props.city_id,
      cityName: this.props.cityName,
      id: this.props.id,
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
  // get all ciy posts and points of interest when component mounts
  componentDidMount() {
    getAllCityPosts(this.props.id)
      .then(data => {
        this.setState({
          posts: data.posts,
        })
      })
    fetchPOI(this.state.city_id, this.state.category)
      .then(data =>
        this.setState({
          poi: data.data.places,
          poiCity: data.data.places[0] ? data.data.places[0].name_suffix : "Nothing to do here..",
        }))
  }
  // fetches the point of interests by category
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
        {
          this.state.cityName ?
            <h3>{this.state.cityName}, USA</h3>
            :
            <h3>{this.state.poiCity}</h3>
        }
        <CategoryPOI poi={this.state.poi} />
        <Posts
          posts={this.state.posts}
          id={this.state.id}
          isLoggedIn={this.state.isLoggedIn}
          newPost={this.props.newPost}
          user_id={this.state.user_id} />


      </div>
    )
  }
}

export default City;