//import React from 'react'


import React, { useState, useEffect } from 'react';

import * as BooksAPI from "./BooksAPI";
import Shiffle from "./Shiffle.jsx";
import SearchComponent from "./SearchComponent.jsx";

import "./App.css";

const Library = () => {
  
  let [books, setBooks] = useState([]);
  let [currently, setCurrently] = useState([]);
  let [wantRead, setWantRead] = useState([]);
  let [read, setRead] = useState([]);
  let [state, setState] = useState();

  
 useEffect(async () => {
      console.log("************************* Inside Effect  ************************* ");
      console.log("============================================== Inside Effect Map ============================================= "),
      await BooksAPI.getAll().then(
        (output) => (
          output.map(
            (e) => (
              
              e.shelf === "currentlyReading"
                ? currently=[...currently, e]
                : "",
              console.log(
                "================== currentlyReading ",
                currently
              ),
              e.shelf === "wantToRead"
                ? wantRead=[...wantRead, e]
                : "",
                            console.log(
                "================== wantRead ",
                wantRead
              ),
              e.shelf === "read" ? 
              read=[...read, e] : ""
            )
          )         
        )
      );
    
      console.log("************************* End of  Effect  ************************* ");    
  }, []);
  
  //[currently,wantRead,read]=props.items;
  
  state = {
    showSearchPage: false,
    init: true,
  };
/*
  const updateBook(e) {
  var array = [...this.state.people]; // make a separate copy of the array
  var index = array.indexOf(e.target.value)
  if (index !== -1) {
    array.splice(index, 1);
    this.setState({people: array});
  }
}
 */

  
  
  
  const MoveBookFun = (value, book) => {
    switch (value) {
      case "read":
      console.log("read  ........ ", read, "End of read");
  	  read=[...read, book];
      break;
      case "wantToRead":
      console.log("wantRead ............ ", wantRead, "End of wantRead");
      wantRead=[...wantRead, book];        
      break;
      case "currentlyReading":
      console.log("currently ............... ", currently, "End of currently");
      currently=[...currently, book];
      break;
    }
  };
 // books = props.items;
  
  //  console.log("wantRead 777777 ........ ", wantRead, "End of wantRead");
   // console.log("currently 77777 ........ ", currently, "End of currently");
    //console.log("read 7777777 ........ ", read, "End of read");
  
  return (
    <div className="app">
      {state.showSearchPage ? (
        <SearchComponent />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {currently &&
                      currently.map((output) => (
                        <li>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage:
                                    'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
                                }}
                              ></div>
                              <div className="book-shelf-changer">
                                <select
                                  onChange={(evt) =>
                                    MoveBookFun(evt.target.value, output)
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
                            <div className="book-authors">{output.authors}</div>
                            <div className="book-title">{output.title}</div>
                          </div>
                        </li>
                      ))}
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 188,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
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
                        <div className="book-title">Ender's Game</div>
                        <div className="book-authors">Orson Scott Card</div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
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
                        <div className="book-title">The Hobbit</div>
                        <div className="book-authors">J.R.R. Tolkien</div>
                      </div>
                    </li>
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 174,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
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
                        <div className="book-title">
                          Oh, the Places You'll Go!
                        </div>
                        <div className="book-authors">Seuss</div>
                      </div>
                    </li>
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage:
                                'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
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
                        <div className="book-title">
                          The Adventures of Tom Sawyer
                        </div>
                        <div className="book-authors">Mark Twain</div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;

