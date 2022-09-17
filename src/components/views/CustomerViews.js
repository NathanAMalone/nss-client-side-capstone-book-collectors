import { Outlet, Route, Routes } from "react-router-dom"
import { AddBook } from "../AddBook/AddBook"
import { BayportBazaar } from "../BayportBazaar/BayportBazaar"
import { LoanBooks } from "../BayportBazaar/LoanBooks"
import { EditBooks } from "../EditBooks/EditBooks"
import { MemberBooks } from "../Members/memberBooks"
import { Members } from "../Members/Members"
import { MyBooks } from "../MyBooks/MyBooks"



export const CustomerViews = () => {
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
				<Route path="updateBook/:ownedBookId" element={ <EditBooks />  } />
				<Route path="addBook" element={ <AddBook />  } />
				<Route path="members" element={ <Members />  } />
				<Route path="memberBooks/:userId" element={ <MemberBooks />  } />
				<Route path="bayportBazaar" element={ <BayportBazaar />  } />
				<Route path="loanBooks" element={ <LoanBooks />  } />


				


			</Route>
		</Routes>
	)
}