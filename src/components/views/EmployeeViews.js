import { Outlet, Route, Routes } from "react-router-dom"
import { AddBook } from "../AddBook/AddBook"
import { EditBooks } from "../EditBooks/EditBooks"
import { Members } from "../Members/Members"
import { MyBooks } from "../MyBooks/MyBooks"
import { NewMember } from "../NewMember/NewMember"



export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1 className="title--main">Book Collectors Coterie</h1>
					<div>A Juvenille Series Catalog</div>

					<Outlet />
				</>
			}>
				<Route path="myBooks" element={ <MyBooks />  } />
				<Route path="/updateBook/:ownedBookId" element={ <EditBooks />  } />
				<Route path="/addBook" element={ <AddBook />  } />
				<Route path="/members" element={ <Members />  } />
                <Route path="/newMember" element={ <NewMember />  } />
				


			</Route>
		</Routes>
	)
}