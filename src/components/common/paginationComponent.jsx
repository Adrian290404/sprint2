import { useLocation } from "react-router-dom"
import { Container, List, Item, Buttons, Button, Filter } from "../common/styles/paginationStyles"
import { useState } from "react"

export const PaginationComponent = () => {
    const location = useLocation()
    const [selectedIndex, setSelectedIndex] = useState(0)

    const showSelector = () => {
        switch (location.pathname) {
            case "/bookings":
                return ["All Guest", "Pending", "Booked", "Cancelled", "Refund"]
            case "/concierge":
                return ["All Employee", "Active Employee", "Inactive Employee"]
            default:
                return []
        }
    }

    return (
        <Container>
            <List>
                {showSelector().map((li, index) => (
                    <Item
                        key={index}
                        isSelected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                    >
                        {li}
                    </Item>
                ))}
            </List>
            <Buttons>
                <Button></Button>
                <Filter>
                    <option value="Guest">Guest</option>
                    <option value="Order Date">Order Date</option>
                    <option value="Check in">Check in</option>
                    <option value="Check out">Check out</option>
                </Filter>
            </Buttons>
        </Container>
    )
}