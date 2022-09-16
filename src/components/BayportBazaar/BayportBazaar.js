import { useEffect, useState } from "react"

export const BayportBazaar = () => {
    // map books if ableToLoan=true then display book
    // link at top of page to take you to an addbooks page(similar to MyBooks, just different buttons)
    
    //fetch ownedbooks with expand book
    const [ownedBooks, setOwnedBooks] = useState()

    useEffect(() => {
        fetch(`http://localhost:8088/ownedBooks?_expand=book`)
                .then(response => response.json())
                .then((ownedBooksArray) =>{
                    setOwnedBooks(ownedBooksArray)
                })
    },
    []
    )
    
}