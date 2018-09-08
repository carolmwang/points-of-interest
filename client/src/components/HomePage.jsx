import React from 'react';


export default function HomePage(props) {
  return (
    <div>
      <form onSubmit={
          (ev) => {
            debugger;
            ev.preventDefault();
            props.handleSubmit(ev.target.value)
            debugger;
          }
          }>
        <select name="city" handleChange={props.handleChange}>
          {
            props.cities.map(city => {
              return (
                <option key ={city.id} value={city.id}>{city.name}</option>
              )
            })
          }
        </select>
        <button >Submit</button>
      </form>
      <button onClick={
        (ev) => {
          ev.preventDefault();
          const random_city = props.cities[Math.floor(Math.random() * props.cities.length)];
          console.log(random_city);
          props.randomCity(random_city)}}>Where to next?</button>
    </div>
  )
}