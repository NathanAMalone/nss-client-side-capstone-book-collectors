import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const MemberBooks = ({ searchTermState, bookSeriesId }) => {
    //user should see all of their books displayed
        //Need to fetch all booksOwned with expanded book information
        const {userId} = useParams()
        const [ownedBooks, setOwnedBooks] = useState([])
        const [bookSeriesNames, setBookSeriesNames] = useState([])
        const [user, updateUser] = useState({})
        const [filteredOwnedBooks, setfilteredOwnedBooks] = useState([])
        // filter searched books
        const [filteredSearchedBooks, setFiltered] = useState([])

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
        const rendered = () => {
            fetch(`http://localhost:8088/ownedBooks?_expand=book`)
                .then(response => response.json())
                .then((ownedBooksArray) => {
                    setOwnedBooks(ownedBooksArray)
                })
        }
        useEffect(
            () => {
                fetch(`http://localhost:8088/users/${userId}`)
                .then(response => response.json())
                .then((singleMember) => {
                    updateUser(singleMember)
                })
                .then(rendered())
            },
            [userId]
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
                const memberOwnedBooks = ownedBooks.filter(ownedBook => ownedBook.userId === user.id)
                setfilteredOwnedBooks(memberOwnedBooks)
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
                                        if(bookSeriesName.id === filteredSearchedBook.book.bookSeriesNameId){
                                            return <section className="ownedBook" key={`ownedBook--${filteredSearchedBook.id}`}>
                                                <header className="ownedBookHeader">
                                                    Book Series: {bookSeriesName.bookSeries}
                                                    
                                                </header>
                                                <section className="cardDetails">
                                                    <div className="cardDiv">Book Title: {filteredSearchedBook.book.bookName}</div>
                                                    <div className="cardDiv">Actual Author: {filteredSearchedBook.book.bookAuthor}</div>
                                                    <div className="cardDiv">Your Toughts: {filteredSearchedBook.bookThoughts}</div>
                                                    <div className="cardDiv">Year of Publication: {filteredSearchedBook.book.publicationDate}</div>
                                                    <div className="cardDiv">Dustjacket: {filteredSearchedBook.dustJacket?"Yes":"No"}</div>
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