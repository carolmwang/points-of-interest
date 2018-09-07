import React from 'react';


export default function HomePage(props) {
  return (
    <div>
      <form>
        <select name="city">
          {
            props.cities.map(city => {
              return (
                <option key ={city.id} value={city.data_id}>{city.name}</option>
              )
            })
          }
        </select>
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