//import React from 'react'

import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
//import Shiffle from "./Shiffle.jsx";
import SearchComponent from "./SearchComponent.jsx";
import "./App.css";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state.loadingDone = false;

    this.state = {
      isLoading: false,
      books: [],
      currently: [],
      wantRead: [],
      read: [],
      outputList: [],
      showSearchPage: false,
    };
  }

  async getBookById(id) {
    await BooksAPI.get(id).then((out) => {
      return out;
    });
  }

  async updateInBook(book, shelf) {
    this.getMore();
    this.setState({ wantRead: [] });
    this.setState({ currently: [] });
    this.setState({ read: [] });

    await BooksAPI.update(book, shelf).then((output) => {
      console.log("Just ........ ", output, "End ");

      output.read.map((id) => {
        BooksAPI.get(id).then((outpu) =>
          this.setState({ read: [...this.state.read, outpu] })
        ),
          console.log(
            "Just this.state.read  ........ ",
            this.state.read,
            "End of this.state.read"
          );
      });

      output.currentlyReading.map((id) => {
        BooksAPI.get(id).then((outpu) =>
          this.setState({ currently: [...this.state.currently, outpu] })
        ),
          console.log(
            "Just this.state.currently  ........ ",
            this.state.currently,
            "End of this.state.currently"
          );
      });

      output.wantToRead.map((id) => {
        BooksAPI.get(id).then((outpu) =>
          this.setState({ wantRead: [...this.state.wantRead, outpu] })
        ),
          console.log(
            "Just this.state.wantToRead  ........ ",
            this.state.wantRead,
            "End of this.state.wantToRead"
          );
      });
    });
    /*
    this.state.read = [...this.state.read, book];
    this.state.wantRead = [...this.state.wantRead, book];
    this.state.currently = [...this.state.currently, book];
    */
    this.getMore();
  }

  MoveBookFun = (value, book) => {
    this.updateInBook(book, value);
    // switch (value) {
    //   case "read":
    //     console.log("read  ........ ", this.state.read, "End of read");
    //     this.state.read = [...this.state.read, book];
    //     break;
    //   case "wantToRead":
    //     console.log(
    //       "wantRead ............ ",
    //       this.state.wantRead,
    //       "End of wantRead"
    //     );
    //     this.state.wantRead = [...this.state.wantRead, book];
    //     break;
    //   case "currentlyReading":
    //     console.log(
    //       "currently ............... ",
    //       this.state.currently,
    //       "End of currently"
    //     );
    //     this.state.currently = [...this.state.currently, book];
    //     break;
    // }
  };

  state = {
    isLoading: false,
    books: [],
    currently: [],
    wantRead: [],
    read: [],
    outputList: [],
    showSearchPage: false,
  };
  getMore() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  async componentDidMount() {
    try {
      await BooksAPI.getAll().then((output) =>
        output.map(
          (e) => (
            e.shelf === "currentlyReading"
              ? (this.state.currently = [...this.state.currently, e])
              : "",
            console.log(
              "================== currentlyReading ",
              this.state.currently
            ),
            e.shelf === "wantToRead"
              ? (this.state.wantRead = [...this.state.wantRead, e])
              : "",
            console.log("================== wantRead ", this.state.wantRead),
            e.shelf === "read"
              ? (this.state.read = [...this.state.read, e])
              : ""
          )
        )
      );
    } catch (err) {
      console.log("error ........ ", err);
    }
    this.getMore();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => <SearchComponent />} />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currently &&
                        this.state.currently.map((out) => (
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${out.imageLinks.smallThumbnail}`,
                                  }}
                                ></div>
                                <div className="book-shelf-changer">
                                  <select
                                    onChange={(evt) =>
                                      this.MoveBookFun(evt.target.value, out)
                                    }
                                  >
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-authors">{out.authors}</div>
                              <div className="book-title">{out.title}</div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want To Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantRead &&
                        this.state.wantRead.map((out) => (
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${out.imageLinks.smallThumbnail}`,
                                  }}
                                ></div>
                                <div className="book-shelf-changer">
                                  <select
                                    onChange={(evt) =>
                                      this.MoveBookFun(evt.target.value, out)
                                    }
                                  >
                                    <option value="move" disabled>
                                      Move to...
                                    </option>

                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-authors">{out.authors}</div>
                              <div className="book-title">{out.title}</div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read &&
                        this.state.read.map((out) => (
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${out.imageLinks.smallThumbnail}`,
                                  }}
                                ></div>
                                <div className="book-shelf-changer">
                                  <select
                                    onChange={(evt) =>
                                      this.MoveBookFun(evt.target.value, out)
                                    }
                                  >
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="read">Read</option>

                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-authors">{out.authors}</div>
                              <div className="book-title">{out.title}</div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                  className="close-search"
                 
                >
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
