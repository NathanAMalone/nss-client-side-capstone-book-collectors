import  Axios  from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./MyBooks.css"

export const AddPicture = () => {
    //Use params to get ownedbook id
    // Use State to got owned books/id
    // post image to cloudinary, then set response to bookImage
    // then post to json server
    const {ownedBookId} = useParams()
    const [ownedBook, setOwnedBook] = useState({
        userId: 0,
        bookId: 0,
        bookThoughts: "",
        dustJacket: false,
        ableToLoan: false,
        ableToLoanDate: "",
        isClaimed: false,
        isClaimedDate: "",
        bookImage: "",
        borrowerName: "",
        approved: false,
        approvedDate: "",
        returnedDate: "",
        prevBorrowerName: ""
    })
    const [imageUpload, setImageUpload] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/ownedBooks/${ownedBookId}?_expand=book`)
            .then(response => response.json())
            .then((singleBook) => {
                setOwnedBook(singleBook)
            })
    }, [ownedBookId]
    )

    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", imageUpload)
        formData.append("upload_preset", "woxu5igj")

        return Axios.post("https://api.cloudinary.com/v1_1/diyercxq0/image/upload", formData)
    }
    
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        uploadImage() 
        .then((response) => {
            console.log(response)
            
            const ownedBookToSendToAPI = {
                bookThoughts: ownedBook.bookThoughts,
                dustJacket: ownedBook.dustJacket,
                bookId: ownedBook.bookId,
                userId: ownedBook.userId,
                ableToLoan: ownedBook.ableToLoan,
                ableToLoanDate: ownedBook.ableToLoanDate,
                isClaimed: ownedBook.isClaimed,
                isClaimedDate: ownedBook.isClaimedDate,
                bookImage: response.data.url,
                borrowerName: ownedBook.borrowerName,
                approved: ownedBook.approved,
                approvedDate: ownedBook.approvedDate,
                returnedDate: ownedBook.returnedDate,
                prevBorrowerName: ownedBook.prevBorrowerName
            }

            return fetch(`http://localhost:8088/ownedBooks/${ownedBook.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(ownedBookToSendToAPI)
                    })
                        .then(response => response.json())
                        .then(() => {
                            navigate("/myBooks")
                        })
        })
    }
    return <form className="addPictureForm">
        <h2 className="addPictureHeader">Adding a picture for:</h2>
        <h2 className="addPictureTitle"> {ownedBook?.book?.bookName}</h2>
        <fieldset>
            <div className="formGroup">
                <label htmlFor="addBookImage" className="addPictureLabel">Upload a Book Image: </label>
                <input type="file"
                    className="addPicture"
                    onChange={(evt) => {
                        setImageUpload(evt.target.files[0])
                    }} />
            </div>
        </fieldset>
        <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Add Image
        </button>
    </form>
}