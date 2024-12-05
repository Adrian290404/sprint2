import { useState } from "react"
import { Container, Button } from "./styles/paginationStyles"

export const PaginationComponent = () => {
    const [buttonIndex, setButtonIndex] = useState(1)

    const changeIndex = (index) => {
        setButtonIndex(index)
    }

    const totalPages = 4

    return (
        <Container>
            <p>Showing 5 of 102 Data</p>
            <div>
                <Button controller onClick={() => changeIndex(buttonIndex === 1 ? totalPages : buttonIndex - 1)}>
                    Prev
                </Button>

                {(() => {
                    let buttons = []
                    for (let index = 0; index < totalPages; index++) {
                        buttons.push(
                            <Button
                                key={index}
                                isSelected={buttonIndex === index + 1}
                                onClick={() => changeIndex(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        )
                    }
                    return buttons
                })()}
                
                <Button controller onClick={() => changeIndex(buttonIndex === totalPages ? 1 : buttonIndex + 1)}>
                    Next
                </Button>
            </div>
        </Container>
    )
}