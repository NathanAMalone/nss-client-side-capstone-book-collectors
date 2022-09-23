import { useEffect, useState } from "react"
import "./BookStatus.css"

export const BookStatus = ({ searchTermState }) => {
    //fetch array  of owned books with expanded user and book
    // filter books to get array of only those owned by user
    // display messages of books about loan status

    const [ownedBooks, setOwnedBooks] = useState([])
    const [filteredOwnedBooks, setfilteredOwnedBooks] = useState([])
    //Set filter for searched books
    const [filteredSearchedBooks, setFiltered] = useState([])

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

    //search from BookSearch.js
    useEffect(
        () => {
            const searchedBooks = filteredOwnedBooks.filter(filteredOwnedBook => {
                return filteredOwnedBook.book.bookName.toLowerCase().match(searchTermState.toLowerCase()) || 
                filteredOwnedBook.ableToLoanDate.toLowerCase().match(searchTermState.toLowerCase()) || 
                filteredOwnedBook.isClaimedDate.toLowerCase().match(searchTermState.toLowerCase()) ||
                filteredOwnedBook.borrowerName.toLowerCase().match(searchTermState.toLowerCase()) ||
                filteredOwnedBook.approvedDate.toLowerCase().match(searchTermState.toLowerCase()) ||
                filteredOwnedBook.returnedDate.toLowerCase().match(searchTermState.toLowerCase()) 
            }) 
            setFiltered(searchedBooks)
        },
        [ searchTermState, filteredOwnedBooks ]
    )

    return<>
       
            <article className="bookStatus">
                {
                    filteredSearchedBooks.map((filteredSearchedBook) => {
                        return <section className="ownedBookStatus" key={`ownedBookStatus--${filteredSearchedBook.id}`}>
                            <header className="statusHeader">
                                {filteredSearchedBook.book.bookName}
                            </header>
                            <section className="statusDetails">
                            {
                                filteredSearchedBook.ableToLoan
                                ?<div className="statusDiv">
                                    This book has been available for loan since {filteredSearchedBook.ableToLoanDate}.
                                </div>
                                :""
                            }
                            {
                                (!filteredSearchedBook.ableToLoan && !filteredSearchedBook.approved)
                                ?<div className="statusDiv">
                                    This book has NOT been available for loan since {filteredSearchedBook.ableToLoanDate}.
                                </div>
                                :""
                            }
                            {
                                filteredSearchedBook.isClaimed
                                ?<div className="statusDiv">
                                    On {filteredSearchedBook.isClaimedDate}, {filteredSearchedBook.borrowerName} asked to borrow this book.
                                </div>
                                :""
                            }
                            {
                                filteredSearchedBook.approved
                                ?<div className="statusDiv">
                                    You lent this book to {filteredSearchedBook.borrowerName} on {filteredSearchedBook.approvedDate}. 
                                </div>
                                :""
                            }
                            {
                                (filteredSearchedBook.prevBorrowerName !== "" && filteredSearchedBook.returnedDate !== "")
                                ?<div className="statusDiv">
                                    This book was last borrowed by {filteredSearchedBook.prevBorrowerName} and returned on {filteredSearchedBook.returnedDate}.  
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