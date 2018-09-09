import React, { Component } from 'react';
import { fetchCities } from '../services/api';

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

  componentDidMount() {
    // this.isLoggedIn()
    fetchCities()
      .then(data => this.setState({ cities: data.cities }))
  }

  handleChange(ev) {
    // const { name, value } = ev.target.value;
    this.setState({
      city: ev.target.value,
    })
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log(this.props.pickCity(this.state.city))
    this.props.pickCity(this.state.city)
  }

  render() {
    return (
      <div>
    
        <form onSubmit={this.handleSubmit}>
        <label>Pick a city:
          <select name="city" value={this.state.city} onChange={this.handleChange}>
            <option value="disabled">Choose a state:</option>
            {
              this.state.cities.map(city => {
                return (
                  <option key={city.id} value={city.id}>{city.name}</option>
                )
              })
            }
          </select>
          </label>
          <input type="submit" value="Submit"/>
        </form>

        <button onClick={
          (ev) => {
            ev.preventDefault();
            const random_city = this.props.cities[Math.floor(Math.random() * this.props.cities.length)];
            console.log(random_city);
            this.props.randomCity(random_city)
          }}>Where to next?</button>
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