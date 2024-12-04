import { CgMail } from "react-icons/cg"
import { CiBellOn } from "react-icons/ci"
import { IoLogOutOutline } from "react-icons/io5"
import { Container, Left, Right, Title } from "./styles/topMenuStyles"
import { Hamburguer, CursorPointer } from "./styles/icons"
import { useLocation } from "react-router-dom";

export const TopMenuComponent = ({ onToggleSidebar, onLogout }) => {
    const location = useLocation()

    const getTitle = () => {
        switch (location.pathname) {
            case "/dashboard":
                return "Dashboard"
            case "/room":
                return "Room"
            case "/bookings":
                return "Bookings"
            case "/guest":
                return "Guest"
            case "/concierge":
                return "Concierge"
            case "/user":
                return "User"
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