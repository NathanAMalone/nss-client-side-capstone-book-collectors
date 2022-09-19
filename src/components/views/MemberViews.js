import { Outlet, Route, Routes } from "react-router-dom"
import { AddBook } from "../AddBook/AddBook"
import { BazaarContainer } from "../BayportBazaar/BazaarContainer"
import { LoanBooks } from "../BayportBazaar/LoanBooks"
import { BookStatus } from "../BookStatus/BookStatus"
import { EditBooks } from "../EditBooks/EditBooks"
import { MemberBooks } from "../Members/memberBooks"
import { Members } from "../Members/Members"
import { MyBooks } from "../MyBooks/MyBooks"



export const MemberViews = () => {
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
				<Route path="bayportBazaar" element={ <BazaarContainer />  } />
				<Route path="loanBooks" element={ <LoanBooks />  } />
				<Route path="bookStatus" element={ <BookStatus />  } />



				


			</Route>
		</Routes>
	)
}