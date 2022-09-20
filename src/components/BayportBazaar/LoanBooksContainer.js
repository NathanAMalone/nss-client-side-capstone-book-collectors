import { useState } from "react"
import { Link } from "react-router-dom"
import { BookSearch } from "./BookSearch"
import { LoanBooks } from "./LoanBooks"


export const LoanBooksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    return <>

      <h2>{bookUserObject.fullName}'s Books</h2>
        <h3><Link to={`/bookStatus`}>See the Status of your books!</Link></h3>
          <BookSearch setterFunction={setSearchTerms}/>
		      <LoanBooks searchTermState={searchTerms}/> 
    </>
}