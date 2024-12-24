import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchBooking } from "../../../features/bookings/bookingsThunks"
import { fetchUser } from "../../../features/users/usersThunks"
import { fetchRoom } from "../../../features/rooms/roomsThunks"
import { Background, BookedBadge, Button, Container, FacilityList, ID, InfoRow, LeftSection, Name, ProfileDetails, ProfileImage, ProfileInfo, RightSection, RoomDetails, RoomImage, Icon, Contact, InfoContainer, InfoTitle, Info, Separator, Especificator, FacilitiesTitle, Element, RoomStatus, RoomContainer, Options, Row, Action } from "./styles/bookingDetailsStyles"
import { FaPhone } from "react-icons/fa6"
import { TbMessageFilled } from "react-icons/tb"
import { TiBackspaceOutline } from "react-icons/ti"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { FaUserPen } from "react-icons/fa6"
import { GiBed } from "react-icons/gi"
import { ModalQuestionComponent } from "../../common/modalQuestionComponent"
import { deleteBooking } from "../../../features/bookings/bookingsThunks"

export const BookingsDetailsComponent = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const booking = useSelector((state) => state.bookings.booking)
    const user = useSelector((state => state.users.user))
    const room = useSelector((state => state.rooms.room))
    const navigate = useNavigate()
    const [showInformation, setShowInformation] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const formatDateCheckIn = (inputDateTime) => {
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ]
      
        const getDaySuffix = (day) => {
          if (day > 3 && day < 21) return "th"
          switch (day % 10) {
            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
          }
        }
      
        const [date, time] = inputDateTime.split(" ")
        const [month, day, year] = date.split("/").map(Number)
        const [hours, minutes] = time.split(":").map(Number)
      
        const amPm = hours >= 12 ? "PM" : "AM"
        const formattedHours = hours % 12 || 12
        const monthName = months[month - 1]
        const daySuffix = getDaySuffix(day)
      
        return `${monthName} ${day}${daySuffix}, ${year} | ${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${amPm}`
    }

    const formatDateCheckOut = (dateString) => {
        const date = new Date(dateString);
        const getDaySuffix = (day) => {
            if (day > 3 && day < 21) return "th"
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }
        const day = date.getDate()
        const daySuffix = getDaySuffix(day)
        const month = date.toLocaleString("en-US", { month: "long" })
        const year = date.getFullYear()
        return `${month} ${day}${daySuffix}, ${year}`
    }

    const openModal = () => {
        setShowModal(true)
    }
    
    const closeModal = () => {
        setShowModal(false)
    }

    const handleDelete = () => {
        dispatch(deleteBooking(Number(id)));
        closeModal();
        navigate(-1);
    }

    useEffect(() => {
        const loadData = async () => {
            if (id) {
                await dispatch(fetchBooking(Number(id)))
            }
        }

        loadData()
    }, [dispatch, id])

    useEffect(() => {
        if (booking?.user_id && booking?.room_id) {
            dispatch(fetchUser(Number(booking.user_id)))
            dispatch(fetchRoom(Number(booking.room_id)))
            setIsLoading(false)
        }
    }, [dispatch, booking])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <Background>
            <Container>
                <LeftSection>
                    <Options>
                        <Row>
                            <Action type="back" onClick={() => navigate(-1)}>
                                <TiBackspaceOutline size={30}/>
                            </Action>
                            <Action type="edit">
                                <CiEdit size={30} />
                            </Action>
                            <Action type="delete" onClick={openModal}>
                                <MdDelete size={30} />
                            </Action>                        
                        </Row>
                        <Row>
                            <Action type="user" onClick={() => navigate(`/users/${booking.user_id}`)}>
                                <FaUserPen size={30} />
                            </Action>
                            <Action type="room" onClick={() => navigate(`/room/${booking.room_id}`)}>
                                <GiBed size={35} />
                            </Action>
                        </Row>
                    </Options>
                    <ProfileInfo>
                        <ProfileImage src={user.image}/>
                        <ProfileDetails>
                            <Name>{user.name}</Name>
                            <ID>ID {booking.id}</ID>
                            <Contact>
                                <Icon><FaPhone size={20} /></Icon>
                                <Button><TbMessageFilled size={25} />Send Message</Button>
                            </Contact>
                        </ProfileDetails>
                    </ProfileInfo>
                    <InfoRow>
                        <InfoContainer>
                            <InfoTitle>Check In</InfoTitle> 
                            <Info>{formatDateCheckIn(booking.check_in)}</Info>
                        </InfoContainer>
                        <InfoContainer>
                            <InfoTitle>Check Out</InfoTitle> 
                            <Info>{formatDateCheckOut(booking.check_out)}</Info>
                        </InfoContainer>
                    </InfoRow>
                    <Separator />
                    <InfoRow>
                        <InfoContainer>
                            <InfoTitle>Room Info</InfoTitle>
                            <Info room>{room.room_name}</Info>
                        </InfoContainer>
                        <InfoContainer>
                            <InfoTitle>Price</InfoTitle> 
                            <Info room>${room.rate} <Especificator>/night</Especificator></Info>
                        </InfoContainer>
                    </InfoRow>
                    <RoomDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </RoomDetails>
                    <FacilitiesTitle>Facilities</FacilitiesTitle>
                    <FacilityList>
                        <Element>3 Bed Space</Element>
                        <Element>24 Hours Guard</Element>
                        <Element>Free WiFi</Element>
                        <Element>2 Bathroom</Element>
                        <Element>Air Conditioner</Element>
                        <Element>Television</Element>
                    </FacilityList>
                </LeftSection>
                <RightSection>
                    <BookedBadge>BOOKED</BookedBadge>
                    <RoomContainer>
                        <RoomImage src={room.image} />
                        <RoomStatus type={booking.status}>{booking.status}</RoomStatus>
                    </RoomContainer>
                </RightSection>
            </Container>
            <ModalQuestionComponent
                isOpen={showModal} 
                onClose={closeModal} 
                onConfirm={handleDelete} 
                name={user.name + "'s Booking"}
                func="Delete"
            />
        </Background>
    )
}