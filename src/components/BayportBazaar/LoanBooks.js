import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export const LoanBooks = ({ searchTermState, bookSeriesId }) => {
    //user should see all of their books displayed
    //Need to fetch all booksOwned with expanded book information
    const [ownedBooks, setOwnedBooks] = useState([])
    const [bookSeriesNames, setBookSeriesNames] = useState([])
    const [filteredOwnedBooks, setfilteredOwnedBooks] = useState([])
    const [ableToLoan, setAbleToLoan] = useState(false)
    // set filter for searched books
    const [filteredSearchedBooks, setFiltered] = useState([])

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    const navigate = useNavigate()

    const newDate = new Date()
    const month = newDate.getUTCMonth() +1
    const date = newDate.getUTCDate()
    const year = newDate.getUTCFullYear()
    const today = year + "-" + month + "-" + date

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

    //search from BookSearch.js
    useEffect(
        () => {
            const searchedBooks = filteredOwnedBooks.filter(filteredOwnedBook => {
                return filteredOwnedBook.book.bookName.toLowerCase().match(searchTermState.toLowerCase()) || 
                filteredOwnedBook.book.bookAuthor.toLowerCase().match(searchTermState.toLowerCase()) || 
                filteredOwnedBook.bookThoughts.toLowerCase().match(searchTermState.toLowerCase()) ||
                filteredOwnedBook.book.publicationDate.toString().match(searchTermState)
                
            }) 
            setFiltered(searchedBooks)
        },
        [ searchTermState, filteredOwnedBooks ]
    )

    // const deleteButton = () => {
    //         return fetch(`http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
    //             method: "DELETE",
    //         })
    //         .then(() => {
    //             getOwnedBooks()
    //         })
    // }    

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
                                            <section className="availDetails">
                                                <div className="availData">
                                                    <div className="cardDiv">Book Title: {filteredSearchedBook.book.bookName}</div>
                                                    <div className="cardDiv">Actual Author: {filteredSearchedBook.book.bookAuthor}</div>
                                                    <div className="cardDiv">Your Toughts: {filteredSearchedBook.bookThoughts}</div>
                                                    <div className="cardDiv">Year of Publication: {filteredSearchedBook.book.publicationDate}</div>
                                                    <div className="cardDiv">Dustjacket: {filteredSearchedBook.dustJacket ? "Yes" : "No"}</div>
                                                </div>
                                                <div className="availImage">
                                                    <img className="cardImg" src={filteredSearchedBook.bookImage}></img>
                                                </div>
                                            </section>
                                            <footer className="cardButtons">
                                                {
                                                    filteredSearchedBook.approved
                                                    ?<><div className="footerMessage">`{filteredSearchedBook.borrowerName} has your book.`</div>
                                                    <div className="footerMessage">Has the book been returned?    
                                                        <button
                                                            onClick={() => {
                                                                const approvalToSendToAPI = 
                                                                {
                                                                    bookThoughts: filteredSearchedBook.bookThoughts,
                                                                    dustJacket: filteredSearchedBook.dustJacket,
                                                                    bookId: filteredSearchedBook.bookId,
                                                                    userId: filteredSearchedBook.userId,
                                                                    ableToLoan: true,
                                                                    ableToLoanDate: today,
                                                                    isClaimed: false,
                                                                    isClaimedDate: "",
                                                                    bookImage: filteredSearchedBook.bookImage,
                                                                    borrowerName: filteredSearchedBook.borrowerName,
                                                                    approved: false,
                                                                    approvedDate: "",
                                                                    returnedDate: today,
                                                                    prevBorrowerName: filteredSearchedBook.prevBorrowerName
                                                                }
                                                                fetch(`http://localhost:8088/ownedBooks/${filteredSearchedBook.id}`, {
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
                                                            Book has been returned.
                                                        </button>
                                                    </div></>
                                                    :<>{
                                                        !filteredSearchedBook.isClaimed
                                                        ?<>
                                                        <div className="footerMessage">
                                                            {
                                                                filteredSearchedBook.ableToLoan
                                                                ?"Your book can be shared."
                                                                :"This book will not be shared."
                                                            }
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                if(filteredSearchedBook.ableToLoan === ableToLoan){
                                                                    const keyAbleToLoan = !ableToLoan
                                                                setAbleToLoan(!ableToLoan)
                                                                const ownedBookToSendtoAPI = 
                                                                    {
                                                                        bookThoughts: filteredSearchedBook.bookThoughts,
                                                                        dustJacket: filteredSearchedBook.dustJacket,
                                                                        bookId: filteredSearchedBook.bookId,
                                                                        userId: filteredSearchedBook.userId,
                                                                        ableToLoan: keyAbleToLoan,
                                                                        ableToLoanDate: today,
                                                                        isClaimed: filteredSearchedBook.isClaimed,
                                                                        isClaimedDate: filteredSearchedBook.isClaimedDate,
                                                                        bookImage: filteredSearchedBook.bookImage,
                                                                        borrowerName: filteredSearchedBook.borrowerName,
                                                                        approved: filteredSearchedBook.approved,
                                                                        approvedDate: filteredSearchedBook.approvedDate,
                                                                        returnedDate: filteredSearchedBook.returnedDate,
                                                                        prevBorrowerName: filteredSearchedBook.prevBorrowerName
                                                                    }
                                                                    fetch(`http://localhost:8088/ownedBooks/${filteredSearchedBook.id}`, {
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
                                                                        bookThoughts: filteredSearchedBook.bookThoughts,
                                                                        dustJacket: filteredSearchedBook.dustJacket,
                                                                        bookId: filteredSearchedBook.bookId,
                                                                        userId: filteredSearchedBook.userId,
                                                                        ableToLoan: keyAbleToLoan,
                                                                        ableToLoanDate: today,
                                                                        isClaimed: filteredSearchedBook.isClaimed,
                                                                        isClaimedDate: filteredSearchedBook.isClaimedDate,
                                                                        bookImage: filteredSearchedBook.bookImage,
                                                                        borrowerName: filteredSearchedBook.borrowerName,
                                                                        approved: filteredSearchedBook.approved,
                                                                        approvedDate: filteredSearchedBook.approvedDate,
                                                                        returnedDate: filteredSearchedBook.returnedDate,
                                                                        prevBorrowerName: filteredSearchedBook.prevBorrowerName
                                                                    }
                                                                    fetch(`http://localhost:8088/ownedBooks/${filteredSearchedBook.id}`, {
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
                                                            {!filteredSearchedBook.ableToLoan
                                                                ? "Loan Book"
                                                                : "Do Not Loan Book"
                                                            }
                                                        </button>
                                                        </>
                                                        :<>
                                                        <div className="footerMessage">Accept borrow request from {filteredSearchedBook.borrowerName}?</div>
                                                        <button
                                                            onClick={() => {
                                                                const approvalToSendToAPI = 
                                                                {
                                                                    bookThoughts: filteredSearchedBook.bookThoughts,
                                                                    dustJacket: filteredSearchedBook.dustJacket,
                                                                    bookId: filteredSearchedBook.bookId,
                                                                    userId: filteredSearchedBook.userId,
                                                                    ableToLoan: false,
                                                                    ableToLoanDate: filteredSearchedBook.ableToLoanDate,
                                                                    isClaimed: true,
                                                                    isClaimedDate: filteredSearchedBook.isClaimedDate,
                                                                    bookImage: filteredSearchedBook.bookImage,
                                                                    borrowerName: filteredSearchedBook.borrowerName,
                                                                    approved: true,
                                                                    approvedDate: today,
                                                                    returnedDate: "",
                                                                    prevBorrowerName: filteredSearchedBook.borrowerName
                                                                }
                                                                fetch(`http://localhost:8088/ownedBooks/${filteredSearchedBook.id}`, {
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
                                                                    bookThoughts: filteredSearchedBook.bookThoughts,
                                                                    dustJacket: filteredSearchedBook.dustJacket,
                                                                    bookId: filteredSearchedBook.bookId,
                                                                    userId: filteredSearchedBook.userId,
                                                                    ableToLoan: true,
                                                                    ableToLoanDate: filteredSearchedBook.ableToLoanDate,
                                                                    isClaimed: false,
                                                                    isClaimedDate: "",
                                                                    bookImage: filteredSearchedBook.bookImage,
                                                                    borrowerName: "",
                                                                    approved: false,
                                                                    approvedDate: "",
                                                                    returnedDate: filteredSearchedBook.returnedDate,
                                                                    prevBorrowerName: filteredSearchedBook.prevBorrowerName
                                                                }
                                                                fetch(`http://localhost:8088/ownedBooks/${filteredSearchedBook.id}`, {
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
                    }
                )
            }
        </article>
    </>
}
