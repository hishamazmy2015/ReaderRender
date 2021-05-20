import React, { Fragment, Component } from "react";
import { useState, useEffect } from "react";
//import ShiffleRender from "./ShiffleRender.js";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";


const SearchComponent = (props) => {
  let [books, setBooks] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false);

  const updateBooks = (updatedbooks) => {
    setBooks(updatedbooks);
    props.updateBooks(updatedbooks);
  };

  function getMore() {
    this.setState({ isLoading: !this.state.isLoading });
  }
  let state = {
    showSearchPage: false,
    isLoading: false,
  };

  const searchFun = async (name) => {
    await BooksAPI.search(name, 5).then((output) => setBooks(output));
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" 
          className="close-search"
          onClick={() => {
            setShowSearchPage(true);
          }}
          >
          Close        
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(evt) => searchFun(evt.target.value)}
            placeholder="Search by title or author"
          />
        </div>
      </div>

      <div className="search-books-results">
        <div className="bookshelf">
          <h2 className="bookshelf-title">List of Books of search</h2>

          <div className="bookshelf-books">
            <ol className="books-grid">
              {books ? (
                books && books.length > 0 &&
                books.map((out) =>
                  out === null  ? (
                    ""
                  ) : (
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${out.imageLinks&&out.imageLinks.smallThumbnail ? out.imageLinks.smallThumbnail :''})`,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select>
                            <option value="move" disabled>
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
                      <div className="book-authors">{out.authors}</div>
                      <div className="book-title">{out.title}</div>
                    </div>
                  )
                )
              ) : (
                <div>There is no Result</div>
              )}
            </ol>
          </div>
        </div>
        );
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
};

export default SearchComponent;
