import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBooking } from "../../../features/bookings/bookingsThunks";
import { fetchUser } from "../../../features/users/usersThunks";
import { fetchRoom } from "../../../features/rooms/roomsThunks";
import { Background, Button, Container, FacilityList, ID, InfoRow, LeftSection, Name, ProfileDetails, ProfileImage, ProfileInfo, RightSection, RoomDetails, RoomImage, Icon, Contact, InfoContainer, InfoTitle, Info, Separator, Especificator, FacilitiesTitle, Element, RoomStatus, RoomContainer, Options, Row, Action, GoBookings } from "./styles/bookingDetailsStyles";
import { FaPhone } from "react-icons/fa6";
import { TbMessageFilled } from "react-icons/tb";
import { TiBackspaceOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { GiBed } from "react-icons/gi";
import { ModalQuestionComponent } from "../../common/modalQuestionComponent";
import { deleteBooking } from "../../../features/bookings/bookingsThunks";
import { BookingDetailsFormComponent } from "./bookingsDetailsFormComponent";
import { AppDispatch } from "../../../features/store";

export const BookingsDetailsComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const booking = useSelector((state: any) => state.bookings.booking);
    const user = useSelector((state: any) => state.users.user);
    const room = useSelector((state: any) => state.rooms.room);
    const navigate = useNavigate();
    const [showInformation, setShowInformation] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const formatDateCheckIn = (inputDateTime: string) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        const getDaySuffix = (day: number) => {
            if (day > 3 && day < 21) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };
    
        const date = new Date(inputDateTime);
    
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const amPm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; 
        const daySuffix = getDaySuffix(day);
    
        return `${month} ${day}${daySuffix}, ${year} | ${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${amPm}`;
    };

    const formatDateCheckOut = (dateString: string) => {
        const date = new Date(dateString);
        const getDaySuffix = (day: number) => {
            if (day > 3 && day < 21) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };
        const day = date.getDate();
        const daySuffix = getDaySuffix(day);
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();
        return `${month} ${day}${daySuffix}, ${year}`;
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const editInfo = () => {
        setShowInformation(!showInformation);
    };

    const handleDelete = () => {
        dispatch(deleteBooking(Number(id)));
        closeModal();
        navigate(-1);
    };

    useEffect(() => {
        const loadData = async () => {
            if (id) {
                try {
                    const bookingResult = await dispatch(fetchBooking(Number(id))).unwrap();
                    if (bookingResult[0].user_id && bookingResult[0].room_id) {
                        await Promise.all([
                            dispatch(fetchUser(Number(bookingResult[0].user_id))),
                            dispatch(fetchRoom(Number(bookingResult[0].room_id))),
                        ]);
                    }
                } 
                catch (error) {
                    console.error("Error fetching data:", error);
                } 
                finally {
                    setIsLoading(false);
                }
            }
        };
        loadData();
    }, [dispatch, id]);

    if (isLoading || !booking || !user || !room) {
        return <p>Loading...</p>;
    }

    if (!booking) {
        return <p>Booking not found.</p>; 
    }

    const currentRoom = Array.isArray(room) ? room[0] : room;
    const currentUser = Array.isArray(user) ? user[0] : user;
    const currentBooking = Array.isArray(booking) ? booking[0] : booking;
    const facilitiesArray = currentRoom?.facilities ? currentRoom.facilities.split(", ") : [];

    return (
        <Background>
            <Container>
                <LeftSection>
                    <GoBookings>
                        <Action type="back" onClick={() => navigate(-1)}>
                            <TiBackspaceOutline size={30} />
                        </Action>
                    </GoBookings>
                    <Options>
                        <Row>
                            <Action type="edit" onClick={editInfo}>
                                <CiEdit size={30} />
                            </Action>
                            <Action type="delete" onClick={openModal}>
                                <MdDelete size={30} />
                            </Action>                        
                            <Action type="user" onClick={() => navigate(`/users/${booking.user_id}`)}>
                                <FaUserPen size={30} />
                            </Action>
                            <Action type="room" onClick={() => navigate(`/room/${booking.room_id}`)}>
                                <GiBed size={35} />
                            </Action>
                        </Row>
                    </Options>
                    <ProfileInfo>
                        <ProfileImage src={currentUser.image} />
                        <ProfileDetails>
                            <Name>{currentUser.name}</Name>
                            <ID>ID {currentBooking.id}</ID>
                            <Contact>
                                <Icon><FaPhone size={20} /></Icon>
                                <Button><TbMessageFilled size={25} />Send Message</Button>
                            </Contact>
                        </ProfileDetails>
                    </ProfileInfo>
                    <InfoRow>
                        <InfoContainer>
                            <InfoTitle>Check In</InfoTitle> 
                            <Info>{formatDateCheckIn(currentBooking.check_in)}</Info>
                        </InfoContainer>
                        <InfoContainer>
                            <InfoTitle>Check Out</InfoTitle> 
                            <Info>{formatDateCheckOut(currentBooking.check_out)}</Info>
                        </InfoContainer>
                    </InfoRow>
                    <Separator />
                    <InfoRow>
                        <InfoContainer>
                            <InfoTitle>Room Info</InfoTitle>
                            <Info room>{currentRoom.room_name}</Info>
                        </InfoContainer>
                        <InfoContainer>
                            <InfoTitle>Price</InfoTitle> 
                            <Info room>${currentRoom.rate} <Especificator>/night</Especificator></Info>
                        </InfoContainer>
                    </InfoRow>
                    <RoomDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </RoomDetails>
                    <FacilitiesTitle>Facilities</FacilitiesTitle>
                    <FacilityList>
                        {facilitiesArray.map((facility, index) => (
                            <Element key={index}>{facility}</Element>
                        ))}
                    </FacilityList>
                </LeftSection>
                <RightSection>
                    {showInformation ? (
                        <>
                            <RoomContainer>
                                <RoomImage src={currentRoom.image} />
                                <RoomStatus type={currentBooking.status}>{currentBooking.status}</RoomStatus>
                            </RoomContainer>
                        </>
                    ) : (
                        <BookingDetailsFormComponent
                            check_in={currentBooking.check_in}
                            check_out={currentBooking.check_out}
                            user_id={currentBooking.user_id}
                            room_id={currentBooking.room_id}
                            id={currentBooking.id}
                            order_date={currentBooking.order_date}
                            special_request={currentBooking.special_request}
                            status={currentBooking.status}
                        />
                    )}
                </RightSection>
            </Container>
            <ModalQuestionComponent
                isOpen={showModal} 
                onClose={closeModal} 
                onConfirm={handleDelete} 
                name={`${currentUser.name}'s Booking`}
                func="Delete"
            />
        </Background>
    )
}