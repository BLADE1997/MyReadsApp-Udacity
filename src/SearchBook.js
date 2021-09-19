import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";

class SearchBook extends Component {
  state = {
    value: "",
  };

  onHandleChange = (event) => {
    const val = event.target.value;
    this.setState({ value: val }, () => {
      this.props.onSearch(val);
    });
  };

  //Resetting the search result for back button
  resetSearchResult = () => {
    this.setState({ searchResults: [] });
  };

  render() {
    const { book, searchBooks, onMoveBook } = this.props;

    searchBooks.map((searchedBook) => {
      book.map((books) => {
        if (books.id === searchedBook.id) {
          searchedBook.shelf = books.shelf;
        }
        return books;
      });
      //Books should read "None" if they haven't been added to a shelf
      if (!searchedBook.shelf) {
        searchedBook.shelf = "none";
      }
      return book;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <BackButton resetSearch={this.resetSearchResult} />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.value}
              placeholder="Search by title or author"
              onChange={this.onHandleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                onMoveBook={onMoveBook}
                shelf={book.shelf ? book.shelf : "none"}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

const BackButton = (props) => {
  const { resetSearch } = props;

  return <Link className="close-search" onClick={resetSearch} to="/" />;
};

//Property type list for SearchBook Component
SearchBook.propTypes = {
  book: PropTypes.array,
  searchBooks: PropTypes.array,
  onMoveBook: PropTypes.func,
  onSearch: PropTypes.func,
};
export default SearchBook;
