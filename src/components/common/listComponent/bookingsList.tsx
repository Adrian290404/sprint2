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

interface BookingsListProps {
    currentPage: number;
    handleNavigate: (id: number) => void;
}

interface User {
    id: number;
    name: string;
    image: string;
}

interface Room {
    id: number;
    room_name: string;
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

    const getImageById = (id: number): string | null => {
        if (users.length === 0) return null;
        const user = users.find((user: User) => user.id === id);
        return user ? user.image : null;
    };

    const getUserNameById = (id: number): string | null => {
        if (users.length === 0) return null;
        const user = users.find((user: User) => user.id === id);
        return user ? user.name : null;
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
                <Row key={booking.id} type="body">
                    <Td>
                        <Container onClick={() => handleNavigate(booking.id)}>
                            <Image type="guest" src={getImageById(booking.user_id)} />
                            <InfoContainer>
                                <p>{getUserNameById(booking.user_id)}</p>
                                <TextLight>#{booking.id}</TextLight>
                            </InfoContainer>
                        </Container>
                    </Td>
                    <Td top>{formatDate(booking.order_date)}</Td>
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
                            onClick={() => {
                                if (booking.special_request) {
                                    alert(booking.special_request);
                                }
                            }}
                        >
                            View Notes
                        </GuestNotes>
                    </Td>
                    <Td top>{getRoomNameById(booking.room_id)}</Td>
                    <Td>
                        <GuestStatus type={booking.status}>{booking.status}</GuestStatus>
                    </Td>
                </Row>
            ))}
        </>
    );
};