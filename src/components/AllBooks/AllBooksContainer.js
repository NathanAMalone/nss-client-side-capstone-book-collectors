import { useState } from "react"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { AllBooks } from "./AllBooks"
import { SeriesDropDown } from "./SeriesDropDown"




export const AllBooksContainer = () => {
  const [searchTerms, setSearchTerms] = useState("")
  const [bookSeriesId, setBookSeriesId] = useState(0)
  
  return <>
    <h2>Everybody's Books!</h2>
    <SeriesDropDown setBookSeriesId={setBookSeriesId}/>
    <BookSearch setterFunction={setSearchTerms} />
    <AllBooks searchTermState={searchTerms}
      bookSeriesId={bookSeriesId}/>
  </>
}