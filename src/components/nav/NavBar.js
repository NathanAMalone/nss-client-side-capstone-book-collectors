import { MemberNav } from "./AdminNav"
import { AdminNav } from "./MemberNav"
import "./NavBar.css"

export const NavBar = () => {
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)	
	
	if (bookUserObject.isAdmin) {
		// Return employee views
		return <AdminNav />
	}
	else {
		//Return customer views
		return <MemberNav />
	}
}

