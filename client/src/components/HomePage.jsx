import React, { Component } from 'react';
import { fetchCities } from '../services/api';

// Homepage view 
// user can choose a city or button will randomly select one for you
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city: null,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // fetch all cities when component mounts
  componentDidMount() {
    fetchCities()
      .then(data => this.setState({ cities: data.cities }))
  }

  // handles change
  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    })
  }

  // handles submit when user chooses a city
  handleSubmit(ev) {
    ev.preventDefault();
    this.props.pickCity(this.state.city)
  }

  render() {
    return (
      <div className="columns">
        <div className="column homepage-view">
          <form onSubmit={this.handleSubmit} className="select is-warning is-large">
            <select name="city" value={this.state.city} onChange={this.handleChange}>
              <option value="disabled">If you know what you're looking for..</option>
              {
                this.state.cities.map(city => {
                  return (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  )
                })
              }
            </select>
            <input type="submit" value="Submit" />
          </form>
          </div>
            <div className="column homepage-view">
              <a onClick={
                (ev) => {
                  ev.preventDefault();
                  const random_city = this.props.cities[Math.floor(Math.random() * this.props.cities.length)];
                  this.props.randomCity(random_city)
                }} className="button is-large is-warning">Choose a city for me!</a>
            </div>
          </div>

    )
  }
}
export default HomePage
