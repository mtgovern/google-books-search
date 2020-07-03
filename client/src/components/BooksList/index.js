import React from 'react';
import "./style.css";

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
const Book = ({ book }) => {

    return (
        <div>
            <div className="row" key={book.id}>
                <div className="col">{book.volumeInfo.title}
                    {/* <button onClick={() => book.saveBook(book.id)} className="btn save">Save</button> */}
                    <button>
                        <a className="btn save" href={book.volumeInfo.infoLink} target="_blank">Save</a>
                    </button>
                    <button>
                        <a className="btn view" href={book.volumeInfo.infoLink} target="_blank">View</a>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">{book.volumeInfo.publishedDate}</div>
            </div>
            <div className="row">
                <div className="col">{bookAuthors(book.volumeInfo.authors)}</div>
            </div>
            <duv className="row">
                <div className="col img-fluid">
                    <img alt={`${book.volumeInfo.title} book`}
                        src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=&img=1&zoom=&ksource=gbs_api`} />
                    <span className="text">{book.volumeInfo.description}</span>
                </div>
            </duv>
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