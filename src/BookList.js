import React, { Component } from "react";

import { Link } from "react-router-dom";
import Shelves from "./Shelves";
import PropTypes from "prop-types";

class BookList extends Component {
  render() {
    const { book, shelves, onMoveBook } = this.props;

    //Filtering books for respective shelves
    const booksOnCurrentShelf = (shelf) =>
      book.filter((books) => books.shelf === shelf.id);

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <Shelves
                key={shelf.id}
                shelf={shelf}
                book={booksOnCurrentShelf(shelf)}
                onMoveBook={onMoveBook}
              />
            ))}
          </div>
        </div>
        <AddBook />
      </div>
    );
  }
}

//Adding the Add Book button to naviagte to the Search Page
const AddBook = () => {
  return (
    <div className="open-search">
      <Link to="search">
        <button>Add a Book</button>
      </Link>
    </div>
  );
};
//Property type list for Booklist Component
BookList.protoTypes = {
  shelves: PropTypes.object,
  book: PropTypes.array,
  onMoveBook: PropTypes.func,
};
export default BookList;
