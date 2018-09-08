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
      city_id: props.cityid,
      user_id: ''

    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    })
  }

  render() {
    const props = this.state.isLoggedIn
    return (
      props ?
      <div>
        <form name="content">
          <label></label>
          <input
            type="text"
            name="content"
            value={this.props.content}
            handleChange={this.handleChange}
            placeholder="Share your experience of this point of interest!" />
         
          <button>Submit</button>
        </form>
      </div>
      :
      <div>
      <form name="content">
        <label></label>
        <input
          type="text"
          name="content"
          value={this.props.content}
          handleChange={this.handleChange}
          placeholder="Share your experience of this point of interest!" />
       
       <button onClick={props.handlePostLogin}>Register</button> | <button onClick={props.handlePostLogin}>Login</button>      </form>
    </div>

    )
  }
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
  }

  export default NewPost;