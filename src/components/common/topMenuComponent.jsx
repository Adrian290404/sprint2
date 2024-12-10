import { CgMail } from "react-icons/cg"
import { CiBellOn } from "react-icons/ci"
import { IoLogOutOutline } from "react-icons/io5"
import { Container, Left, Right, Title, SubTitleContainer, TitleContainer, Page } from "./styles/topMenuStyles"
import { Hamburguer, CursorPointer } from "./styles/icons"
import { useLocation, useParams } from "react-router-dom"
import { bookings } from "../../data/bookings"
import { rooms } from "../../data/rooms"
import { employees } from "../../data/employees"
import { useDispatch } from "react-redux"
import { logout } from "../../features/authSlice"

export const TopMenuComponent = ({ onToggleSidebar }) => {
    const location = useLocation()
    const { id } = useParams()
    const dispatch = useDispatch()

    const getName = () => {
        if (location.pathname.split("/")[1] === "bookings" && location.pathname.split("/")[2] !== "create") {
            const booking = bookings.find(data => data.id === parseInt(id))
            if (booking) return booking.name
        } else if (location.pathname.split("/")[1] === "room" && location.pathname.split("/")[2] !== "create") {
            const room = rooms.find(data => data.id === parseInt(id))
            if (room) return room.room_name
        } else if (location.pathname.split("/")[1] === "users" && location.pathname.split("/")[2] !== "create") {
            const employee = employees.find(data => data.id === parseInt(id))
            if (employee) return employee.name
        } else if (location.pathname.split("/")[1] === "dashboard" && location.pathname.split("/")[2] === "customerReviews") {
            return "Customer Review"
        }
        return ""
    }

    const getTitle = (details) => {
        const pathArray = location.pathname.split("/")
        if (!isNaN(Number(pathArray[pathArray.length - 1]))) {
            pathArray.pop()
            details && pathArray.push("details")
        }
        const pathString = pathArray.join("")

        switch (pathString) {
            case "dashboard":
                return "Dashboard"
            case "dashboardcustomerReviews":
                return "Dashboard"
            case "room":
                return "Room"
            case "roomcreate":
                return "Room Create"
            case "roomdetails":
                return "Room Details"
            case "bookings":
                return "Bookings"
            case "bookingscreate":
                return "Bookings Create"
            case "bookingsdetails":
                return "Bookings Details"
            case "users":
                return "Users"
            case "userscreate":
                return "Users Create"
            case "usersdetails":
                return "Users Details"
            case "profile":
                return "Edit profile"
            case "contact":
                return "Contact"
            default:
                return ""
        }
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Container>
            <Left>
                <Hamburguer size={30} onClick={onToggleSidebar} />
                <TitleContainer>
                    <Title>{getName() !== "" ? getTitle(true) : getTitle(false)}</Title>
                    <SubTitleContainer active={getName() !== ""}>
                        <Page>{getName() !== "" && (getTitle(false) + " / ")}</Page>
                        <p>&nbsp;{getName() !== "" && getName()}</p>
                    </SubTitleContainer>
                </TitleContainer>
            </Left>
            <Right>
                <CursorPointer>
                    <CgMail size={30} />
                </CursorPointer>
                <CursorPointer>
                    <CiBellOn size={30} />
                </CursorPointer>
                <CursorPointer onClick={handleLogout}>
                    <IoLogOutOutline size={30} />
                </CursorPointer>
            </Right>
        </Container>
    )
}