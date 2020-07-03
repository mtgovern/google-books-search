import React, { useState } from "react";
import axios from "axios";

function Search() {
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;
    // let authors = ['Param', 'Vennila', 'Afrin'];
    // bookAuthors(authors);
    // // Param, Vennila and Afrin
    // let authors = ['Param', 'Afrin'];
    // bookAuthors(authors);
    // // Param and Afrin

    const [books, setBooks] = useState({ items: [] });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const fetchBooks = async () => {
        // set loading Before API operation starts
        // // Books result
        // // console.log(result.data);
        setLoading(true);
        setError(false);
        try {
            const result = await axios.get(`${API_URL}?q=${searchTerm}`);
            setBooks(result.data);
        }
        catch (error) {
            setError(true);
        }
        // After API operation end
        setLoading(false);
    }

    const bookAuthors = authors => {
        if (authors) {
            if (authors.length <= 2) {
                authors = authors.join(' and ');
            } else if (authors.length > 2) {
                let lastAuthor = ' and ' + authors.slice(-1);
                authors.pop();
                authors = authors.join(', ');
                if (lastAuthor === undefined) {
                    console.log(authors)
                }
                authors += lastAuthor;
            }
        } else {
            authors = "No Author";
        }
        return authors;

    };

    // Submit handler
    const onSubmitHandler = (e) => {
        // Prevent browser refreshing after form submission
        e.preventDefault();
        // Call fetch books async function
        fetchBooks();
    }

    return (
        <section>
            <form onSubmit={onSubmitHandler}>
                <label>
                    <span>Search for books</span>
                    <input
                        type="search"
                        placeholder="microservice, restful design, etc.,"
                        value={searchTerm}
                        onChange={onInputChange}
                    />

                    <button type="submit">Search</button>
                </label>
                {
                    error && <div style={{ color: `red` }}>some error occurred, while fetching api</div>
                }
                {
                    loading && <div style={{ color: `green` }}>fetching books for "<strong>{searchTerm}</strong>"</div>
                }
            </form>
            <ul>
                {
                    books.items.map((book, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    <img alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                                    <div>
                                        <h3>{book.volumeInfo.title}</h3>
                                        <p>{bookAuthors(book.volumeInfo.authors)}</p>
                                        <p>{book.volumeInfo.publishedDate}</p>
                                    </div>
                                </div>
                                <hr />
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    );
};

export default Search;