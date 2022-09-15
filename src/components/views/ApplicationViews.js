import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	
	const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)	
	
	if (bookUserObject.isAdmin) {
		// Return employee views
		return <EmployeeViews />
	}
	else {
		//Return customer views
		return <CustomerViews />
	}
}