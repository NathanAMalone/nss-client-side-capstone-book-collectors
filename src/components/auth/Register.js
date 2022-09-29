import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {

    const newDate = new Date()
    const month = newDate.getUTCMonth() + 1
    const date = newDate.getUTCDate()
    const year = newDate.getUTCFullYear()
    const today = year + "-" + month + "-" + date

    const [customer, setCustomer] = useState({
        fullName: "",
        email: "",
        membershipDate: today,
        userAddress: "",
        isAdmin: false
    })
    let navigate = useNavigate()


    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("book_user", JSON.stringify({
                        fullName: createdUser.fullName,
                        email: createdUser.email,
                        membershipDate: createdUser.membershipDate,
                        userAddress: createdUser.userAddress,
                        isAdmin: createdUser.isAdmin
                    }))

                    navigate("/home")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Honey Rae Repairs</h1>
                <div className="registerCard">
                    <fieldset>
                        <label htmlFor="fullName" className="fullNameLabel"> Full Name </label>
                        <input onChange={updateCustomer}
                            type="text" id="fullName" className="form-control"
                            placeholder="Enter your name" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email" className="emailLabel"> Email address </label>
                        <input onChange={updateCustomer}
                            type="email" id="email" className="form-control"
                            placeholder="Email address" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="address" className="addressLabel"> Address </label>
                        <input onChange={updateCustomer}
                            type="text" id="userAddress" className="form-control"
                            placeholder="Address" required />
                    </fieldset>
                    <fieldset>
                        <button className="loginButton" type="submit"> Register </button>
                    </fieldset>
                </div>
            </form>
                <section className="link--register">
                    <Link to="/login">Back to login.</Link>
                </section>
        </main>
    )
}


