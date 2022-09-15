import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)	
	
	if (bookUserObject.isAdmin) {
		// Return employee views
		return <EmployeeNav />
	}
	else {
		//Return customer views
		return <CustomerNav />
	}
}

