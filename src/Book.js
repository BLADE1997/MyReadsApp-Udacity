import React from "react";
import ChangeShelf from "./ChangeShelf";
import PropTypes from "prop-types";

//Since we are just returning a book, a stateless function will suffice
const Book = (props) => {
  const { book, shelf, onMoveBook } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks &&
                book.imageLinks.thumbnail})`,
            }}
          />
          <ChangeShelf book={book} shelf={shelf} onMoveBook={onMoveBook} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>
    </li>
  );
};
//Property type list for Book Component
Book.propTypes = {
  book: PropTypes.object,
  shelf: PropTypes.object,
  onMoveBook: PropTypes.func,
};
export default Book;
