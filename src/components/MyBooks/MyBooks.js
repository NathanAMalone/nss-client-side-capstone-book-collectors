import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export const MyBooks = () => {
    //user should see all of their books displayed
        //Need to fetch all booksOwned with expanded book information
        const [ownedBooks, setOwnedBooks] = useState([])
        const [bookSeriesNames, setBookSeriesNames] = useState([])
        const [filteredOwnedBooks, setfilteredOwnedBooks] = useState([])

        const localBookUser = localStorage.getItem("book_user")
        const bookUserObject = JSON.parse(localBookUser)
        const navigate = useNavigate()

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
        
        const handleEditButtonClick = (event) => {
            event.preventDefault()
            navigate("/updateBook")
        }
            

        return <>
        <h2>Your Books</h2>
            <article className="ownedBooks">
        {/* // if booksOwned.book.bookSeriesId === bookSeries.id, then Book Series: bookSeries.bookSeries */}
        {/* // Book Title: booksOwned.bookName, Actual Author: booksOwned.bookAuthor, User's Thoughts: booksOwned.bookThoughts, Year of Publication: booksOwned.book.publicationDate, Dustjacket: if booksOwned.dustJacket true, yes; else no */}
                
                {
                    filteredOwnedBooks.map((filteredOwnedBook) => {
                        return <section className="ownedBook" key={`ownedBook--${filteredOwnedBook.id}`}>
                            <header className="ownedBookHeader">
                                Book Series: {/*{bookSeriesNames.map((bookSeriesName) => {
                                    if(bookSeriesName.id === filteredOwnedBook.book.bookSeriesNameIed)
                                        return ({bookSeriesName.bookSeries})
                                })} */}
                            </header>
                            <section>
                                Book Title: {filteredOwnedBook.book.bookName}
                                Actual Author: {filteredOwnedBook.book.bookAuthor}
                                Your Toughts: {filteredOwnedBook.bookThoughts}
                                Year of Publication: {filteredOwnedBook.book.bookAuthor}
                                Dustjacket: {filteredOwnedBook.dustJacket?"Yes":"No"}
                            </section>
                            <button 
                onClick={(clickEvent) => handleEditButtonClick(clickEvent)}
                className="btn btn-primary">
                Edit Book Thoughts
            </button>

                    </section>
                    })
                }
                 


            </article>
        </>
}