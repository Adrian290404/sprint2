import { Container, Content, Form, Agrupate, Column, Label, Input, Button, Title, GoBack, Select, Textarea, Error } from '../../common/styles/createStyles.js'
import { TiBackspaceOutline } from "react-icons/ti"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBooking } from "../../../features/bookings/bookingsThunks"
import { useState } from 'react'

export const BookingsCreateComponent = () => {
    const [status, setStatus] = useState("Pending")
    const [selectedGuest, setSelectedGuest] = useState("default")
    const [selectedRoom, setSelectedRoom] = useState("default")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const bookings = useSelector((state) => state.bookings.bookings)
    const rooms = useSelector((state) => state.rooms.rooms)
    const roomsAlphabetic = [...rooms].sort((a, b) => a.room_name.localeCompare(b.room_name))
    const users = useSelector((state) => state.users.users)
    const usersAlphabetic = [...users].sort((a, b) => a.name.localeCompare(b.name))
    const navigate = useNavigate()

    const newBookingId = () => {
        let minId = 1
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].id === minId) {
                minId = bookings[i].id + 1
            }
        }
        return minId
    }

    const handleChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}`;
    }

    const goBack = () => {
        navigate(-1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (selectedGuest === "default" || selectedRoom === "default") {
            setError("Please select a valid Guest and Room.")
            return
        }

        const formData = new FormData(e.target)
        const checkIn = new Date(formData.get("checkIn"))
        const checkOut = new Date(formData.get("checkOut"))
        const currentDate = new Date()

        if (checkIn < currentDate) {
            setError("Check-In date cannot be in the past.")
            return
        }

        if (checkOut <= checkIn) {
            setError("Check-Out date must be after Check-In date.")
            return
        }

        const specialRequest = formData.get("notes")

        const newBooking = {
            user_id: parseInt(selectedGuest),
            room_id: parseInt(selectedRoom),
            id: newBookingId(),
            order_date: formatDate(new Date()),
            check_in: formatDate(new Date(checkIn)),
            check_out: formatDate(new Date(checkOut)),
            special_request: specialRequest.trim() !== "",
            status: status
        }

        dispatch(createBooking(newBooking))
        navigate(`/bookings/${newBookingId()}`)
    }

    return (
        <Container>
            <Content>
                <GoBack onClick={goBack}>
                    <TiBackspaceOutline size={30} />
                </GoBack>
                <Title>Create New Booking</Title>
                <Form onSubmit={handleSubmit}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <Agrupate>
                        <Column>
                            <Label>Booking ID</Label>
                            <Input type="text" name="id" disabled value={newBookingId()} />
                        </Column>
                        <Column>
                            <Select $type={status} value={status} onChange={handleChangeStatus}>
                                <option value="Pending">Pending</option>
                                <option value="Booked">Booked</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Refund">Refund</option>
                            </Select>
                        </Column>
                    </Agrupate>
                    <Agrupate>
                        <Column>
                            <Label>Check In</Label>
                            <Input type="datetime-local" name="checkIn" required />
                        </Column>
                        <Column>
                            <Label>Check Out</Label>
                            <Input type="datetime-local" name="checkOut" required />
                        </Column>
                    </Agrupate>
                    <Agrupate>
                        <Column>
                            <Label>Guest</Label>
                            <Select
                                value={selectedGuest}
                                onChange={(e) => setSelectedGuest(e.target.value)}
                                required
                            >
                                <option value="default">-- Select --</option>
                                {usersAlphabetic.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </Select>
                        </Column>
                        <Column>
                            <Label>Room</Label>
                            <Select
                                value={selectedRoom}
                                onChange={(e) => setSelectedRoom(e.target.value)}
                                required
                            >
                                <option value="default">-- Select --</option>
                                {roomsAlphabetic.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.room_name}
                                    </option>
                                ))}
                            </Select>
                        </Column>
                    </Agrupate>
                    <Textarea name="notes" placeholder="Notes..." />
                    <Button type="submit">Create Booking</Button>
                </Form>
            </Content>
        </Container>
    )
}