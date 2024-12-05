import { CgMail } from "react-icons/cg"
import { CiBellOn } from "react-icons/ci"
import { IoLogOutOutline } from "react-icons/io5"
import { Container, Left, Right, Title } from "./styles/topMenuStyles"
import { Hamburguer, CursorPointer } from "./styles/icons"
import { useLocation, useMatch, useParams } from "react-router-dom"
import { bookings } from "../../data/bookings"

export const TopMenuComponent = ({ onToggleSidebar, onLogout }) => {
    const location = useLocation()
    const { bookingId } = useParams()

    const getTitle = () => {
        if (bookingId) {
            const booking = bookings.find(b => b.id === parseInt(bookingId))
            if (booking) {
                return booking.name
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