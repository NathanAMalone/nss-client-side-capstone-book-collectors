import { useEffect, useState } from "react"

export const SeriesDropDown = ({ setBookSeriesId}) => {
    const [bookSeriesNames, setBookSeriesNames] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/bookSeriesNames`)
                .then(response => response.json())
                .then((bookSeriesArray) => {
                    setBookSeriesNames(bookSeriesArray)
                })
        },
        []
    )

    return<>
    <fieldset>
      <div className="dropDown">
        <label htmlFor="addBookSeries">Book Series:</label>
        <select className="editDropDown"
          onChange={(evt) => {
            setBookSeriesId(parseInt(evt.target.value))
          }}
        >
          <option value={0}>See All Books</option>
          {
            bookSeriesNames.map((bookSeriesName) => {
              return <option value={`${bookSeriesName.id}`} key={`bookSeriesName--${bookSeriesName.id}`}>
                {bookSeriesName.bookSeries}
              </option>
            })

          }
        </select>
      </div>
    </fieldset>
    </>
}