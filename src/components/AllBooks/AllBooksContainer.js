import { useState } from "react"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { AllBooks } from "./AllBooks"
import { SeriesDropDown } from "./SeriesDropDown"
import "./AllBooks.css"


export const AllBooksContainer = () => {
  const [searchTerms, setSearchTerms] = useState("")
  const [bookSeriesId, setBookSeriesId] = useState(0)
  
  return <div className="allBooks">
    <h2 className="allBooksHeader">Everybody's Books!</h2>
    <div className="searchBars">
      <SeriesDropDown setBookSeriesId={setBookSeriesId}/>
      <BookSearch setterFunction={setSearchTerms} />
      <AllBooks searchTermState={searchTerms}
        bookSeriesId={bookSeriesId}/>
    </div>
  </div>
}