import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MyBooks.css"


export const MyBooks = () => {
    //user should see all of their books displayed
        //Need to fetch all booksOwned with expanded book information
        const [ownedBooks, setOwnedBooks] = useState([])
        const [bookSeriesNames, setBookSeriesNames] = useState([])
        const [filteredOwnedBooks, setfilteredOwnedBooks] = useState([])

        const localBookUser = localStorage.getItem("book_user")
        const bookUserObject = JSON.parse(localBookUser)
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
                                    if(bookSeriesName.id === filteredOwnedBook.book.bookSeriesNameId){
                                        return <section className="ownedBook" key={`ownedBook--${filteredOwnedBook.id}`}>
                                                <header className="ownedBookHeader">
                                                    Book Series: {bookSeriesName.bookSeries}
                                                    
                                                </header>
                                                <section>
                                                    Book Title: {filteredOwnedBook.book.bookName}
                                                    Actual Author: {filteredOwnedBook.book.bookAuthor}
                                                    Your Toughts: {filteredOwnedBook.bookThoughts}
                                                    Year of Publication: {filteredOwnedBook.book.publicationDate}
                                                    Dustjacket: {filteredOwnedBook.dustJacket?"Yes":"No"}
                                                </section>
                                                <button onClick={
                                                    () => navigate(`/updateBook/${filteredOwnedBook.id}`)}
                                                className="btn btn-primary">
                                                    Edit Book
                                                </button>
                                                <button 
                                                    onClick={(

                                                    ) => fetch(
                                                        `http://localhost:8088/ownedBooks/${filteredOwnedBook.id}`, {
                                                            method: "DELETE",
                                                        })
                                                        .then(() => {
                                                            getOwnedBooks()
                                                        })
                                                    }
                                                    className="btn btn-primary">
                                                    Delete Book
                                                </button>
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