import { useState } from "react"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { MyBooks } from "./MyBooks"



export const MyBooksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    return <>
      <h2>{bookUserObject.fullName}'s Books</h2>
        <BookSearch setterFunction={setSearchTerms}/>
		<MyBooks searchTermState={searchTerms}/> 
    </>
}