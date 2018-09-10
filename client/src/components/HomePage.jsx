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
    // const { name, value } = ev.target.value;
    this.setState({
      city: ev.target.value,
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
        <div className="column ">
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
            <div className="column">
              <a onClick={
                (ev) => {
                  ev.preventDefault();
                  const random_city = this.props.cities[Math.floor(Math.random() * this.props.cities.length)];
                  console.log(random_city);
                  this.props.randomCity(random_city)
                }} className="button is-large is-warning">Choose a city for me!</a>
            </div>
          </div>

    )
  }
}
export default HomePage

// export default function HomePage(props) {
//   return (
//     <div>
//       <form onSubmit={
//           (ev) => {
//             ev.preventDefault();
//             props.pickCity(ev.target.value)
//           }
//           }>
//         <select name="city">
//           {
//             props.cities.map(city => {
//               return (
//                 <option key ={city.id} value="2723">{city.name}</option>
//               )
//             })
//           }
//         </select>
//         <button>Submit</button>
//       </form>
//       <button onClick={
//         (ev) => {
//           ev.preventDefault();
//           const random_city = props.cities[Math.floor(Math.random() * props.cities.length)];
//           console.log(random_city);
//           props.randomCity(random_city)}}>Where to next?</button>
//     </div>
//   )
// }