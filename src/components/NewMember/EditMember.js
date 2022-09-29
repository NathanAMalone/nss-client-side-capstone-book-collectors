import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./NewMember.css"

export const EditMember = () => {
    // create an initial state objects with correct default properties
    const {userId} = useParams()
    const [user, updateUser] = useState({
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
            .then(navigate(`/members`))
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${userId}`)
                .then(response => response.json())
                .then((data) => {
                    updateUser(data)
                })
        },
        [userId]
    )

    // create booksToAPI and ownedBooksToAPI
    // if booksToAPI: bookSeriesNameId, bookName, bookAuthor, publicationDate === maps.books(book.etc), 
    // then do nothing, else post to books
    // ownedBooksToAPI post to ownedBooks
    // if booksToAPI: bookSeriesNameId, bookName, bookAuthor, publicationDate === maps.books(book.etc), 
    // then ownedBook.bookId: book.id else ownedBook.bookId = parsedResponse.id
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const userToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            membershipDate: user.membershipDate,
            userAddress: user.userAddress,
            isAdmin: user.isAdmin,
        }

            fetch(`http://localhost:8088/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userToSendToAPI)
            })
                .then(response => response.json())
                .then(() => {
                    getNewMember()
                })
    }

    // create form for new book added
    return <>
        <form className="editForm">
        <Link className="addMemberLink" to={`/newMember`}>Need to add a member? Go here.</Link>

            <h2 className="editMemberTitle">Edit Current Member!</h2>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="editFullName" className="editNameLabel">Name:</label>
                    <input required autoFocus
                        type="text"
                        className="editFullName"
                        placeholder="Current Member"
                        value={user.fullName}
                        onChange={(evt) => {
                            const copy = { ...user }
                            copy.fullName = evt.target.value
                            updateUser(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="editEmail" className="editEmailLabel">Email:</label>
                    <input
                        type="text"
                        className="editEmail"
                        placeholder="Email"
                        value={user.email}
                        onChange={(evt) => {
                            const copy = { ...user }
                            copy.email = evt.target.value
                            updateUser(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="editAddress" className="editAddressLabel">Address:</label>
                    <input
                        type="text"
                        className="editAddress"
                        placeholder="Address"
                        value={user.userAddress}
                        onChange={(evt) => {
                            const copy = { ...user }
                            copy.userAddress = evt.target.value
                            updateUser(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="editAdmin" className="editAdminLabel">Make user an Admin?</label>
                    <input
                        type="checkbox"
                        className="editAdmin"
                        value={user.isAdmin}
                        checked={user.isAdmin}
                        onChange={(evt) => {
                            const copy = { ...user }
                            copy.isAdmin = evt.target.checked
                            updateUser(copy)
                        }}
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Update Member
            </button>
            <Link className="listMemberLink" to={`/members`}>Go back to Member List.</Link>
        </form>
    </>

}
