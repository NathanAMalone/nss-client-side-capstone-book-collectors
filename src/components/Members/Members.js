import { useEffect, useState } from "react"
import "./Members.css"

export const Members = () => {
    //Display a list of users with their membership date and # of books owned.
    // fetch users with owned books embeded
    const [users, setUsers] = useState([])

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

    return <>
    <h2>Member Area</h2>
        <article className="members">
            {
                users.map((user) => {
                    return <section className="memberCard" key={`member--${user.id}`}>
                        <header className="memberHeader">
                            Member Name: {user?.fullName}
                        </header>
                        <section className="memberCardSection">
                            Membership Date: {user?.membershipDate}
                            Number of books owned: {user?.ownedBooks?.length}
                        </section>
                    </section>
                })
            }
        </article>
    </>
}