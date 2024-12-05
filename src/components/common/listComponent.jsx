import { useNavigate, useLocation } from "react-router-dom"
import { bookings } from "../../data/bookings"
import { rooms } from "../../data/rooms"
import { employees } from "../../data/employees"
import { Table, Row, Th, Td, Container, InfoContainer, Image, TextLight, GuestHour, GuestNotes, GuestStatus, RoomPrice, RoomLittleText, RoomStatus, ConciergeStatus } from "./styles/listStyles"
import { FaPhoneAlt } from "react-icons/fa";

export const ListComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const json = {
        "/bookings": bookings,
        "/room": rooms,
        "/concierge": employees
    }

    const showHead = () => {
        switch (location.pathname) {
            case "/bookings":
                return ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"]
            case "/concierge":
                return ["Name", "Job Desk", "Schedule", "Contact", "Status"]
            case "/room" :
                 return ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", "Status"]
            default:
                return []
        }
    }

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

    const handleNavigate = (id) => {
        navigate(`${location.pathname}/${id}`)
    }

    const formatDateHalf1 = (dateString) => {
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

    const formatDateHalf2 = (dateString) => {
        const date = new Date(dateString)
        const hours = date.getHours() % 12 || 12
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const ampm = date.getHours() >= 12 ? "PM" : "AM"
        return `${hours}.${minutes} ${ampm}`
    }

    const isActive = (dateString) => {
        const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const [startDay, endDay] = dateString.split(", ").map(day => day.trim());
        const startIndex = weekDays.indexOf(startDay);
        const endIndex = weekDays.indexOf(endDay);
        const todayIndex = new Date().getDay()
        const normalizedTodayIndex = (todayIndex === 0) ? 6 : todayIndex - 1
        if (startIndex <= endIndex) {
            return normalizedTodayIndex >= startIndex && normalizedTodayIndex <= endIndex;
        } else {
            return normalizedTodayIndex >= startIndex || normalizedTodayIndex <= endIndex;
        }
    };

    return <Table>
        <thead>
            <Row type="head">
                {showHead().map((th, index) => (
                    <Th key={index}>
                        {th}
                    </Th>
                ))}
            </Row>
        </thead>
        <tbody>
            {(json[location.pathname]).map((data) => {
                if (location.pathname === "/bookings") {
                    return (
                        <Row key={data.id} type="body">
                            <Td>
                                <Container onClick={() => handleNavigate(data.id)}>
                                    <Image type="guest" src={data.image} alt={data.name} />
                                    <InfoContainer>
                                        <p>{data.name}</p>
                                        <TextLight>#{data.id}</TextLight>
                                    </InfoContainer>
                                </Container>
                            </Td>
                            <Td top>
                                {formatDate(data.order_date)}
                            </Td>
                            <Td>
                                <p>{formatDateHalf1(data.check_in)}</p>
                                <GuestHour>{formatDateHalf2(data.check_in)}</GuestHour>
                            </Td>
                            <Td>
                                <p>{formatDateHalf1(data.check_out)}</p>
                                <GuestHour>{formatDateHalf2(data.check_out)}</GuestHour>
                            </Td>
                            <Td>
                                <GuestNotes active={data.special_request} disabled={!data.special_request}>View Notes</GuestNotes>
                            </Td>
                            <Td top>
                                {data.room_type}
                            </Td>
                            <Td>
                                <GuestStatus type={data.status}>{data.status}</GuestStatus>
                            </Td>
                        </Row>
                    )
                }

                if (location.pathname === "/room") {
                    return (
                        <Row key={data.id} type="body">
                            <Td>
                                <Container onClick={() => handleNavigate(data.id)}>
                                    <Image type="room" src={data.image} alt={data.room_name} />
                                    <InfoContainer>
                                        <TextLight type="room">#{data.id}</TextLight>
                                        <p>{data.room_name}</p>
                                    </InfoContainer>
                                </Container>
                            </Td>
                            <Td>
                                {data.bed_type}
                            </Td>
                            <Td>
                                {data.room_floor}
                            </Td>
                            <Td>
                                {data.facilities}
                            </Td>
                            <Td>
                                <RoomPrice>${data.rate}</RoomPrice>
                                <RoomLittleText> /night</RoomLittleText>
                            </Td>
                            <Td>
                                <RoomStatus avaiable={data.avaiable}>{data.avaiable ? "Avaiable" : "Booked"}</RoomStatus>
                            </Td>
                        </Row>
                    )
                }

                if (location.pathname === "/concierge") {
                    return (
                        <Row key={data.id} type="body">
                            <Td>
                                <Container onClick={() => handleNavigate(data.id)}>
                                    <Image type="employee" src={data.image} alt={data.name} />
                                    <InfoContainer>
                                        <p>{data.name}</p>
                                        <TextLight type="employee">#{data.id}</TextLight>
                                        <TextLight>{formatDateHalf1(data.join)}</TextLight>
                                    </InfoContainer>
                                </Container>
                            </Td>
                            <Td>
                                {data.job_desk}
                            </Td>
                            <Td>
                                {data.schedule}
                            </Td>
                            <Td>
                                <FaPhoneAlt /> {data.contact}
                            </Td>
                            <Td>
                                <ConciergeStatus active={isActive(data.schedule)}>{isActive(data.schedule) ? "Active" : "Inactive"}</ConciergeStatus>
                            </Td>
                        </Row>
                    )
                }
            })}
        </tbody>
    </Table>
}