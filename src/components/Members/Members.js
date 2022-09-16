import { useEffect, useState } from "react"
import "./Members.css"
import { Link } from "react-router-dom"


export const Members = () => {
    //Display a list of users with their membership date and # of books owned.
    // fetch users with owned books embeded
    const [users, setUsers] = useState([])

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

    return <>
    <h2>Member Area</h2>
        <article className="members">
            {
                users.map((user) => {
                    return <>
                        <section className="memberCard" key={`member--${user.id}`}>
                            <header className="memberHeader">
                                <Link to={`/memberBooks/${user.id}`}>{user?.fullName}</Link>
                            </header>
                            <section className="memberCardSection">
                                <div>Membership Date: {user?.membershipDate}</div>
                                <div>Number of books owned: {user?.ownedBooks?.length}</div>
                            </section>
                            {bookUserObject.isAdmin
                            ?<button 
                                onClick={(
                                    
                                    ) => fetch(
                                        `http://localhost:8088/users/${user.id}`, {
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