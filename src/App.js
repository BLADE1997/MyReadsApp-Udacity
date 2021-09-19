import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookList from "./BookList";
import SearchBook from "./SearchBook";

class BooksApp extends Component {
  state = {
    books: [],
    searchResults: [],

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false,
  };

  shelves = [
    { id: "currentlyReading", name: "Currently Reading" },
    { id: "wantToRead", name: "Want to Read" },
    { id: "read", name: "Read" },
  ];

  //getting books dynamically from the API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  //Function for moving books to respective shelf
  onMoveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      if (book.shelf === "none" && shelf !== "none") {
        this.setState((state) => {
          const newBooks = state.books.concat(book);
          return { books: newBooks };
        });
      }

      const updatedBooks = this.state.books.map((c) => {
        if (c.id === book.id) {
          c.shelf = shelf;
        }
        return c;
      });

      this.setState({
        books: updatedBooks,
      });
    });
  };

  //Search query function that handles the search feature
  searchBooks = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query)
        .then((books) => {
          if (books.error) {
            this.setState({ searchResults: [] });
          } else {
            this.setState({ searchResults: books });
          }
        })
        .catch(this.setState({ searchResults: [] }));
    } else {
      this.setState({ searchResults: [] });
    }
  };

  render() {
    const { books, searchResults } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              shelves={this.shelves}
              book={books}
              onMoveBook={this.onMoveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBook
              book={books}
              searchBooks={searchResults}
              onMoveBook={this.onMoveBook}
              onSearch={this.searchBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
