import { useState } from "react"
import { Link } from "react-router-dom"
import { SeriesDropDown } from "../AllBooks/SeriesDropDown"
import { BookSearch } from "./BookSearch"
import { LoanBooks } from "./LoanBooks"
import "./BayportBazaar.css"


export const LoanBooksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [bookSeriesId, setBookSeriesId] = useState(0)
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    return <div className="loanContainer">
      <h2 className="loanContainerHeader">{bookUserObject.fullName}'s Library</h2>
      <h3><Link className="loanHeaderLink" to={`/bookStatus`}>See the Status of your books!</Link></h3>
      <div className="allLoanContainer">
        <SeriesDropDown setBookSeriesId={setBookSeriesId}/>
        <BookSearch setterFunction={setSearchTerms}/>
        <LoanBooks searchTermState={searchTerms}
            bookSeriesId={bookSeriesId}/> 
      </div>
    </div>
}