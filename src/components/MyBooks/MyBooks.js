import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./MyBooks.css"


export const MyBooks = ({ searchTermState, bookSeriesId }) => {
    //user should see all of their books displayed
        //Need to fetch all booksOwned with expanded book information
        const [ownedBooks, setOwnedBooks] = useState([])
        const [bookSeriesNames, setBookSeriesNames] = useState([])
        const [filteredOwnedBooks, setfilteredOwnedBooks] = useState([])
        // filter searched books
        const [filteredSearchedBooks, setFiltered] = useState([])

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
        
        //search from BookSearch.js
    useEffect(
        () => {
            const searchedBooks = filteredOwnedBooks.filter(filteredOwnedBook => {
                return filteredOwnedBook.book.bookName.toLowerCase().match(searchTermState.toLowerCase()) || 
                filteredOwnedBook.book.bookAuthor.toLowerCase().match(searchTermState.toLowerCase()) || 
                filteredOwnedBook.bookThoughts.toLowerCase().match(searchTermState.toLowerCase()) ||
                filteredOwnedBook.book.publicationDate.toString().match(searchTermState.toLowerCase())
            }) 
            setFiltered(searchedBooks)
        },
        [ searchTermState, filteredOwnedBooks ]
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
                                        if(bookSeriesName.id === filteredSearchedBook.book.bookSeriesNameId){
                                            return <section className="ownedBook" key={`ownedBook--${filteredSearchedBook.id}`}>
                                                    <header className="ownedBookHeader">
                                                        Book Series: {bookSeriesName.bookSeries}
                                                        
                                                    </header>
                                                    <section className="cardDetails">
                                                        <div className="cardData">
                                                            <div className="cardDiv">Book Title: {filteredSearchedBook.book.bookName}</div>
                                                            <div className="cardDiv">Actual Author: {filteredSearchedBook.book.bookAuthor}</div>
                                                            <div className="cardDiv">Your Toughts: {filteredSearchedBook.bookThoughts}</div>
                                                            <div className="cardDiv">Year of Publication: {filteredSearchedBook.book.publicationDate}</div>
                                                            <div className="cardDiv">Dustjacket: {filteredSearchedBook.dustJacket?"Yes":"No"}</div>
                                                        </div>
                                                        <div className="cardImage">
                                                            {
                                                                (filteredSearchedBook.bookImage === "")
                                                                ?<Link to={`/pictureBooks/${filteredSearchedBook.id}`} className="imgLink">Add a Picture of your book here!</Link>
                                                                :<img className="cardImg" src={filteredSearchedBook.bookImage}></img>
                                                            }
                                                        </div>
                                                    </section>
                                                    <footer className="cardButtons">
                                                        <button onClick={
                                                            () => navigate(`/updateBook/${filteredSearchedBook.id}`)}
                                                        className="btn btn-primary"
                                                        key={`editButton--${filteredSearchedBook.id}`}>
                                                            Edit Book
                                                        </button>
                                                        <button 
                                                            onClick={(

                                                            ) => fetch(
                                                                `http://localhost:8088/ownedBooks/${filteredSearchedBook.id}`, {
                                                                    method: "DELETE",
                                                                })
                                                                .then(() => {
                                                                    getOwnedBooks()
                                                                })
                                                            }
                                                            className="btn btn-primary"
                                                            key={`deleteButton--${filteredSearchedBook.id}`}>
                                                            Delete Book
                                                        </button>
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