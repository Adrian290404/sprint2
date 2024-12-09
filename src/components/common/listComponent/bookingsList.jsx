import { Row, Td, Container, Image, InfoContainer, TextLight, GuestHour, GuestNotes, GuestStatus } from "./styles/listStyles"
import { formatDate } from "./functions/formatDate"
import { formatDateHalf1 } from "./functions/formatDateHalf1"
import { formatDateHalf2 } from "./functions/formatDateHalf2"

export const BookingsList = ({ data, handleNavigate }) => {
    return (
        data.map((booking) => (
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