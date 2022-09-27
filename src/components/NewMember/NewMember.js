import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./NewMember.css"

export const NewMember = () => {
    // create an initial state objects with correct default properties
    const [newMember, updateNewMember] = useState({
        fullName: "",
        email: "",
        membershipDate: "",
        userAddress: "",
        isAdmin: false,
    })
    const newDate = new Date()
    const month = newDate.getUTCMonth() +1
    const date = newDate.getUTCDate()
    const year = newDate.getUTCFullYear()
    const today = year + "-" + month + "-" + date
    // get array of all books; get all series names and set id in variable

    const navigate = useNavigate()
    const getNewMember = () => {
        fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((newMemberArray) => {
                updateNewMember(newMemberArray)
            })
            .then(navigate(`/members`))
    }


    // create booksToAPI and ownedBooksToAPI
    // if booksToAPI: bookSeriesNameId, bookName, bookAuthor, publicationDate === maps.books(book.etc), 
    // then do nothing, else post to books
    // ownedBooksToAPI post to ownedBooks
    // if booksToAPI: bookSeriesNameId, bookName, bookAuthor, publicationDate === maps.books(book.etc), 
    // then ownedBook.bookId: book.id else ownedBook.bookId = parsedResponse.id
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newMemberToSendToAPI = {
            fullName: newMember.fullName,
            email: newMember.email,
            membershipDate: today,
            userAddress: newMember.userAddress,
            isAdmin: newMember.isAdmin,
        }

            fetch(`http://localhost:8088/users`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newMemberToSendToAPI)
            })
                .then(response => response.json())
                .then(() => {
                    getNewMember()
                })
    }

    // create form for new book added
    return <>
        <form className="newMemberForm">
        <Link to={`/members`}>Need to edit information? Go here.</Link>
            <h2 className="newMemberFormTitle">Add new member!</h2>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="addFullName">Name:</label>
                    <input required autoFocus
                        type="text"
                        className="addNewMember"
                        placeholder="New Member"
                        value={newMember.fullName}
                        onChange={(evt) => {
                            const copy = { ...newMember }
                            copy.fullName = evt.target.value
                            updateNewMember(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addEmail">Email:</label>
                    <input
                        type="text"
                        className="addEmail"
                        placeholder="Email"
                        value={newMember.email}
                        onChange={(evt) => {
                            const copy = { ...newMember }
                            copy.email = evt.target.value
                            updateNewMember(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addAddress">Address:</label>
                    <input
                        type="text"
                        className="addAddress"
                        placeholder="Address"
                        value={newMember.userAddress}
                        onChange={(evt) => {
                            const copy = { ...newMember }
                            copy.userAddress = evt.target.value
                            updateNewMember(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="addAdmin">Make user an Admin? </label>
                    <input
                        type="checkbox"
                        className="addAdmin"
                        value={newMember.isAdmin}
                        onChange={(evt) => {
                            const copy = { ...newMember }
                            copy.isAdmin = evt.target.checked
                            updateNewMember(copy)
                        }}
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add New Member
            </button>
        </form>
    </>

}
