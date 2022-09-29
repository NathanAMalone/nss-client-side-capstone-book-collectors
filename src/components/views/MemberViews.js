import { Outlet, Route, Routes } from "react-router-dom"
import { AddBook } from "../AddBook/AddBook"
import { AllBooksContainer } from "../AllBooks/AllBooksContainer"
import { BazaarContainer } from "../BayportBazaar/BazaarContainer"
import { LoanBooksContainer } from "../BayportBazaar/LoanBooksContainer"
import { BookStatusContainer } from "../BookStatus/BookStatusContainer"
import { EditBooks } from "../EditBooks/EditBooks"
import { MemberBooksContainer } from "../Members/memberBooksContainer"
import { MembersContainer } from "../Members/MembersContainer"
import { MyBooksContainer } from "../MyBooks/MyBooksContainer"
import { AddPicture } from "../MyBooks/AddPicture"
import { Home } from "../Home/Home"



export const MemberViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					{/* <h1 className="title--main">Book Collectors Coterie</h1>
					<div>A Juvenille Series Catalog</div> */}

					<Outlet />
				</>
			}>
				<Route path="myBooks" element={ <MyBooksContainer />  } />
				<Route path="AllBooks" element={ <AllBooksContainer />  } />
				<Route path="updateBook/:ownedBookId" element={ <EditBooks />  } />
				<Route path="addBook" element={ <AddBook />  } />
				<Route path="members" element={ <MembersContainer />  } />
				<Route path="memberBooks/:userId" element={ <MemberBooksContainer />  } />
				<Route path="bazaarContainer" element={ <BazaarContainer />  } />
				<Route path="loanBooksContainer" element={ <LoanBooksContainer />  } />
				<Route path="bookStatus" element={ <BookStatusContainer />  } />
				<Route path="pictureBooks/:ownedBookId" element={ <AddPicture />  } />
				<Route path="/home" element={ <Home />} />



				


			</Route>
		</Routes>
	)
}