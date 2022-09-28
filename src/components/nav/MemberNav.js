import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const MemberNav = () => {
    const navigate = useNavigate()

    return (
        <Navbar expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/home">The Coterie</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Books" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/myBooks">My Books</NavDropdown.Item>
                  <NavDropdown.Item href="/allBooks">
                    All Books
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/addBook">Add Book</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/members">Members</Nav.Link>
                <Nav.Link href="/bazaarContainer">Bayport Bazaar</Nav.Link>
                <Nav.Link href="/bookStatus">Book Status</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
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
        </Navbar>
      );

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myBooks">My Books</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/AllBooks">All Books</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/addBook">Add Book</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/members">Members</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/bazaarContainer">Bayport Bazaar</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/bookStatus">Book Status</Link>
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
