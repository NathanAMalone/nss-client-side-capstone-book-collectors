import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const BayportBazaar = () => {

    //fetch ownedbooks with expand book and user
    //fetch bookSereiesNames
    const [ownedBooks, setOwnedBooks] = useState([])
    const [bookSeriesNames, setBookSeriesNames] = useState([])

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    useEffect(() => {
        fetch(`http://localhost:8088/ownedBooks?_expand=book&_expand=user`)
            .then(response => response.json())
            .then((ownedBooksArray) => {
                setOwnedBooks(ownedBooksArray)
            })
    },
        []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/bookSeriesNames`)
            .then(response => response.json())
            .then((bookSeriesArray) => {
                setBookSeriesNames(bookSeriesArray)
            })
    },
        []
    )

    const getBooks = () => {
        fetch(`http://localhost:8088/ownedBooks?_expand=book&_expand=user`)
            .then(response => response.json())
            .then((ownedBooksArray) => {
                setOwnedBooks(ownedBooksArray)
            })
    }


    // link at top of page to take you to an addbooks page(similar to MyBooks, just different buttons)
    // map books if ableToLoan=true then display book
    return <>
        <h2>Welcome to the Bayport Bazaar!</h2>
        <h3>
            <Link to={`/loanBooks`}>Manage your loaned books here!</Link>
        </h3>
        <article className="bayportBazaar">
            {
                ownedBooks.map((ownedBook) => {
                    if (ownedBook.ableToLoan === true && ownedBook.userId !== bookUserObject.id) {
                        return bookSeriesNames.map((bookSeriesName) => {
                            if (bookSeriesName.id === ownedBook.book.bookSeriesNameId) {
                                return <section className="availableBooks" key={`availableBook--${ownedBook.id}`}>
                                    <header className="ownedBookHeader">
                                        Book Series: {bookSeriesName.bookSeries}
                                    </header>
                                    <section className="avilableDetails">
                                        <div className="cardDiv">Book Title: {ownedBook.book.bookName}</div>
                                        <div className="cardDiv">Actual Author: {ownedBook.book.bookAuthor}</div>
                                        <div className="cardDiv">Your Toughts: {ownedBook.bookThoughts}</div>
                                        <div className="cardDiv">Year of Publication: {ownedBook.book.publicationDate}</div>
                                        <div className="cardDiv">Dustjacket: {ownedBook.dustJacket ? "Yes" : "No"}</div>
                                        <div className="cardDiv">Owner: {ownedBook.user.fullName}</div>
                                    </section>
                                    <footer>
                                        {
                                            ownedBook.isClaimed
                                                ? `${ownedBook.borrowerName} would like to borrow this book.`
                                                : <button
                                                    onClick={() => {
                                                        const borrowerToSendToAPI =
                                                        {
                                                            "bookThoughts": ownedBook.bookThoughts,
                                                            "dustJacket": ownedBook.dustJacket,
                                                            "bookId": ownedBook.bookId,
                                                            "userId": ownedBook.userId,
                                                            "ableToLoan": ownedBook.ableToLoan,
                                                            "isClaimed": true,
                                                            "bookImage": "",
                                                            "borrowerName": bookUserObject.fullName,
                                                            "approved": ownedBook.approved
                                                        }
                                                        
                                                    fetch(`http://localhost:8088/ownedBooks/${ownedBook.id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-type": "application/json"
                                                        },
                                                        body: JSON.stringify(borrowerToSendToAPI)
                                                    })
                                                        .then(() => { getBooks() })
                                                }}
                                                className="btn btn-primary">
                                        Borrow Book!
                                    </button>
                                        }
                                </footer>
                                </section>
                            }
                        })
                    }
                })
            }
    </article>
    </>
}