import React, { Component } from 'react';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.cities,
      cityId:'',
      city: {},

    };
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    })
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.pickCity({ body: this.state })
  }

  render() {
    return (

      <div>
        <form onSubmit={
          (ev) => {
            ev.preventDefault();
            this.handleSubmit(this.state.city)
          }
        }>
          <select name="cityId" value={this.state.city} handleChange={this.handleChange}>
            {
              this.props.cities.map(city => {
                return (
                  <option key={city.id} value={city.id}>{city.name}</option>
                )
              })
            }
          </select>
          <button >Submit</button>
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
//             props.handleSubmit(ev.target.value)
//           }
//           }>
//         <select name="city" handleChange={props.handleChange}>
//           {
//             props.cities.map(city => {
//               return (
//                 <option key ={city.id} value={city.id}>{city.name}</option>
//               )
//             })
//           }
//         </select>
//         <button >Submit</button>
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