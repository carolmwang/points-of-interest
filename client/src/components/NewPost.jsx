import React, { Component } from 'react';
import Login from './Login';


class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      logout: '',
      email: '',
      password: '',
      isRegister: '',
      register: '',
      content: '',
      poi_id: '',
      city_id: '',
      user_id: ''

    }
  }
function NewPost(props) {

  // const handleSubmit = function(ev) {
  //   ev.preventDefault();
  //   props.submitNew({
  //     content: 
  //   })
  
  // }
  const post = props.isLoggedIn ?
    (
    <form>
      <label></label>
      <input
        type="text"
        value={props.owner}
      
        placeholder="Share your experience of this point of interest!" />
      <button>Submit</button>
    </form>
    )
    : <Login 
      login={props.login}
      logout={props.logout}
      email={props.state.email}
      password={props.state.password}
      isRegister={props.state.isRegister}
      register={props.register}
    />
  return (
    <div>
    { post }
    </div>
  )
}

export default NewPost;