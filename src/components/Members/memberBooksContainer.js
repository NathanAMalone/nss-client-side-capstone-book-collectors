import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { SeriesDropDown } from "../AllBooks/SeriesDropDown"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { MemberBooks } from "./memberBooks"


export const MemberBooksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const {userId} = useParams()
    const [user, updateUser] = useState({})
    const [ownedBooks, setOwnedBooks] = useState([])
    const [bookSeriesId, setBookSeriesId] = useState(0)

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

    return <div className="memberBooksContainer">
        <h2 className="memberBooksContainerHeader">{user.fullName}'s Books</h2>
        <div className="allMemberBooks">
            <SeriesDropDown setBookSeriesId={setBookSeriesId}/>
            <BookSearch setterFunction={setSearchTerms}/>
		    <MemberBooks searchTermState={searchTerms}
                bookSeriesId={bookSeriesId}/> 
        </div>
    </div>
}