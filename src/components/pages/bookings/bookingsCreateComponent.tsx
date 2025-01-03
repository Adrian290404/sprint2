import { useState, FormEvent, ChangeEvent } from 'react';
import { Container, Content, Form, Agrupate, Column, Label, Input, Button, Title, GoBack, Select, Textarea, Error } from '../../common/styles/createStyles';
import { TiBackspaceOutline } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBooking } from "../../../features/bookings/bookingsThunks";
import { AppDispatch } from '../../../features/store';
import { Booking } from '../../../interfaces/booking';

interface User {
    id: number;
    name: string;
}

interface Room {
    id: number;
    room_name: string;
}

export const BookingsCreateComponent: React.FC = () => {
    const [status, setStatus] = useState<string>("Pending");
    const [selectedGuest, setSelectedGuest] = useState<string>("default");
    const [selectedRoom, setSelectedRoom] = useState<string>("default");
    const [error, setError] = useState<string>("");
    
    const dispatch = useDispatch<AppDispatch>();
    const bookings = useSelector((state: any) => state.bookings.bookings);
    const rooms = useSelector((state: any) => state.rooms.rooms);
    const roomsAlphabetic = [...rooms].sort((a: Room, b: Room) => a.room_name.localeCompare(b.room_name));
    const users = useSelector((state: any) => state.users.users);
    const usersAlphabetic = [...users].sort((a: User, b: User) => a.name.localeCompare(b.name));
    const navigate = useNavigate();

    const newBookingId = (): number => {
        let minId = 1;
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].id === minId) {
                minId = bookings[i].id + 1;
            }
        }
        return minId;
    };

    const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>): void => {
        setStatus(e.target.value);
    };

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}`;
    };

    const goBack = (): void => {
        navigate(-1);
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setError("");

        if (selectedGuest === "default" || selectedRoom === "default") {
            setError("Please select a valid Guest and Room.");
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);
        const checkIn = new Date(formData.get("checkIn") as string);
        const checkOut = new Date(formData.get("checkOut") as string);
        const currentDate = new Date();

        if (checkIn < currentDate) {
            setError("Check-In date cannot be in the past.");
            return;
        }

        if (checkOut <= checkIn) {
            setError("Check-Out date must be after Check-In date.");
            return;
        }

        const specialRequest = formData.get("notes") as string;

        const newBooking: Booking = {
            user_id: parseInt(selectedGuest),
            room_id: parseInt(selectedRoom),
            id: newBookingId(),
            order_date: formatDate(new Date()),
            check_in: formatDate(checkIn),
            check_out: formatDate(checkOut),
            special_request: specialRequest,
            status: status
        };

        dispatch(createBooking(newBooking));
        navigate(`/bookings/${newBookingId()}`);
    };

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
                            <Select value={status} onChange={handleChangeStatus}>
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
                                    <option key={user.id} value={user.id.toString()}>
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
                                    <option key={room.id} value={room.id.toString()}>
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
    );
};