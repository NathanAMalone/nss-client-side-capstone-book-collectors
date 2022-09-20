export const BookSearch = ({ setterFunction }) => {

    return<>
        <div>
            <input
                autoFocus
                onChange={
                    (changeEvent) => {
                        const recentCharacter = changeEvent.target.value.slice(-1)
                        const result = recentCharacter.match(/^[a-zA-Z 0-9 -]*$/g)
                        if(result){
                            setterFunction(changeEvent.target.value)
                        } else {
                            const strippedValue = changeEvent.target.value.slice(0,-1)
                            changeEvent.target.value = strippedValue
                                
                        }
                    }
                }
                type="text" placeholder="Enter search terms" />
        </div>
    </>
}