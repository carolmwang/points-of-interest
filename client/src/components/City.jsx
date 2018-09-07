import React, { Component } from 'react';
import { fetchPOI } from '../services/api';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_id: this.props.city_id,
      poi: [],
      poiCity: '',
    }
  }

  componentDidMount() {
    fetchPOI(this.state.city_id)
      .then(data =>
        this.setState({
          poi: data.data.places,
          poiCity: data.data.places[0].name_suffix,
        }))
  }

  render() {
    return (
      <div>{this.state.poiCity}
        {
          this.state.poi.map(data => {
            const rating = Math.round(data.rating);
            const localRating = Math.round(data.rating_local);
            const categories = data.categories;
            return (
              <div>
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