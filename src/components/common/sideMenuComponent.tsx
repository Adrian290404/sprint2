import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import userPhoto from "../../assets/userPhoto.jpg";
import { MdOutlineDashboard } from "react-icons/md";
import { GiHouseKeys } from "react-icons/gi";
import { TbCalendarCheck } from "react-icons/tb";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { TiDocumentText } from "react-icons/ti";
import { Navbar, PageNavigation, Marker, Content, UserContainer, UserContent, UserImage, UserName, UserEmail, EditButton, Footer, FooterTitle } from "./styles/sideMenuStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../features/store";

interface User {
    email?: string;
    name?: string;
}

export const SideMenuComponent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth) as { user: User };

    const changePageHandler = (destination: string): void => {
        navigate(destination);
    };

    return (
        <>
            <img src={logo} alt="Logo" />
            <Navbar>
                <PageNavigation onClick={() => changePageHandler("/dashboard")}>
                    <Marker active={location.pathname === "/dashboard" || location.pathname.split("/")[1] === "dashboard"}></Marker>
                    <Content active={location.pathname === "/dashboard" || location.pathname.split("/")[1] === "dashboard"}>
                        <MdOutlineDashboard size={30} color="" />
                        <p>DashBoard</p>
                    </Content>
                </PageNavigation>
                <PageNavigation onClick={() => changePageHandler("/room")}>
                    <Marker active={location.pathname === "/room" || location.pathname.split("/")[1] === "room"}></Marker>
                    <Content active={location.pathname === "/room" || location.pathname.split("/")[1] === "room"}>
                        <GiHouseKeys size={30} color="" />
                        <p>Rooms</p>
                    </Content>
                </PageNavigation>
                <PageNavigation onClick={() => changePageHandler("/bookings")}>
                    <Marker active={location.pathname === "/bookings" || location.pathname.split("/")[1] === "bookings"}></Marker>
                    <Content active={location.pathname === "/bookings" || location.pathname.split("/")[1] === "bookings"}>
                        <TbCalendarCheck size={30} color="" />
                        <p>Bookings</p>
                    </Content>
                </PageNavigation>
                <PageNavigation onClick={() => changePageHandler("/users")}>
                    <Marker active={location.pathname === "/users" || location.pathname.split("/")[1] === "users"}></Marker>
                    <Content active={location.pathname === "/users" || location.pathname.split("/")[1] === "users"}>
                        <IoPeopleCircleSharp size={30} color="" />
                        <p>Employees</p>
                    </Content>
                </PageNavigation>
                <PageNavigation onClick={() => changePageHandler("/contact")}>
                    <Marker active={location.pathname === "/contact" || location.pathname.split("/")[1] === "contact"}></Marker>
                    <Content active={location.pathname === "/contact" || location.pathname.split("/")[1] === "contact"}>
                        <TbMessageChatbotFilled size={30} color="" />
                        <p>Contact</p>
                    </Content>
                </PageNavigation>
                <PageNavigation onClick={() => changePageHandler("/record")}>
                    <Marker active={location.pathname === "/record" || location.pathname.split("/")[1] === "record"}></Marker>
                    <Content active={location.pathname === "/record" || location.pathname.split("/")[1] === "record"}>
                        <TiDocumentText size={30} color="" />
                        <p>Record</p>
                    </Content>
                </PageNavigation>
                <UserContainer>
                    <UserImage src={userPhoto} alt="User" />
                    <UserContent>
                        <UserName>{user?.name || "User"}</UserName>
                        <UserEmail>{user?.email || "user@gmail.com"}</UserEmail>
                        <EditButton onClick={() => changePageHandler("/profile")}>Edit</EditButton>
                    </UserContent>
                </UserContainer>
            </Navbar>
            <Footer>
                <FooterTitle>Travl Hotel Admin Dashboard</FooterTitle>
                <p>© 2020 All Rights Reserved</p>
            </Footer>
        </>
    );
};