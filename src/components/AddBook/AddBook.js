import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AddBook.css"

export const AddBook = () => {
    
    // create an initial state objects with correct default properties
    const [book, updateBook] = useState({
        bookSeriesNameId: 0,
        bookName: "",
        bookAuthor: "",
        publicationDate: 0,
    })
    const [ownedBook, updateOwnedBook] = useState({
        userId: 0,
        bookId: 0,
        bookThoughts: "",
        dustJacket: false,
        ableToLoan: false,
        ableToLoanDate: "",
        isClaimed: false,
        isClaimedDate: "",
        bookImage: "",
        borrowerName: "",
        approved: false,
        approvedDate: "",
        returnedDate: "",
        prevBorrowerName: ""
    })
    
    // get array of all books; get all series names and set id in variable
    const [arrayBooks, setArrayBooks] = useState([])
    const [bookSeriesNames, setBookSeriesNames] = useState([])
    const [bookSeriesId, setBookSeriesId] = useState(0)
    const navigate = useNavigate()
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    const newDate = new Date()
    const month = newDate.getUTCMonth() +1
    const date = newDate.getUTCDate()
    const year = newDate.getUTCFullYear()
    const today = month + "-" + date + "-" + year

    useEffect (() => {
        fetch(`http://localhost:8088/books`)
        .then(response => response.json())
        .then((booksArray) => {
            setArrayBooks(booksArray)
        })
    },[]
    )
    
    
    useEffect (() => {
        fetch(`http://localhost:8088/bookSeriesnames`)
        .then(response => response.json())
        .then((bookSeriesArray) => {
            setBookSeriesNames(bookSeriesArray)
        })
    },[]
    )
    
    // create booksToAPI and ownedBooksToAPI
        // if booksToAPI: bookSeriesNameId, bookName, bookAuthor, publicationDate === maps.books(book.etc), 
        // then do nothing, else post to books
    // ownedBooksToAPI post to ownedBooks
        // if booksToAPI: bookSeriesNameId, bookName, bookAuthor, publicationDate === maps.books(book.etc), 
        // then ownedBook.bookId: book.id else ownedBook.bookId = parsedResponse.id
        const handleSaveButtonClick = (event) => {
            event.preventDefault()
    
        {
            if (bookSeriesId !== 0 && 
                book.bookName !== "" &&
                book.bookAuthor !== "" &&
                ownedBook.bookThoughts !== "" &&
                book.publicationDate &&
                !isNaN(book.publicationDate) &&
                book.publicationDate !== 0) {  

            const ownedBookToSendToAPI = {
                bookThoughts: ownedBook.bookThoughts,
                dustJacket: ownedBook.dustJacket,
                userId: bookUserObject.id,
                ableToLoan: false,
                ableToLoanDate: today,
                isClaimed: false,
                isClaimedDate: ownedBook.isClaimedDate,
                bookImage: ownedBook.bookImage,
                borrowerName: ownedBook.borrowerName,
                approved: ownedBook.approved,
                approvedDate: ownedBook.approvedDate,
                returnedDate: ownedBook.returnedDate,
                prevBorrowerName: ownedBook.prevBorrowerName
            }
        
            const bookToSendToAPI = {
                bookSeriesNameId: bookSeriesId,
                bookName: book.bookName,
                bookAuthor: book.bookAuthor,
                publicationDate: book.publicationDate
            }
        const foundBook = arrayBooks.find((arrayBook) => {
            if(arrayBook.bookSeriesNameId === bookSeriesId &&
               arrayBook.bookName === book.bookName &&
               arrayBook.bookAuthor === book.bookAuthor &&
               arrayBook.publicationDate === book.publicationDate) {
                    return true
               }
        })
            if (foundBook) {
                ownedBookToSendToAPI.bookId = foundBook.id
                    return fetch(`http://localhost:8088/ownedBooks/`, {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(ownedBookToSendToAPI)
                        })
                            .then(response => response.json())
                            .then(() => {
                                navigate("/myBooks")
                            }) 
               } else {
                     fetch(`http://localhost:8088/books/`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(bookToSendToAPI)
                    })
                        .then(response => response.json())
                        .then(parsedResponse => {
                            ownedBookToSendToAPI.bookId = parsedResponse.id
                            return fetch(`http://localhost:8088/ownedBooks/`, {
                                method: "POST",
                                headers: {
                                    "Content-type": "application/json"
                                },
                                body: JSON.stringify(ownedBookToSendToAPI)
                            })
                            .then(response => response.json())
                            .then(() => {
                                navigate("/myBooks")
                            })
                        })

               }
            } else {
                window.alert(`Make sure to fill out all fields!`)
            }
        }
            
        
        }

    // create form for new book added
    return <>
        <form className="newBookForm">
            <h2 className="newBookFormTitle">Add your new book!</h2>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addBookSeries">Book Series:</label>
                    <select className="editDropDown"
                        onChange={(evt) => {
                            setBookSeriesId(parseInt(evt.target.value))
                        }}
                    >
                        <option value={0}>Select Series...</option>
                        {
                            bookSeriesNames.map((bookSeriesName) => {
                                return <option value={`${bookSeriesName.id}`} key={`bookSeriesName--${bookSeriesName.id}`}>
                                    {bookSeriesName.bookSeries}
                                </option>
                            })

                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addBookTitle">Book Title: </label>
                    <input required autoFocus
                        type="text"
                        className="addTitle"
                        placeholder="Title"
                        value={book.bookName}
                        onChange={(evt) => {
                            const copy = {...book}
                            copy.bookName = evt.target.value
                            updateBook(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addAuthor">Actual Author: </label>
                    <input
                        type="text"
                        className="addAuthor"
                        placeholder="Author"
                        value={book.bookAuthor}
                        onChange={(evt) => {
                            const copy = {...book}
                            copy.bookAuthor = evt.target.value
                            updateBook(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addBookThoughts">Your Thoughts: </label>
                    <input
                        type="text"
                        className="addThoughts"
                        placeholder="Thoughts..."
                        value={ownedBook.bookThoughts}
                        onChange={(evt) => {
                            const copy = {...ownedBook}
                            copy.bookThoughts = evt.target.value
                            updateOwnedBook(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addBookPublication">Year of Publication: </label>
                    <input
                        type="number"
                        className="addPublication"
                        value={book.publicationDate}
                        onChange={(evt) => {
                            const copy = {...book}
                            copy.publicationDate = parseInt(evt.target.value)
                            updateBook(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addBookDustJacket">Dust Jacket</label>
                    <input
                        type="checkbox"
                        className="addDustJacket"
                        value={ownedBook.dustJacket}
                        onChange={(evt) => {
                            const copy = {...ownedBook}
                            copy.dustJacket = evt.target.checked
                            updateOwnedBook(copy)
                        }}
                    />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Book
            </button>
        </form>
    </>

}