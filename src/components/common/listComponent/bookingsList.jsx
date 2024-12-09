import { Row, Td, Container, Image, InfoContainer, TextLight, GuestHour, GuestNotes, GuestStatus } from "./styles/listStyles"

export const BookingsList = ({ data, handleNavigate }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString)

        const day = date.getDate()
        const suffix =
          day % 10 === 1 && day !== 11 ? "st" :
          day % 10 === 2 && day !== 12 ? "nd" :
          day % 10 === 3 && day !== 13 ? "rd" : "th"
      
        const month = date.toLocaleString("en-US", { month: "short" })
        const year = date.getFullYear()
        const zero = (date.getHours() <= 9 || (date.getHours() <= 21 && date.getHours() >= 13)) ? "0" : ""
        const hours = zero + date.getHours() % 12 || 12
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const ampm = date.getHours() >= 12 ? "PM" : "AM"

        return `${month} ${day}${suffix} ${year} ${hours}:${minutes} ${ampm}`
    }

    const formatDateHalf1 = (dateString) => {
        const date = new Date(dateString)
        const options = { month: "short", day: "numeric", year: "numeric" }
        return new Intl.DateTimeFormat("en-US", options).format(date)
    }

    const formatDateHalf2 = (dateString) => {
        const date = new Date(dateString)
        const hours = date.getHours() % 12 || 12
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const ampm = date.getHours() >= 12 ? "PM" : "AM"
        return `${hours}:${minutes} ${ampm}`
    }

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