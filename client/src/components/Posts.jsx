import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      poi_id: '',
      city_id: props.id,
      user_id: props.user_id,

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
    this.props.newPost({body: this.state})
  }

  render() {
    return (
      <div className="column is-center citypage">
        <div>
          <form onSubmit={this.onSubmit}>
            <label><strong>Write a review:</strong></label>
            <textarea
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="Share your experience here!"
              required 
              rows="10"
              className="textarea is-warning is-medium"/>
            {
              this.props.isLoggedIn ?
                <button>Submit</button>
                :
                <h2>Please log in to make a post!</h2>
            }
          </form>
        </div>
        <div>
          <h3><strong>Reviews ({this.props.posts.length}): </strong></h3>
          { this.props.posts ?
            this.props.posts.map(data => {
             
              return (
                <div key={data.id} className="posts">
                  <p>{data.content}</p>
                  <p>{data.user.username}</p>
                  <p>{data.created_at}</p>
                </div>
              )
            })
            :
            <h2>No Posts on this city</h2>
          }
        </div>

      </div>
    )

  }
}

export default Posts;
  