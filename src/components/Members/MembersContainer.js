import { useState } from "react"
import { Members } from "./Members"
import { MemberSearch } from "./MemberSearch"
import "./Members.css"




export const MembersContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    
    return <div className="allMembers">
        <h2 className="memberContainerHeader">Member Area</h2>
        <div className="searchMembers">
            <MemberSearch setterFunction={setSearchTerms}/>
            <Members searchTermState={searchTerms}/> 
        </div>
    </div>
}