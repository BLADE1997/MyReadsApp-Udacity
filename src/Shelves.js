import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

//Since we are just rendering the shelves and their respective books, a stateless function will suffice
const Shelves = (props) => {
  const { shelf, book, onMoveBook } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {book.map((book) => (
            <Book
              key={book.id}
              book={book}
              shelf={shelf}
              onMoveBook={onMoveBook}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

//Property type list for Shelves Component
Shelves.propTypes = {
  shelf: PropTypes.object,
  book: PropTypes.array,
  onMoveBook: PropTypes.func,
};
export default Shelves;
