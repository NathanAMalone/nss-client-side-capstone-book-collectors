import { useState } from "react"
import { SeriesDropDown } from "../AllBooks/SeriesDropDown"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { MyBooks } from "./MyBooks"
import "./MyBooks.css"



export const MyBooksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [bookSeriesId, setBookSeriesId] = useState(0)
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    return <div className="allMyBooks">
      <h2 className="myBooksHeader">{bookUserObject.fullName}'s Books</h2>
      <div className="searchBars">
        <SeriesDropDown setBookSeriesId={setBookSeriesId}/>
        <BookSearch setterFunction={setSearchTerms}/>
		    <MyBooks searchTermState={searchTerms}
          bookSeriesId={bookSeriesId}/> 
      </div>
    </div>
}