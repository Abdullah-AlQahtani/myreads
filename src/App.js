import React from "react";
import { Route } from 'react-router-dom'
import "./App.css";
import ShelvesList from "./components/ShelvesList";
import BooksSearch from "./components/BooksSearch";
import * as BooksAPI from "./BooksAPI";


class App extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.fetchBooks();
  }


  filterBookByShelfStatus = (books, ShelfStatus) =>
    books.filter(b => b.shelf === ShelfStatus);

  shelfChange = (currentBook, event) => {
    currentBook.shelf = event.target.value;
    const rollbackState = this.state.books;
    const updatedState = this.state.books.filter(function(el) {
      return el.id !== currentBook.id;
    });
    updatedState.push(currentBook);
    this.setState({ books: updatedState });

    BooksAPI.update(currentBook, event.target.value)
      .then(bookData => {})
      .catch(err => {
        this.setState({ books: rollbackState });
      });
  };

  fetchBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ShelvesList
              onShelfChange={this.shelfChange}
              books={this.state.books}
            />
          )}
        />
        <Route path="/search" render={({ history }) => (
            <BooksSearch
              onShelfChange={this.shelfChange}
              mybooks={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
