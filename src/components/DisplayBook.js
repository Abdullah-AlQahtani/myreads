import React from "react";


const DisplayBook = ({book , onShelfChange}) => {

    const coverImgURL = book.imageLinks ? book.imageLinks.smallThumbnail : "http://via.placeholder.com/128x190";

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <img
              className="book-cover"
              src={coverImgURL}
              alt="Book Cover img"
            />
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={e => onShelfChange(book, e)}
              >
                <option value="none" disabled="disabled">
                  Move to...
                </option>
                <option value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>

          <div className="book-authors">
            {book.authors ? book.authors.join(', ') : book.publisher}
          </div>
        </div>
      </li> )
  }


export default DisplayBook;
