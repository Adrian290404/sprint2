import { CgMail } from "react-icons/cg"
import { CiBellOn } from "react-icons/ci"
import { IoLogOutOutline } from "react-icons/io5"
import { Container, Left, Right, Title, SubTitleContainer, TitleContainer, Page } from "./styles/topMenuStyles"
import { Hamburguer, CursorPointer } from "./styles/icons"
import { useLocation, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchRoom } from "../../features/rooms/roomsThunks"
import { fetchBooking } from "../../features/bookings/bookingsThunks"
import { fetchUser } from "../../features/users/usersThunks"
import { logout } from "../../features/login/authSlice"
import { useEffect } from "react"

export const TopMenuComponent = ({ onToggleSidebar }) => {
    const location = useLocation()
    const { id } = useParams()
    const dispatch = useDispatch()

    const booking = useSelector((state) => state.bookings.booking)
    const room = useSelector((state) => state.rooms.room)
    const user = useSelector((state) => state.users.user)

    useEffect(() => {
        if (location.pathname.includes("/bookings") && id && location.pathname.split("/")[2] !== "create") {
            dispatch(fetchBooking(Number(id)))
        } 
        else if (location.pathname.includes("/room") && id && location.pathname.split("/")[2] !== "create") {
            dispatch(fetchRoom(Number(id))) 
        }
        else if (location.pathname.includes("/users") && id && location.pathname.split("/")[2] !== "create") {
            dispatch(fetchUser(Number(id)))
        }
    }, [location.pathname, id, dispatch])

    const getName = () => {
        if (location.pathname.includes("/bookings") && location.pathname !== "/bookings" && location.pathname !== "/bookings/create" && booking) return user.name
        if (location.pathname.includes("/room") && location.pathname !== "/room" && location.pathname !== "/room/create"  && room) return room.room_name
        if (location.pathname.includes("/users") && location.pathname !== "/users" && location.pathname !== "/users/create" && user) return user.name 
        if (location.pathname.includes("/dashboard") && location.pathname.split("/")[2] === "customerReviews") {
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