import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



export const EditBooks = () => {
//useParams to get ownedBook.id
// useState and useEffect to get book profile and update profile
    // fetch ownedBooks?_expand=book
    // bookseries: 0, booktitle: "", author:"", thoughts: "", publication: 0, dustjacket: false

    const {ownedBookId} = useParams()
    const [ownedBookData, updateOwnedBookData] = useState({
        bookThoughts: "",
        dustJacket: false,
        book: { bookSeriesNameId: 0,
                bookName: "",
                bookAuthor: "",
                publicationDate: 0
              }
    })
    const [bookSeriesNames, getBookSeriesNames] = useState([])
    const [bookSeriesId, setBookSeriesId] = useState(0)
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/ownedBooks/${ownedBookId}?_expand=book`)
                .then(response => response.json())
                .then((data) => {
                    // const singleOwnedBook = data[0]
                    updateOwnedBookData(data)
                })
        },
        [ownedBookId]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/bookSeriesNames`)
                .then(response => response.json())
                .then((bookSeriesArray) =>{
                    getBookSeriesNames(bookSeriesArray)
                })
        },
        []
    )

    // document.addEventListener(
    //     "click",
    //     (clickEvent) => {
    //         const itemClicked = clickEvent.target
    //         if (itemClicked.id.startsWith("saveButton")) {
    
    //             {
    //                 if (bookSeriesId === 0) {
    //                     window.alert(`Make sure to pick a Book Series from the dropdown menu! `)
    //                 } 
    //             }
    //         }
    //     }
    // )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        {
            if (bookSeriesId !== 0 && 
                ownedBookData.book.bookName !== "" &&
                ownedBookData.book.bookAuthor !== "" &&
                ownedBookData.book.publicationDate !== NaN &&
                ownedBookData.book.publicationDate !== null &&
                ownedBookData.book.publicationDate !== 0) { 
                const ownedBooksToSendToAPI = {
                    bookThoughts: ownedBookData.bookThoughts,
                    dustJacket: ownedBookData.dustJacket,
                    bookId: ownedBookData.bookId,
                    userId: ownedBookData.userId,
                    ableToLoan: false,
                    isClaimed: false,
                    bookImage: ""
                }
                
                const booksToSendToAPI = {
                    bookSeriesNameId: bookSeriesId,
                    bookName: ownedBookData.book.bookName,
                    bookAuthor: ownedBookData.book.bookAuthor,
                    publicationDate: ownedBookData.book.publicationDate
                }

                fetch(`http://localhost:8088/books/${ownedBookData.book.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(booksToSendToAPI)
                })
                .then(response => response.json())
                return fetch(`http://localhost:8088/ownedBooks/${ownedBookData.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(ownedBooksToSendToAPI)
                })
                .then(response => response.json())
                .then(() => {
                    navigate("/myBooks")
                })
            } else {
                window.alert(`Make sure to pick a Book Series from the dropdown menu! `)
            }
        }
    }

    
// build form to update BookSeries, title, author, user's thoughts, year of publication, dustjacket
//on save button click, PUT into owned books, then PUT into books

    return<>

        <form className="editBooksForm">
            <h2 className="editFormTitle">Update Book Inormation</h2>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="editFormSeries">Book Series:</label>
                    <select className="editDropDown"
                        onChange={(evt) => {
                            setBookSeriesId(parseInt(evt.target.value))
                        }}
                    >
                        <option value={ownedBookData.book.bookSeriesNameId}>Select Series...</option>
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
                    <label htmlFor="editFormTitle">Book Title:</label>
                    <input required autoFocus
                        type="text"
                        className="editTitle"
                        value={ownedBookData.book.bookName}
                        onChange={
                            (evt) => {
                                const copy = {...ownedBookData}
                                copy.book.bookName = evt.target.value
                                updateOwnedBookData(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="editFormAuthor">Actual Author:</label>
                    <input
                        type="text"
                        className="editAuthor"
                        value={ownedBookData.book.bookAuthor}
                        onChange={
                            (evt) => {
                                const copy = {...ownedBookData}
                                copy.book.bookAuthor = evt.target.value
                                updateOwnedBookData(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="editFormThoughts">Your Thoughts:</label>
                    <input
                        type="text"
                        className="editThoughts"
                        value={ownedBookData.bookThoughts}
                        onChange={
                            (evt) => {
                                const copy = {...ownedBookData}
                                copy.bookThoughts = evt.target.value
                                updateOwnedBookData(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="editFormPublication">Year of Publication:</label>
                    <input
                        type="number"
                        className="editPublication"
                        min="1000"
                        max="9999"
                        value={ownedBookData.book.publicationDate}
                        onChange={
                            (evt) => {
                                const copy = {...ownedBookData}
                                copy.book.publicationDate = parseInt(evt.target.value)
                                updateOwnedBookData(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="editFormDustJacket">Dust Jacket:</label>
                    <input
                        type="checkbox"
                        className="editDustJacket"
                        value={ownedBookData.dustJacket}
                        checked={ownedBookData.dustJacket}
                        onChange={
                            (evt) => {
                                const copy = {...ownedBookData}
                                copy.dustJacket = evt.target.checked
                                updateOwnedBookData(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button id="saveButton"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Changes
            </button>
        </form>
    </>
}