import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import DisplayBook from "./DisplayBook";

class ShelvesList extends React.Component {

  render() {
    const { onShelfChange, books } = this.props;

    return (
      <div className="list-books">
        <Header/>
        <div className="list-books-content">
          <BookSections
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === "currentlyReading")}
            ShelfStatus="Currently Reading"
          />
          <BookSections
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === "wantToRead")}
            ShelfStatus="Want to Read"
          />
          <BookSections
            onShelfChange={onShelfChange}
            books={books.filter(b => b.shelf === "read")}
            ShelfStatus="Read"
          />
          <Link to="/search">
            <div className="open-search">
              <p></p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const BookSections = ({ ShelfStatus, onShelfChange, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">
      {ShelfStatus}
    </h2>
    {books.length === 0 ? (
      <div className="no-results">There is Nothing to show</div>
    ) : (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <DisplayBook
              key={book.id}
              book={book}
              onShelfChange={onShelfChange}
            />
          ))}
        </ol>
      </div>
    )}
  </div>
);

export default ShelvesList;
