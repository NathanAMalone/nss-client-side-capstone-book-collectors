import { MemberViews } from "./MemberViews"
import { AdminViews } from "./AdminViews"

export const ApplicationViews = () => {
	
	const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)	
	
	if (bookUserObject.isAdmin) {
		// Return employee views
		return <AdminViews />
	}
	else {
		//Return customer views
		return <MemberViews />
	}
}