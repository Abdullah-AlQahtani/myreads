import React from "react";
import { search } from "../BooksAPI";
import { Link } from "react-router-dom";
import DisplayBook from "./DisplayBook";
import sortBy from "sort-by";

class BooksSearch extends React.Component {
  state = {
    searchResults: [],
    query: ""
  };

  queryUpdate = query => {
    this.setState({ query: query });
    if (query.length === 0) {
      this.setState({ searchResults: [] });
    } else {
      search(query).then(searchResponse => {
        const items = searchResponse.error ? [] : searchResponse;
        this.setState({ searchResults: items });
      });
    }
  };
  render() {
    const { onShelfChange, mybooks } = this.props;
    const { searchResults, query } = this.state;

    const processedBooks = searchResults.map(book => {
      const found = mybooks.find(myBook => myBook.id === book.id);
      book.shelf = found ? found.shelf : "none";
      return book;
    });
    processedBooks.sort(sortBy("title"));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <p className="close-search">Close</p>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              placeholder="Search by titles or categories"
              onChange={event => this.queryUpdate(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {processedBooks.length > 0 ? (
            <ol className="books-grid">
              {processedBooks.map(book => (
                <DisplayBook
                  key={book.id}
                  book={book}
                  onShelfChange={onShelfChange}
                />
              ))}
            </ol>
          ) : (
            <div>
              <div className="no-results">

              </div>
            </div>
          )}
        </div>
        <div className="footer">

        </div>
      </div>
    );
  }
}

export default BooksSearch;
