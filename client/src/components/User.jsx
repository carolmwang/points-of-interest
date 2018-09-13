import React, { Component } from 'react';
import { getAllUserPosts } from '../services/api';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
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
      <div className="columns is-centered">
          <div className="column is-half">
        {
          this.state.userPosts.map(post => {
            return (
                <div className="box posts">
                  <h4>{post.content}</h4>
                  <br />
                  <h5 className="is-size-7">{Date(post.created_at).toString()}</h5>

                  <a onClick={() => this.props.editPost(post)} className="button is-warning is-small">Edit Post</a>
                </div>
            )
          })
        }
        </div>
      </div>
    )

  }
}

export default User;
