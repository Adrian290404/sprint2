import { Container, Button, Buttons, FormContainer, Icon, Input, Label, Select, TwoFields } from "../../common/styles/detailsFormStyles"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { updateBooking } from "../../../features/bookings/bookingsThunks"

export const BookingDetailsFormComponent = ({ checkIn: ci, checkOut: co, userId, roomId, id, orderDate, request, status }) => {
    
    const convertToDatetimeLocal = (dateString) => {
        const [datePart, timePart] = dateString.split(" ")
        const [month, day, year] = datePart.split("/")
        const [hours, minutes] = timePart.split(":")
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
    }

    const [checkIn, setCheckIn] = useState(convertToDatetimeLocal(ci))
    const [checkOut, setCheckOut] = useState(convertToDatetimeLocal(co))
    const [state, setState] = useState(status)
    const [selectedGuest, setSelectedGuest] = useState(userId)
    const [selectedRoom, setSelectedRoom] = useState(roomId)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const rooms = useSelector((state) => state.rooms.rooms)
    const roomsAlphabetic = [...rooms].sort((a, b) => a.room_name.localeCompare(b.room_name))
    const users = useSelector((state) => state.users.users)
    const usersAlphabetic = [...users].sort((a, b) => a.name.localeCompare(b.name))

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const handleChangeStatus = (e) => {
        setState(e.target.value)
    }



    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const checkIn = new Date(formData.get("checkIn"))
        const checkOut = new Date(formData.get("checkOut"))
        const currentDate = new Date()

        if (checkIn < currentDate) {
            setError("Check-In date cannot be in the past")
            return
        }
        if (checkOut <= checkIn) {
            setError("Check-Out date must be after Check-In date")
            return
        }

        const updatedBooking = {
            user_id: Number(selectedGuest),
            room_id: Number(selectedRoom),
            id: id,
            order_date: orderDate,
            check_in: formatDate(new Date(formData.get("checkIn"))),
            check_out: formatDate(new Date(formData.get("checkOut"))),
            special_request: request,
            status: state
        }
        dispatch(updateBooking(updatedBooking)).then(() => {
            navigate("/bookings")
        })
    }

    return <Container>
        <FormContainer>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <TwoFields>
                    <div>
                        <Label>Check In</Label>
                        <Input
                            id="checkIn"
                            name="checkIn"
                            type="datetime-local"
                            value={checkIn}
                            onChange={(e) => handleChange(e, setCheckIn)}
                        />                    
                    </div>
                    <div>
                        <Label>Check Out</Label>
                        <Input
                            id="checkOut"
                            name="checkOut"
                            type="datetime-local"
                            value={checkOut}
                            onChange={(e) => handleChange(e, setCheckOut)}
                        />                    
                    </div>
                </TwoFields>
                <TwoFields>
                    <div>
                        <Label>User</Label>
                        <Select
                            value={selectedGuest}
                            onChange={(e) => setSelectedGuest(e.target.value)}
                            required
                        >
                            {usersAlphabetic.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>         
                    </div>
                    <div>
                        <Label>Room</Label>
                        <Select
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            required
                        >
                            {roomsAlphabetic.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.room_name}
                                </option>
                            ))}
                        </Select>         
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Select $type={state} value={state} onChange={handleChangeStatus}>
                            <option value="Pending">Pending</option>
                            <option value="Booked">Booked</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Refund">Refund</option>
                        </Select>      
                    </div>
                </TwoFields>
                <Buttons>
                    <Button bookings type="submit">Save Changes</Button>
                </Buttons>
            </form>
        </FormContainer>
    </Container>
}