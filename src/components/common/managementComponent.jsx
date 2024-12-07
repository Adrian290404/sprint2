import { useLocation } from "react-router-dom"
import { Container, List, Item, Button, Filter } from "./styles/managementStyles"
import { useState } from "react"

export const ManagementComponent = () => {
    const location = useLocation()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const page = {
        "/bookings": "Booking",
        "/concierge": "Employee",
        "/room": "Room" 
    }

    const showMenu = () => {
        switch (location.pathname) {
            case "/bookings":
                return ["All Guest", "Pending", "Booked", "Cancelled", "Refund"]
            case "/concierge":
                return ["All Employee", "Active Employee", "Inactive Employee"]
            case "/room" :
                 return ["All Rooms", "Active Employee", "Inactive Employee"]
            default:
                return []
        }
    }

    const showOptions = () => {
        switch (location.pathname) {
            case "/bookings":
                return ["Newest", "Guest", "Check in", "Check out"]
            case "/concierge":
                return ["Newest", "Alphabetic"]
            case "/room" :
                return ["Newest", "Available", "Highest price", "Lowest price"]
            default:
                return []
        }
    }

    return (
        <Container>
            <List>
                {showMenu().map((li, index) => (
                    <Item
                        key={index}
                        isSelected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                    >
                        {li}
                    </Item>
                ))}
            </List>
            <div>
                <Button> + New {page[location.pathname]} </Button>
                <Filter>
                    {showOptions().map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </Filter>
            </div>
        </Container>
    )
}