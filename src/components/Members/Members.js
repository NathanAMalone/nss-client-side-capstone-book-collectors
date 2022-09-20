import { useEffect, useState } from "react"
import "./Members.css"
import { Link } from "react-router-dom"


export const Members = ({ searchTermState}) => {
    //Display a list of users with their membership date and # of books owned.
    // fetch users with owned books embeded
    const [users, setUsers] = useState([])
    // filter search
    const [filteredUsers, setFiltered] = useState([])

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?_embed=ownedBooks`)
            .then(response => response.json())
            .then((usersArray) => {
                setUsers(usersArray)
            })
        },
        []
        )
    const getUsersRefresh = () => {
        fetch(`http://localhost:8088/users?_embed=ownedBooks`)
            .then(response => response.json())
            .then((usersArray) => {
                setUsers(usersArray)
            })
    }

    //search from BookSearch.js
    useEffect(
        () => {
            const searchedUsers = users.filter(user => {
                return user.fullName.toLowerCase().match(searchTermState.toLowerCase()) || 
                user.membershipDate.toLowerCase().match(searchTermState.toLowerCase()) || 
                user.ownedBooks.length.toString().match(searchTermState.toLowerCase())
            }) 
            setFiltered(searchedUsers)
        },
        [ searchTermState, users ]
    )
            
    return <>
        <article className="members">
            {
                filteredUsers.map((filteredUser) => {
                    return <>
                        <section className="memberCard" key={`member--${filteredUser.id}`}>
                            <header className="memberHeader">
                                <Link to={`/memberBooks/${filteredUser.id}`}>{filteredUser?.fullName}</Link>
                            </header>
                            <section className="memberCardSection">
                                <div>Membership Date: {filteredUser?.membershipDate}</div>
                                <div>Number of books owned: {filteredUser?.ownedBooks?.length}</div>
                            </section>
                            {bookUserObject.isAdmin
                            ?<button 
                                onClick={(
                                    
                                    ) => fetch(
                                        `http://localhost:8088/users/${filteredUser.id}`, {
                                            method: "DELETE",
                                        })
                                        .then(() => {
                                            getUsersRefresh()
                                        })
                                    }
                                    className="btn btn-primary">
                                Delete Member
                            </button>
                            :""}
                        </section>
                    </>
                })
            }
        </article>
    </>
}