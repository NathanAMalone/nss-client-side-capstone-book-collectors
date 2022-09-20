import { useState } from "react"
import { BookSearch } from "../BayportBazaar/BookSearch"
import { Members } from "./Members"




export const MembersContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    
    return <>
       <h2>Member Area</h2>
        <BookSearch setterFunction={setSearchTerms}/>
		<Members searchTermState={searchTerms}/> 
    </>
}