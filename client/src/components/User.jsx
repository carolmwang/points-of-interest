import React, { Component } from 'react';
import { getAllUserPosts } from '../services/api';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: this.props.userPosts,
      cities: [],
    };
  }

  componentDidMount() {
    getAllUserPosts(this.props.user_id)
      .then(data => {
        this.setState({
          userPosts: data.posts,
          cities: data.city
        })
      })
  }

  render() {
    return (
      <div>
        {
          this.state.userPosts.map(post => {
            return (
              <div>
                <h4>{post.content}</h4>
                <h5>{post.created_at}</h5>
                <button onClick={() => this.props.editPost(post)}>Edit Post</button>
              </div>
            )
          })
        }
      </div>
    )

  }
}

export default User;
