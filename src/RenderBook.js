import React, { Component } from "react";

const RenderBook = (props) => {
  console.log("props > ", props);
    console.log("RenderB > ", props.items);


  return (
 <div className="bookshelf">
  <li>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${output.imageLinks.smallThumbnail})`,
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
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-authors">{output.authors}</div>
                          <div className="book-title">{output.title}</div>
                        </div>
                      </li>
                </div>
  );
};

export default RenderBook;
