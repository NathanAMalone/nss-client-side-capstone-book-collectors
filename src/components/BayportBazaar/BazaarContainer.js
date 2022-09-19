import { useState } from "react"
import { BayportBazaar } from "./BayportBazaar"
import { BookSearch } from "./BookSearch"


export const BazaarContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <BookSearch setterFunction={setSearchTerms}/>
		<BayportBazaar searchTermState={searchTerms}/> 
    </>
}