import { useNavigate } from "react-router-dom"
import { bookings } from "../../../data/bookings"
import { Table, Row, Th, Td, GuestContainer, InfoContainer, Image, Id, Hour, Notes, Status} from "./styles/bookingsListStyles"

export const BookingsListComponent = () => {
    const navigate = useNavigate()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true }
        let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)
        const day = date.getDate()
        const suffix =
            day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
            day % 10 === 3 && day !== 13 ? "rd" : "th";

        formattedDate = formattedDate.replace(
            /\b\d{1,2}\b/, 
            `${day}${suffix}`
        )
        return formattedDate
    }

    const handleGuestClick = (id) => {
        navigate(`/bookings/${id}`);
    };

    function formatDateHalf1(dateString) {
        const date = new Date(dateString)
        const options = { month: "short", day: "numeric", year: "numeric" }
        let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)
        const day = date.getDate()
        const suffix =
            day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
            day % 10 === 3 && day !== 13 ? "rd" : "th"
        formattedDate = formattedDate.replace(
            /\b\d{1,2}\b/, 
            `${day}${suffix}`
        )
        return formattedDate
    }
    function formatDateHalf2(dateString) {
        const date = new Date(dateString)
        const hours = date.getHours() % 12 || 12
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const ampm = date.getHours() >= 12 ? "PM" : "AM"
        return `${hours}.${minutes} ${ampm}`
    }

    return <Table>
        <thead>
            <Row type="head">
                <Th>Guest</Th>
                <Th>Order Date</Th>
                <Th>Check in</Th>
                <Th>Check out</Th>
                <Th>Special Request</Th>
                <Th>Room type</Th>
                <Th>Status</Th>
            </Row>
        </thead>
        <tbody>
            {bookings.map((b) => (
                <Row key={b.id} type="body">
                    <Td>
                        <GuestContainer onClick={() => handleGuestClick(b.id)}>
                            <Image src={b.image} alt={b.name} />
                            <InfoContainer>
                                <p>{b.name}</p>
                                <Id>#{b.id}</Id>
                            </InfoContainer>
                        </GuestContainer>
                    </Td>
                    <Td>
                        <p>{formatDate(b.order_date)}</p>
                    </Td>
                    <Td>
                        <p>{formatDateHalf1(b.check_in)}</p>
                        <Hour>{formatDateHalf2(b.check_in)}</Hour>
                    </Td>
                    <Td>
                        <p>{formatDateHalf1(b.check_out)}</p>
                        <Hour>{formatDateHalf2(b.check_out)}</Hour>
                    </Td>
                    <Td>
                        <Notes active={b.special_request} disabled={b.special_request ? false : true}>View Notes</Notes>
                    </Td>
                    <Td>{b.room_type}</Td>
                    <Td><Status type={b.status}>{b.status}</Status></Td>
                </Row>
            ))}
        </tbody>
    </Table>
}