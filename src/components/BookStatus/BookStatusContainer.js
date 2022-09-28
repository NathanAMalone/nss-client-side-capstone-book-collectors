import { useState } from "react"
import { Link } from "react-router-dom"
import { MemberSearch } from "../Members/MemberSearch"
import { BookStatus } from "./BookStatus"


export const BookStatusContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    return <div className="statusContainer">
        <h2 className="statusContainerHeader">Status Updates for {bookUserObject.fullName}</h2>
        <h3><Link className="statusHeaderLink" to={`/loanBooksContainer`}>Manage your loaned books here!</Link></h3>
        <div className="allStatus">
            <MemberSearch setterFunction={setSearchTerms}/>
            <BookStatus searchTermState={searchTerms}/> 
        </div>
    </div>
}