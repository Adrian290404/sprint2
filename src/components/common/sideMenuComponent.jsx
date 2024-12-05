import logo from "../../assets/logo.png"
import userPhoto from "../../assets/userPhoto.png"
import { MdOutlineDashboard } from "react-icons/md";
import { GiHouseKeys } from "react-icons/gi";
import { TbCalendarCheck } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { Navbar, PageNavigation, Marker, Content, UserContainer, UserContent, UserImage, UserName, UserEmail, EditButton, Footer, FooterTitle } from "./styles/sideMenuStyles";
import { useLocation, useNavigate } from "react-router-dom";

export const SideMenuComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const changePageHandler = (destination) => {
        navigate(destination)
    }

    return (
        <>
            <img src={logo} />
            <Navbar>
                <PageNavigation onClick={() => changePageHandler("/dashboard")}>
                    <Marker active={location.pathname === "/dashboard"}></Marker>
                    <Content active={location.pathname === "/dashboard"}>
                        <MdOutlineDashboard size={30} color=""/>
                        <p>DashBoard</p>
                    </Content>
                </PageNavigation>
                <PageNavigation onClick={() => changePageHandler("/room")}>
                    <Marker active={location.pathname === "/room"}></Marker>
                    <Content active={location.pathname === "/room"}>
                        <GiHouseKeys size={30} color=""/>
                        <p>Room</p>
                    </Content>
                </PageNavigation>
                <PageNavigation onClick={() => changePageHandler("/bookings")}>
                    <Marker active={location.pathname === "/bookings"}></Marker>
                    <Content active={location.pathname === "/bookings"}>
                        <TbCalendarCheck size={30} color=""/>
                        <p>Bookings</p>
                    </Content>
                </PageNavigation>
                <PageNavigation onClick={() => changePageHandler("/concierge")}>
                    <Marker active={location.pathname === "/concierge"}></Marker>
                    <Content active={location.pathname === "/concierge"}>
                        <IoExtensionPuzzleOutline size={30} color=""/>
                        <p>Concierge</p>
                    </Content>
                </PageNavigation>
                <UserContainer>
                    <UserImage src={userPhoto}/>
                    <UserContent>
                        <UserName>William Johanson</UserName>
                        <UserEmail>williamjohn@mail.com</UserEmail>
                        <EditButton onClick={() => changePageHandler("/profile")}>Edit</EditButton>
                    </UserContent>
                </UserContainer>
            </Navbar>
            <Footer>
                <FooterTitle>Travl Hotel Admin Dashboard</FooterTitle>
                <p>© 2020 All Rights Reserved</p>
            </Footer>
        </>
    )
}