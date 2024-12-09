import { useLocation, useNavigate } from "react-router-dom"
import { Container, List, Item, Create, Filter } from "./styles/managementStyles"
import { useState } from "react"

export const ManagementComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const page = {
        "/bookings": "Booking",
        "/users": "Employee",
        "/room": "Room" 
    }

    const showMenu = () => {
        switch (location.pathname) {
            case "/bookings":
                return ["All Guest", "Pending", "Booked", "Cancelled", "Refund"]
            case "/users":
                return ["All Employee", "Active Employee", "Inactive Employee"]
            case "/room" :
                 return ["All Rooms", "Active Employee", "Inactive Employee"]
            case "/dashboard/customerReviews":
                return ["All Customer Reviews", "Published", "Archived"]
            default:
                return []
        }
    }

    const showOptions = () => {
        switch (location.pathname) {
            case "/bookings":
                return ["Newest", "Guest", "Check in", "Check out"]
            case "/users":
                return ["Newest", "Alphabetic"]
            case "/room" :
                return ["Newest", "Available", "Highest price", "Lowest price"]
            case "/dashboard/customerReviews":
                return ["Newest", "Best Valoration", "Worst Valoration"]
            default:
                return []
        }
    }

    const navigateTo = () => {
        navigate(`${location.pathname}/create`)
    }

    return (
        <Container>
            <List>
                {showMenu().map((li, index) => (
                    <Item key={index} isSelected={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
                        {li}
                    </Item>
                ))}
            </List>
            <div>
                {location.pathname !== "/dashboard/customerReviews" && <Create onClick={navigateTo}> + New {page[location.pathname]} </Create>} 
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