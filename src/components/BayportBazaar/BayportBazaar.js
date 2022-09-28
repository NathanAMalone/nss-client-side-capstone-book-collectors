import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./BayportBazaar.css"

export const BayportBazaar = ({ searchTermState, bookSeriesId }) => {

    //fetch ownedbooks with expand book and user
    //fetch bookSereiesNames
    const [ownedBooks, setOwnedBooks] = useState([])
    const [bookSeriesNames, setBookSeriesNames] = useState([])
    // filter books to searched books
    const [filteredOwnedBooks, setFiltered] = useState([])

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    const newDate = new Date()
    const month = newDate.getUTCMonth() +1
    const date = newDate.getUTCDate()
    const year = newDate.getUTCFullYear()
    const today = year + "-" + month + "-" + date
    
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
        fetch(`http://localhost:8088/ownedBooks?_expand=book&_expand=user`)
        .then(response => response.json())
        .then((ownedBooksArray) => {
            setFiltered(ownedBooksArray)
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
            setFiltered(ownedBooksArray)
        })
    }
        //search from BookSearch.js
        useEffect(
            () => {
                const searchedBooks = ownedBooks.filter(ownedBook => {
                    return ownedBook.book.bookName.toLowerCase().match(searchTermState.toLowerCase()) || 
                    ownedBook.book.bookAuthor.toLowerCase().match(searchTermState.toLowerCase()) || 
                    ownedBook.bookThoughts.toLowerCase().match(searchTermState.toLowerCase()) ||
                    ownedBook.book.publicationDate.toString().match(searchTermState) ||
                    ownedBook.user.fullName.toLowerCase().match(searchTermState.toLowerCase())
                }) 
                setFiltered(searchedBooks)
            },
            [ searchTermState ]
        )


    // link at top of page to take you to an addbooks page(similar to MyBooks, just different buttons)
    // map books if ableToLoan=true then display book
    return <>
        <article className="bayportBazaar">
            {
                filteredOwnedBooks.map((filteredOwnedBook) => {
                    if (filteredOwnedBook.ableToLoan === true && filteredOwnedBook.userId !== bookUserObject.id) {
                        if (filteredOwnedBook.book.bookSeriesNameId === bookSeriesId || bookSeriesId===0){
                            return bookSeriesNames.map((bookSeriesName) => {
                                if (bookSeriesName.id === filteredOwnedBook.book.bookSeriesNameId) {
                                    return <section className="availableBooks" key={`availableBook--${filteredOwnedBook.id}`}>
                                        <header className="ownedBookHeader">
                                            Book Series: {bookSeriesName.bookSeries}
                                        </header>
                                        <section className="loanedDetails">
                                            <div className="loanedData">
                                                <div className="cardDiv">Book Title: {filteredOwnedBook.book.bookName}</div>
                                                <div className="cardDiv">Actual Author: {filteredOwnedBook.book.bookAuthor}</div>
                                                <div className="cardDiv">Your Toughts: {filteredOwnedBook.bookThoughts}</div>
                                                <div className="cardDiv">Year of Publication: {filteredOwnedBook.book.publicationDate}</div>
                                                <div className="cardDiv">Dustjacket: {filteredOwnedBook.dustJacket ? "Yes" : "No"}</div>
                                                <div className="cardDiv">Owner: {filteredOwnedBook.user.fullName}</div>
                                            </div>
                                            <div className="loanedImage">
                                                <img className="cardImg" src={filteredOwnedBook.bookImage}></img>
                                            </div>
                                        </section>
                                        <footer className="availableButtons">
                                            {
                                                filteredOwnedBook.isClaimed
                                                    ?<div className="footerMessage">
                                                        {filteredOwnedBook.borrowerName} would like to borrow this book.
                                                    </div> 
                                                    : <button
                                                        onClick={() => {
                                                            const borrowerToSendToAPI =
                                                            {
                                                                bookThoughts: filteredOwnedBook.bookThoughts,
                                                                dustJacket: filteredOwnedBook.dustJacket,
                                                                bookId: filteredOwnedBook.bookId,
                                                                userId: filteredOwnedBook.userId,
                                                                ableToLoan: filteredOwnedBook.ableToLoan,
                                                                ableToLoanDate: filteredOwnedBook.ableToLoanDate,
                                                                isClaimed: true,
                                                                isClaimedDate: today, 
                                                                bookImage: filteredOwnedBook.bookImage,
                                                                borrowerName: bookUserObject.fullName,
                                                                approved: filteredOwnedBook.approved,
                                                                approvedDate: filteredOwnedBook.approvedDate,
                                                                returnedDate: filteredOwnedBook.returnedDate,
                                                                prevBorrowerName: filteredOwnedBook.prevBorrowerName
                                                            }
                                                            
                                                        fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
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
                    }
                })
            }
    </article>
    </>
}