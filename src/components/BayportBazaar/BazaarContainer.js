import { useState } from "react"
import { Link } from "react-router-dom"
import { BayportBazaar } from "./BayportBazaar"
import { BookSearch } from "./BookSearch"


export const BazaarContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
      <h2>Welcome to the Bayport Bazaar!</h2>
        <h3>
            <Link to={`/loanBooksContainer`}>Manage your loaned books here!</Link>
        </h3>
        <BookSearch setterFunction={setSearchTerms}/>
		<BayportBazaar searchTermState={searchTerms}/> 
    </>
}