import { useLocation, useNavigate } from "react-router-dom"
import { Container, List, Item, Create, Filter } from "./styles/managementStyles"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedMenu, setSelectedOption } from "../../features/lists/filterSlice"

export const ManagementComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { selectedMenu, selectedOption } = useSelector((state) => state.filter)

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
                 return ["All Rooms", "Avaiable Rooms", "Booked Rooms"]
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
                return ["Newest", "Highest price", "Lowest price"]
            case "/dashboard/customerReviews":
                return ["Newest", "Best Valoration", "Worst Valoration"]
            default:
                return []
        }
    }

    const navigateTo = () => {
        navigate(`${location.pathname}/create`)
    }

    const handleMenuSelect = (menu) => {
        dispatch(setSelectedMenu(menu))
    }

    const handleOptionSelect = (option) => {
        dispatch(setSelectedOption(option))
    }

    return (
        <Container>
            <List>
                {showMenu().map((li, index) => (
                    <Item 
                        key={index} 
                        isSelected={selectedMenu === li} 
                        onClick={() => handleMenuSelect(li)}
                    >
                        {li}
                    </Item>
                ))}
            </List>
            <div>
                {location.pathname !== "/dashboard/customerReviews" && <Create onClick={navigateTo}> + New {page[location.pathname]} </Create>} 
                <Filter 
                    value={selectedOption} 
                    onChange={(e) => handleOptionSelect(e.target.value)}
                >
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