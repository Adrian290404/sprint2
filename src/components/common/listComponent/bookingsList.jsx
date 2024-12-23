import { Row, Td, Container, Image, InfoContainer, TextLight, GuestHour, GuestNotes, GuestStatus } from "./styles/listStyles"
import { formatDate } from "./functions/formatDate"
import { formatDateHalf1 } from "./functions/formatDateHalf1"
import { formatDateHalf2 } from "./functions/formatDateHalf2"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchBookings } from "../../../features/bookings/bookingsThunks"
import { paginateData } from "./functions/paginateData"
import { filterBookings } from "./functions/filterBookings"

export const BookingsList = ({ currentPage, handleNavigate }) => {
    const dispatch = useDispatch()
    const bookings = useSelector((state) => state.bookings.bookings)
    const { selectedMenu, selectedOption } = useSelector((state) => state.filter)

    const filteredBookings = filterBookings(bookings, selectedMenu, selectedOption)
    const paginatedBookings = paginateData(filteredBookings, 10)[currentPage - 1] || []

    useEffect(() => {
        if (bookings.length === 0) {
            dispatch(fetchBookings())
        }
    }, [dispatch, bookings.length])

    return (
        paginatedBookings.map((booking) => (
            <Row key={booking.id} type="body">
                <Td>
                    <Container onClick={() => handleNavigate(booking.id)}>
                        <Image type="guest" src={booking.image} alt={booking.name} />
                            <InfoContainer>
                                <p>{booking.name}</p>
                                <TextLight>#{booking.id}</TextLight>
                            </InfoContainer>
                    </Container>
                </Td>
                <Td top>
                    {formatDate(booking.order_date)}
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
                    <GuestNotes active={booking.special_request} disabled={!booking.special_request}>
                        View Notes
                    </GuestNotes>
                </Td>
                <Td top>
                    {booking.room_type}
                </Td>
                <Td>
                    <GuestStatus type={booking.status}>{booking.status}</GuestStatus>
                </Td>
            </Row>
        ))
    )
}