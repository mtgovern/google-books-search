import React from 'react';
import "./style.css";
import API from "../../utils/API";

// Separate the UI specific transforming logic to utils folder
//import { bookAuthors } from '../utils';
const bookAuthors = (authors) => {
    if (authors) {
        if (authors.length <= 2) {
            authors = authors.join(" and ");
        } else if (authors.length > 2) {
            let lastAuthor = " and " + authors.slice(-1);
            authors.pop();
            authors = authors.join(", ");
            authors += lastAuthor;
        }
    } else {
        authors = "Author not provided";
    }
    return authors;
}

function handleSave(book) {
    // event.preventDefault();
    // if (formObject.title && formObject.author) {
      API.saveBook({
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg",
        link: book.volumeInfo.infoLink,
      })
        .then((results) => {
            console.log(results);
        })
        .catch(err => console.log(err));
    }

const Book = ({ book }) => {

    return (
        <div>
            <div className="row" key={book.id}>
                <div className="col">{book.volumeInfo.title}
                    <button onClick={() => handleSave(book)} className="save">
                        Save
                    </button>
                    {/* <button>
                        <a className="btn save" href={book.volumeInfo.infoLink} target="_blank">Save</a>
                    </button> */}
                    <button>
                        <a className="view" href={book.volumeInfo.infoLink} target="_blank">View</a>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">{book.volumeInfo.publishedDate}</div>
            </div>
            <div className="row">
                <div className="col">{bookAuthors(book.volumeInfo.authors)}</div>
            </div>
            <div className="row">
                <div className="col img-fluid">
                    <img alt={`${book.volumeInfo.title} book`}
                        src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=&img=1&zoom=&ksource=gbs_api`} />
                    <span className="text">{book.volumeInfo.description}</span>
                </div>
            </div>
        </div>
    );
};

    const BooksList = ({ books }) => {
        return (
            <ul>
                {books.items.map((book, index) => {
                    return <Book book={book} key={index} />;
                })}
            </ul>
        );
    };
    export default BooksList;