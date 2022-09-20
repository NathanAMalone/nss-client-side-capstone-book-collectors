import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { MemberBooks } from "./memberBooks"


export const MemberBooksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const {userId} = useParams()
    const [user, updateUser] = useState({})
    const [ownedBooks, setOwnedBooks] = useState([])

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

    return <>
        <h2>{user.fullName}'s Books</h2>
            <BookSearch setterFunction={setSearchTerms}/>
		    <MemberBooks searchTermState={searchTerms}/> 
    </>
}