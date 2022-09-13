import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myBooks">My Books</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
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
