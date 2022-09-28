import { useState } from "react"
import { Link } from "react-router-dom"
import { SeriesDropDown } from "../AllBooks/SeriesDropDown"
import { BayportBazaar } from "./BayportBazaar"
import { BookSearch } from "./BookSearch"
import "./BayportBazaar.css"


export const BazaarContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [bookSeriesId, setBookSeriesId] = useState(0)

    return <div className="bazaarContainer">
        <h2 className="bazaarContainerHeader">Welcome to the Bayport Bazaar!</h2>
        <h3>
            <Link className="headerLink" to={`/loanBooksContainer`}>Manage your loaned books here!</Link>
        </h3>
        <div className="allBazaar">
          <SeriesDropDown setBookSeriesId={setBookSeriesId}/>
          <BookSearch setterFunction={setSearchTerms}/>
          <BayportBazaar searchTermState={searchTerms}
              bookSeriesId={bookSeriesId}/> 
        </div>
      </div>
}