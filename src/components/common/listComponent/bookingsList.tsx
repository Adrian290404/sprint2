import { Row, Td, Container, Image, InfoContainer, TextLight, GuestHour, GuestNotes, GuestStatus } from "./styles/listStyles";
import { formatDate } from "./functions/formatDate";
import { formatDateHalf1 } from "./functions/formatDateHalf1";
import { formatDateHalf2 } from "./functions/formatDateHalf2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookings } from "../../../features/bookings/bookingsThunks";
import { fetchUsers } from "../../../features/users/usersThunks"; 
import { fetchRooms } from "../../../features/rooms/roomsThunks";
import { paginateData } from "./functions/paginateData";
import { filterBookings } from "./functions/filterBookings";
import { AppDispatch } from "../../../features/store";
import { Booking } from "../../../interfaces/booking";
import { Room } from "../../../interfaces/room";
import { Employee } from "../../../interfaces/employee";
import { toast } from "react-toastify";

interface BookingsListProps {
    currentPage: number;
    handleNavigate: (id: number) => void;
}

export const BookingsList: React.FC<BookingsListProps> = ({ currentPage, handleNavigate }) => {
    const dispatch = useDispatch<AppDispatch>();
    const bookings = useSelector((state: any) => state.bookings.bookings);
    const users = useSelector((state: any) => state.users.users);
    const rooms = useSelector((state: any) => state.rooms.rooms);
    const { selectedMenu, selectedOption } = useSelector((state: any) => state.filter);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (bookings.length === 0) {
                await dispatch(fetchBookings());
            }
            if (users.length === 0) {
                await dispatch(fetchUsers());
            }
            if (rooms.length === 0) {
                await dispatch(fetchRooms());
            }
            setIsLoading(false);
        };
        loadData();
    }, [dispatch, bookings.length, users.length]);

    const filteredBookings = filterBookings(bookings, selectedMenu, selectedOption);
    const paginatedBookings = paginateData(
        filteredBookings.filter((booking): booking is Booking => booking !== undefined && booking !== null),
        10
    )[currentPage - 1] || [];

    const getImageById = (id: number, type: "user" | "room"): string | undefined => {
        if (type === "user"){
            if (users.length === 0) return undefined;
            const user = users.find((user: Employee) => user.id === id);
            return user ? user.image : undefined;
        }
        else{
            if (rooms.length === 0) return undefined;
            const room = rooms.find((room: Room) => room.id === id);
            return room? room.image : undefined;
        }
        
    };

    const getNameById = (id: number, type: "user" |"room"): string | null => {
        if (type === "user"){
            if (users.length === 0) return null;
            const user = users.find((user: Employee) => user.id === id);
            return user? user.name : null;
        }
        else{
            if (rooms.length === 0) return null;
            const room = rooms.find((room: Room) => room.id === id);
            return room? room.room_name : null;
        }
    };

    const getRoomNameById = (id: number): string | null => {
        if (rooms.length === 0) return null;
        const room = rooms.find((room: Room) => room.id === id);
        return room ? room.room_name : null;
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {paginatedBookings.map((booking: Booking) => (
                <Row key={booking.id} onClick={() => handleNavigate(booking.id)}>
                    <Td>
                        <Container>
                            <Image type="guest" src={getImageById(booking.user_id, "user")} />
                            <InfoContainer>
                                <p>{getNameById(booking.user_id, "user")}</p>
                                <TextLight>#{booking.user_id}</TextLight>
                            </InfoContainer>
                        </Container>
                    </Td>
                    <Td>                        
                        <Container>
                            <Image type="bookingRoom" src={getImageById(booking.room_id, "room")} />
                            <InfoContainer>
                                <p>{getNameById(booking.room_id, "room")}</p>
                                <TextLight>#{booking.room_id}</TextLight>
                            </InfoContainer>
                        </Container>     
                    </Td>  
                    <Td>
                        {formatDate(booking.order_date)}
                        <TextLight>Booking #{booking.id}</TextLight>
                    </Td>      
                    <Td>
                        <p>{formatDateHalf1(booking.check_in)}</p>
                        <GuestHour>{formatDateHalf2(booking.check_in)}</GuestHour>
                    </Td>
                    <Td>
                        <p>{formatDateHalf1(booking.check_out)}</p>
                        <GuestHour>{formatDateHalf2(booking.check_out)}</GuestHour>
                    </Td>
                    <Td>
                        <GuestNotes
                            active={booking.special_request !== ""}
                            disabled={!booking.special_request}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (booking.special_request) {
                                    toast.info(booking.special_request);
                                }
                            }}
                        >
                            View Notes
                        </GuestNotes>
                    </Td>
                    <Td>
                        <GuestStatus className={booking.status}>{booking.status}</GuestStatus>
                    </Td>
                </Row>
            ))}
        </>
    );
};