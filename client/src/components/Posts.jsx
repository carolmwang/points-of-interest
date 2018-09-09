import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      poi_id: '',
      city_id: props.cityid,
      user_id: props.user_id
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
    this.props.newPost(this.state)
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <label></label>
            <input
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="Share your experience here!"
              required />
            {
              this.props.isLoggedIn ?
                <button>Submit</button>
                :
                <button onClick={this.props.handleLogin}>Login</button>
            }
          </form>
        </div>
        <div>
          {
            this.props.posts.map(data => {
              console.log(data);
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
}

export default Posts;
  // NewPost(props) {

  //   // const handleSubmit = function(ev) {
  //   //   ev.preventDefault();
  //   //   props.submitNew({
  //   //     content: 
  //   //   })

  //   // }
  //   const post = props.isLoggedIn ?
  //     (
  //       <form>
  //         <label></label>
  //         <input
  //           type="text"
  //           value={props.owner}

  //           placeholder="Share your experience of this point of interest!" />
  //         <button>Submit</button>
  //       </form>
  //     )
  //     : <Login
  //       login={props.login}
  //       logout={props.logout}
  //       email={props.state.email}
  //       password={props.state.password}
  //       isRegister={props.state.isRegister}
  //       register={props.register}
  //     />
  //   return (
  //     <div>
  //       {post}
  //     </div>
  //   )
// }

// export default NewPost;
// // Category component for points of interest based on category
// export default function Posts(props) {
//   return (
//     <div>
//       <div>
//         <NewPost cityid={props.cityid}/>
//         {
//           props.posts.map(data => {
//             const created = data.updated_at.toDateString();
//             console.log(created)
//             return (
//               <div key={data.id}>
//                 <p>{data.content}</p>

//               </div>
//             )
//           })
//         }
//       </div>

//     </div>
//   )
// }