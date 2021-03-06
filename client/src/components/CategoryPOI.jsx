import React from 'react';

// Category component for points of interest based on category
// Maps throught the points of interest for each category
export default function CategoryPOI(props) {
  return (
    <div className="column is-three-quarters">
      <div>
        {
          props.poi.length !==0 ?
          props.poi.map(data => {
            const rating = Math.round(data.rating);
            const localRating = Math.round(data.rating_local);
            return (
              <div key={data.id} className="poi">
                <h4>{data.name}</h4>
                <img src={data.thumbnail_url} alt={`Sorry, no image of ${data.name}`}></img>
                <p>{data.perex}</p>
                <a href={data.url} className= "button is-link is-focused">More Information</a>
                <p>Rating: {rating}/5</p>
                <p>Local Rating: {localRating}/5</p>
              </div>
            )
          })
          :
          <div>
            <h3>Sorry, there's no suggestions for {props.city.name}</h3>
            </div>
        }
      </div>

    </div>
  )
}