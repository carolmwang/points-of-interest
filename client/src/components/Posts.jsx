import React from 'react';

// Category component for points of interest based on category
export default function Posts(props) {
  return (
    <div>
      <div>
        {
          props.posts.map(data => {
            const created = data.updated_at.toDateString();
            console.log(created)
            return (
              <div key={data.id}>
                <p>{data.content}</p>

              </div>
            )
          })
        }
      </div>

    </div>
  )
}