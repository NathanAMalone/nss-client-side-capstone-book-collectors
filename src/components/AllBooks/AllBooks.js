import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AllBooks.css"


export const AllBooks = ({ searchTermState, bookSeriesId }) => {
    //user should see all of their books displayed
    //Need to fetch all booksOwned with expanded book information
    const [ownedBooks, setOwnedBooks] = useState([])
    const [bookSeriesNames, setBookSeriesNames] = useState([])
    // filter searched books
    const [filteredSearchedBooks, setFiltered] = useState([])

    const navigate = useNavigate()

    const getOwnedBooks = () => {
        fetch(`http://localhost:8088/ownedBooks?_expand=book`)
            .then(response => response.json())
            .then((ownedBooksArray) => {
                setOwnedBooks(ownedBooksArray)
            })
    }
    useEffect(
        () => {
            fetch(`http://localhost:8088/ownedBooks?_expand=book`)
                .then(response => response.json())
                .then((ownedBooksArray) => {
                    setOwnedBooks(ownedBooksArray)
                })
        },
        []
    )


    //fetch bookSeries

    useEffect(
        () => {
            fetch(`http://localhost:8088/bookSeriesNames`)
                .then(response => response.json())
                .then((bookSeriesArray) => {
                    setBookSeriesNames(bookSeriesArray)
                })
        },
        []
    )

    //search from BookSearch.js
    useEffect(
        () => {
            const searchedBooks = ownedBooks.filter(ownedBook => {
                return ownedBook.book.bookName.toLowerCase().match(searchTermState.toLowerCase() ) ||
                    ownedBook.book.bookAuthor.toLowerCase().match(searchTermState.toLowerCase()) ||
                    ownedBook.bookThoughts.toLowerCase().match(searchTermState.toLowerCase()) ||
                    ownedBook.book.publicationDate.toString().match(searchTermState.toLowerCase())
            })
            setFiltered(searchedBooks)
        },
        [searchTermState, ownedBooks]
    )

    return <>
        <article className="ownedBooks">
            {/* // if booksOwned.book.bookSeriesId === bookSeries.id, then Book Series: bookSeries.bookSeries */}
            {/* // Book Title: booksOwned.bookName, Actual Author: booksOwned.bookAuthor, User's Thoughts: booksOwned.bookThoughts, Year of Publication: booksOwned.book.publicationDate, Dustjacket: if booksOwned.dustJacket true, yes; else no */}

            {
                filteredSearchedBooks.map(
                    (filteredSearchedBook) => {
                        if (filteredSearchedBook.book.bookSeriesNameId === bookSeriesId || bookSeriesId===0){
                            return bookSeriesNames.map(
                                (bookSeriesName) => {
                                    if (bookSeriesName.id === filteredSearchedBook.book.bookSeriesNameId) {
                                        return <section className="ownedBook" key={`ownedBook--${filteredSearchedBook.id}`}>
                                            <header className="ownedBookHeader">
                                                Book Series: {bookSeriesName.bookSeries}

                                            </header>
                                            <section className="cardDetails">
                                                <div className="cardDiv">Book Title: {filteredSearchedBook.book.bookName}</div>
                                                <div className="cardDiv">Actual Author: {filteredSearchedBook.book.bookAuthor}</div>
                                                <div className="cardDiv">Your Toughts: {filteredSearchedBook.bookThoughts}</div>
                                                <div className="cardDiv">Year of Publication: {filteredSearchedBook.book.publicationDate}</div>
                                                <div className="cardDiv">Dustjacket: {filteredSearchedBook.dustJacket ? "Yes" : "No"}</div>
                                                <img className="cardImg" src={filteredSearchedBook.bookImage}></img>
                                            </section>
                                        </section>
                                    }
                                }
                            )         
                        }
                    }
                )
            }
        </article>
    </>
}