import { useState } from "react"
import { Link } from "react-router-dom"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { BookStatus } from "./BookStatus"


export const BookStatusContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    return <>
       <h2>Status Updates for {bookUserObject.fullName}</h2>
            <h3><Link to={`/loanBooksContainer`}>Manage your loaned books here!</Link></h3>
        <BookSearch setterFunction={setSearchTerms}/>
		<BookStatus searchTermState={searchTerms}/> 
    </>
}