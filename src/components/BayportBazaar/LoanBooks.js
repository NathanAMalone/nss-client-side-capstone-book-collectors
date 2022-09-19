import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const LoanBooks = () => {
    //user should see all of their books displayed
    //Need to fetch all booksOwned with expanded book information
    const [ownedBooks, setOwnedBooks] = useState([])
    const [bookSeriesNames, setBookSeriesNames] = useState([])
    const [filteredOwnedBooks, setfilteredOwnedBooks] = useState([])
    const [ableToLoan, setAbleToLoan] = useState(false)

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    const navigate = useNavigate()

    const getFilteredBooks = () => {
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


    // filter booksOwned to those only of the user.

    useEffect(
        () => {
            const myOwnedBooks = ownedBooks.filter(ownedBook => ownedBook.userId === bookUserObject.id)
            setfilteredOwnedBooks(myOwnedBooks)
        },
        [ownedBooks]
    )

    // const deleteButton = () => {
    //         return fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
    //             method: "DELETE",
    //         })
    //         .then(() => {
    //             getOwnedBooks()
    //         })
    // }    

const toggleAbleToLoan = () => {

    filteredOwnedBooks.map((filteredOwnedBook) => {
        const ownedBookToSendtoAPI = 
        {
            bookThoughts: filteredOwnedBook.bookThoughts,
            dustJacket: filteredOwnedBook.dustJacket,
            bookId: filteredOwnedBook.bookId,
            userId: filteredOwnedBook.userId,
            ableToLoan: ableToLoan,
            isClaimed: filteredOwnedBook.isClaimed,
            bookImage: filteredOwnedBook.bookImage
        }
        fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(ownedBookToSendtoAPI)
                })
    })
}

    return <>
        <h2>{bookUserObject.fullName}'s Books</h2>
        <article className="ownedBooks">
            {/* // if booksOwned.book.bookSeriesId === bookSeries.id, then Book Series: bookSeries.bookSeries */}
            {/* // Book Title: booksOwned.bookName, Actual Author: booksOwned.bookAuthor, User's Thoughts: booksOwned.bookThoughts, Year of Publication: booksOwned.book.publicationDate, Dustjacket: if booksOwned.dustJacket true, yes; else no */}

            {
                filteredOwnedBooks.map(
                    (filteredOwnedBook) => {
                        return bookSeriesNames.map(
                            (bookSeriesName) => {
                                if (bookSeriesName.id === filteredOwnedBook.book.bookSeriesNameId) {
                                    return <section className="ownedBook" key={`ownedBook--${filteredOwnedBook.id}`}>
                                        <header className="ownedBookHeader">
                                            Book Series: {bookSeriesName.bookSeries}

                                        </header>
                                        <section className="cardDetails">
                                            <div className="cardDiv">Book Title: {filteredOwnedBook.book.bookName}</div>
                                            <div className="cardDiv">Actual Author: {filteredOwnedBook.book.bookAuthor}</div>
                                            <div className="cardDiv">Your Toughts: {filteredOwnedBook.bookThoughts}</div>
                                            <div className="cardDiv">Year of Publication: {filteredOwnedBook.book.publicationDate}</div>
                                            <div className="cardDiv">Dustjacket: {filteredOwnedBook.dustJacket ? "Yes" : "No"}</div>
                                        </section>
                                        <footer className="cardButtons">
                                            {
                                                filteredOwnedBook.approved
                                                ?<><div>`{filteredOwnedBook.borrowerName} has your book.`</div>
                                                <div>Has the book been returned?    
                                                    <button
                                                        onClick={() => {
                                                            const approvalToSendToAPI = 
                                                            {
                                                                "bookThoughts": filteredOwnedBook.bookThoughts,
                                                                "dustJacket": filteredOwnedBook.dustJacket,
                                                                "bookId": filteredOwnedBook.bookId,
                                                                "userId": filteredOwnedBook.userId,
                                                                "ableToLoan": true,
                                                                "isClaimed": false,
                                                                "bookImage": "",
                                                                "borrowerName": "",
                                                                "approved": false
                                                            }
                                                            fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-type": "application/json"
                                                            },
                                                                body: JSON.stringify(approvalToSendToAPI)
                                                            })
                                                                .then(() => { getFilteredBooks() })
                                                        }}
                                                    >
                                                        Book has been returned.
                                                    </button>
                                                </div></>
                                                :<>{
                                                    !filteredOwnedBook.isClaimed
                                                    ?<>
                                                    <div className="loanMessage">
                                                        {
                                                            filteredOwnedBook.ableToLoan
                                                            ?"Your book can be shared."
                                                            :"This book will not be shared."
                                                        }
                                                    </div>
                                                    <button 
                                                        onClick={() => {
                                                            if(filteredOwnedBook.ableToLoan === ableToLoan){
                                                                const keyAbleToLoan = !ableToLoan
                                                            setAbleToLoan(!ableToLoan)
                                                            const ownedBookToSendtoAPI = 
                                                                {
                                                                    bookThoughts: filteredOwnedBook.bookThoughts,
                                                                    dustJacket: filteredOwnedBook.dustJacket,
                                                                    bookId: filteredOwnedBook.bookId,
                                                                    userId: filteredOwnedBook.userId,
                                                                    ableToLoan: keyAbleToLoan,
                                                                    isClaimed: filteredOwnedBook.isClaimed,
                                                                    bookImage: filteredOwnedBook.bookImage,
                                                                    borrowerName: filteredOwnedBook.borrowerName,
                                                                    approved: filteredOwnedBook.approved
                                                                }
                                                                fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-type": "application/json"
                                                                    },
                                                                    body: JSON.stringify(ownedBookToSendtoAPI)
                                                                })
                                                                .then(() => {getFilteredBooks()})
                                                            }
                                                            else {
                                                                const keyAbleToLoan = ableToLoan
                                                                setAbleToLoan(!ableToLoan)
                                                                const ownedBookToSendtoAPI = 
                                                                {
                                                                    bookThoughts: filteredOwnedBook.bookThoughts,
                                                                    dustJacket: filteredOwnedBook.dustJacket,
                                                                    bookId: filteredOwnedBook.bookId,
                                                                    userId: filteredOwnedBook.userId,
                                                                    ableToLoan: keyAbleToLoan,
                                                                    isClaimed: filteredOwnedBook.isClaimed,
                                                                    bookImage: filteredOwnedBook.bookImage,
                                                                    borrowerName: filteredOwnedBook.borrowerName,
                                                                    approved: filteredOwnedBook.approved
                                                                }
                                                                fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
                                                                    method: "PUT",
                                                                    headers: {
                                                                        "Content-type": "application/json"
                                                                    },
                                                                    body: JSON.stringify(ownedBookToSendtoAPI)
                                                                })
                                                                .then(() => {getFilteredBooks()})
                                                            }
                                                        }}
                                                        className="btn btn-primary">
                                                        {!filteredOwnedBook.ableToLoan
                                                            ? "Loan Book"
                                                            : "Do Not Loan Book"
                                                        }
                                                    </button>
                                                    </>
                                                    :<>
                                                    <div>Accept borrow request from {filteredOwnedBook.borrowerName}?</div>
                                                    <button
                                                        onClick={() => {
                                                            const approvalToSendToAPI = 
                                                            {
                                                                "bookThoughts": filteredOwnedBook.bookThoughts,
                                                                "dustJacket": filteredOwnedBook.dustJacket,
                                                                "bookId": filteredOwnedBook.bookId,
                                                                "userId": filteredOwnedBook.userId,
                                                                "ableToLoan": false,
                                                                "isClaimed": true,
                                                                "bookImage": "",
                                                                "borrowerName": filteredOwnedBook.borrowerName,
                                                                "approved": true
                                                            }
                                                            fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-type": "application/json"
                                                            },
                                                            body: JSON.stringify(approvalToSendToAPI)
                                                            })
                                                                .then(() => { getFilteredBooks() })
                                                        }}
                                                        className="btn btn-primary"
                                                        >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const approvalToSendToAPI = 
                                                            {
                                                                "bookThoughts": filteredOwnedBook.bookThoughts,
                                                                "dustJacket": filteredOwnedBook.dustJacket,
                                                                "bookId": filteredOwnedBook.bookId,
                                                                "userId": filteredOwnedBook.userId,
                                                                "ableToLoan": true,
                                                                "isClaimed": false,
                                                                "bookImage": "",
                                                                "borrowerName": "",
                                                                "approved": false
                                                            }
                                                            fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-type": "application/json"
                                                            },
                                                                body: JSON.stringify(approvalToSendToAPI)
                                                            })
                                                                .then(() => { getFilteredBooks() })
                                                        }}
                                                        className="btn btn-primary"
                                                    >
                                                        Reject
                                                    </button>
                                                    </>
                                                }</>
                                            }
                                        </footer>
                                    </section>
                                }
                            }
                        )
                    }
                )
            }
        </article>
    </>
}
