import React, { Component } from "react";
import PropTypes from "prop-types";

class ChangeShelf extends Component {
  state = {
    value: this.props.book.shelf,
  };

  onHandleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onMoveBook(this.props.book, event.target.value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.onHandleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

//Property type list for ChangeShelf Component
ChangeShelf.propTypes = {
  book: PropTypes.object,
  onMoveBook: PropTypes.func,
};

export default ChangeShelf;
