import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./BookStatus.css"

export const BookStatus = () => {
    //fetch array  of owned books with expanded user and book
    // filter books to get array of only those owned by user
    // display messages of books about loan status

    const [ownedBooks, setOwnedBooks] = useState([])
    const [filteredOwnedBooks, setfilteredOwnedBooks] = useState([])

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/ownedBooks?_expand=book&_expand=user`)
            .then(response => response.json())
            .then((ownedBooksArray) => {
                setOwnedBooks(ownedBooksArray)
            })
        },
        []
        )

    useEffect(
        () => {
            const myOwnedBooks = ownedBooks.filter(ownedBook => ownedBook.userId === bookUserObject.id)
            setfilteredOwnedBooks(myOwnedBooks)
        },
        [ownedBooks]
    )

    return<>
        <h2>Status Updates for {bookUserObject.fullName}</h2>
            <h3><Link to={`/loanBooks`}>Manage your loaned books here!</Link></h3>
            <article className="bookStatus">
                {
                    filteredOwnedBooks.map((filteredOwnedBook) => {
                        return <section className="ownedBookStatus" key={`ownedBookStatus--${filteredOwnedBook.id}`}>
                            <header className="statusHeader">
                                {filteredOwnedBook.book.bookName}
                            </header>
                            <section className="statusDetails">
                            {
                                filteredOwnedBook.ableToLoan
                                ?<div className="statusDiv">
                                    This book has been available for loan since {filteredOwnedBook.ableToLoanDate}.
                                </div>
                                :""
                            }
                            {
                                (!filteredOwnedBook.ableToLoan && !filteredOwnedBook.approved)
                                ?<div className="statusDiv">
                                    This book has NOT been available for loan since {filteredOwnedBook.ableToLoanDate}.
                                </div>
                                :""
                            }
                            {
                                filteredOwnedBook.isClaimed
                                ?<div className="statusDiv">
                                    On {filteredOwnedBook.isClaimedDate}, {filteredOwnedBook.borrowerName} asked to borrow this book.
                                </div>
                                :""
                            }
                            {
                                filteredOwnedBook.approved
                                ?<div className="statusDiv">
                                    You lent this book to {filteredOwnedBook.borrowerName} on {filteredOwnedBook.approvedDate}. 
                                </div>
                                :""
                            }
                            {
                                (filteredOwnedBook.prevBorrowerName !== "" && filteredOwnedBook.returnedDate !== "")
                                ?<div>
                                  This book was last borrowed by {filteredOwnedBook.borrowerName} and returned on {filteredOwnedBook.returnedDate}.  
                                </div>
                                :""
                            }
                            </section>
                        </section>
                        
                    })
                }
            </article>
    </>

}