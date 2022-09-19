import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const MemberNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myBooks">My Books</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/addBook">Add Book</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/members">Members</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/bayportBazaar">Bayport Bazaar</Link>
            </li>
            {
                localStorage.getItem("book_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("book_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
