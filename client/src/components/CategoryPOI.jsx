import React from 'react';


export default function CategoryPOI(props) {
  return (
    <div>
      {
        props.poi.map(data => {
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
            </div>
          )
        })
      }
    </div>
  )
}