import { CgMail } from "react-icons/cg"
import { CiBellOn } from "react-icons/ci"
import { IoLogOutOutline } from "react-icons/io5"
import { Container, Left, Right, Title } from "./styles/topMenuStyles"
import { Hamburguer, CursorPointer } from "./styles/icons"
import { useLocation, useParams } from "react-router-dom"
import { bookings } from "../../data/bookings"
import { rooms } from "../../data/rooms"

export const TopMenuComponent = ({ onToggleSidebar, onLogout }) => {
    const location = useLocation()
    const { id } = useParams()

    const getTitle = () => {
        if (location.pathname.split("/")[1] === "bookings") {
            const booking = bookings.find(data => data.id === parseInt(id))
            if (booking) {
                return booking.name
            }
        }
        else if (location.pathname.split("/")[1] === "room") {
            const room = rooms.find(data => data.id === parseInt(id))
            if (room) {
                return room.room_name
            }
        }

        switch (location.pathname) {
            case "/dashboard":
                return "Dashboard"
            case "/room":
                return "Room"
            case "/bookings":
                return "Bookings"
            case "/concierge":
                return "Concierge"
            case "/profile":
                return "Profile"
            default:
                return ""
        }
    }
    return (
        <Container>
            <Left>
                <Hamburguer size={30} onClick={onToggleSidebar} />
                <Title>{getTitle()}</Title>
            </Left>
            <Right>
                <CursorPointer>
                    <CgMail size={30} />
                </CursorPointer>
                <CursorPointer>
                    <CiBellOn size={30} />
                </CursorPointer>
                <CursorPointer onClick={onLogout}>
                    <IoLogOutOutline size={30} />
                </CursorPointer>
            </Right>
        </Container>
    )
}