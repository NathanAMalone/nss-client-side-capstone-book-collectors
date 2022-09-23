import { useState } from "react"
import { SeriesDropDown } from "../AllBooks/SeriesDropDown"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { MyBooks } from "./MyBooks"



export const MyBooksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [bookSeriesId, setBookSeriesId] = useState(0)
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    return <>
      <h2>{bookUserObject.fullName}'s Books</h2>
      <SeriesDropDown setBookSeriesId={setBookSeriesId}/>
      <BookSearch setterFunction={setSearchTerms}/>
		  <MyBooks searchTermState={searchTerms}
          bookSeriesId={bookSeriesId}/> 
    </>
}