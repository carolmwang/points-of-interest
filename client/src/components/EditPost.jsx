import React, { Component } from 'react';

class EditPost extends Component {
  constructor(props) {
    super(props);
    const { postEdit } = this.props
    this.state = {
      content: postEdit.content,
      poi_id: postEdit.poi_id,
      city_id: postEdit.city_id,
      user_id: postEdit.user_id,
    };
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    })
  }

  handleDelete(ev) {
    ev.preventDefault();
    this.props.handlePostDelete();

  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.handleEditPost({ body: this.state })
  }


  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Post</label>
          <input name="content" value={this.state.content} onChange={this.handleChange} />
          <input type="submit" value="Update this post" />
        </form>
        <button onClick={this.handleDelete}>Delete post</button>
      </div>
    )

  }
}

export default EditPost;
