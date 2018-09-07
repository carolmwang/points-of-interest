import React, { Component } from 'react';
import { fetchPOI } from '../services/api';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_id: this.props.city_id,
      poi: [],
      poiCity: '',
      categories: ["discovering", "eating", "going_out", "hiking", "playing", "relaxing", "shopping", "sightseeing", "sleeping", "doing_sports", "traveling"],
      category: 'discovering',
    }
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  componentDidMount() {
    fetchPOI(this.state.city_id, this.state.category)
      .then(data =>
        this.setState({
          poi: data.data.places,
          poiCity: data.data.places[0].name_suffix,
        }))
  }

  handleCategoryClick(ev) {
    ev.preventDefault();
    this.setState({
      category: ev.target.value
    })
    .then(fetchPOI(this.state.city_id, this.state.category))
  }

  render() {
    return (
      <div>
        <nav>
          {
            this.state.categories.map(category => {
              return(
              <button value={category} onClick={this.handleCategoryClick}>{category}</button>
              )
            })
          }
        </nav>

      <h3>{this.state.poiCity}</h3>
      
        {
          this.state.poi.map(data => {
            console.log(data)
            const rating = Math.round(data.rating);
            console.log(rating)
            const localRating = Math.round(data.rating_local);
            console.log(localRating)
            const categories = data.categories;
            console.log(categories)
            return (
              <div key={data.id}>
                <h4>{data.name}</h4>
                <img src={data.thumbnail_url} alt={`Sorry, no image of ${data.name}`}></img>
                <p>{data.perex}</p>
                <a href={data.url}>More Information</a>
                <p>Rating: {rating}/5</p>
                <p>Local Rating: {localRating}/5</p>
                {
                  categories.map(category => {
                    <span>{category}</span>
                  })
                }
              </div>
            )
          })
        }
        <div></div>
      </div>
    )
  }
}

export default City;