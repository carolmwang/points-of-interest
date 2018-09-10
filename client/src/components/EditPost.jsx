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
      <div className="columns is-centered">
        <div className="column is-half">
        <form onSubmit={this.onSubmit}>
          <label>Edit your post here:</label>
          <textarea name="content" value={this.state.content} onChange={this.handleChange} className="textarea is-warning" rows="15"/>
          <button type="submit" className="input is-warning" className="button is-warning is-medium">Update this post</button>
        </form>
        <a onClick={this.handleDelete} className="button is-danger">Delete post</a>
      </div>
      </div>
    )

  }
}

export default EditPost;
