import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../features/bookings/bookingsThunks";
import { AppDispatch } from "../../../features/store";
import { Booking } from "../../../interfaces/booking";
import { toast } from "react-toastify";
import backGif from "../../../assets/back.gif";
import { Container, Content, Form, Agrupate, Column, Label, Input, Button, Title, GoBack, Select, TextArea, Error, Head, AutocompleteContainer, SuggestionsList } from "../../common/styles/createStyles";

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
    const [error, setError] = useState<string>("");

    const [searchUser, setSearchUser] = useState<string>("");
    const [searchRoom, setSearchRoom] = useState<string>("");
    const [selectedGuest, setSelectedGuest] = useState<number | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

    const [showUserSuggestions, setShowUserSuggestions] = useState<boolean>(false);
    const [showRoomSuggestions, setShowRoomSuggestions] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const bookings = useSelector((state: any) => state.bookings.bookings);
    const rooms = useSelector((state: any) => state.rooms.rooms);
    const users = useSelector((state: any) => state.users.users);

    const roomsAlphabetic: Room[] = [...rooms].sort((a, b) =>
        a.room_name.localeCompare(b.room_name)
    );
    const usersAlphabetic: User[] = [...users].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const filteredUsers = usersAlphabetic.filter((u) =>
        u.name.toLowerCase().startsWith(searchUser.toLowerCase())
    );
    const filteredRooms = roomsAlphabetic.filter((r) =>
        r.room_name.toLowerCase().startsWith(searchRoom.toLowerCase())
    );

    const newBookingId = (): number => {
        const Ids = bookings.map((booking: Booking) => booking.id).sort((a, b) => a - b);
        for (let i = 1; i <= Ids.length; i++) {
            if (!Ids.includes(i)) {
                return i;
            }
        }
        return Ids.length + 1;
    };

    const formatDate = (date: Date): string => date.toISOString();

    const goBack = (): void => {
        navigate(-1);
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        setError("");

        if (selectedGuest === null || selectedRoom === null) {
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

        const specialRequest = (formData.get("notes") as string) || "";

        const newBooking: Booking = {
            user_id: selectedGuest,
            room_id: selectedRoom,
            id: newBookingId(),
            order_date: formatDate(new Date()),
            check_in: formatDate(checkIn),
            check_out: formatDate(checkOut),
            special_request: specialRequest,
            status: status
        };

        try {
            await dispatch(createBooking(newBooking));
            toast.success("Booking created successfully");
            await navigate(`/bookings/${newBooking.id}`);
        } 
        catch (error) {
            setError("Error creating booking. Please try again later.");
            console.error("Error creating booking:", error);
        }
    };

    return (
        <Container>
            <Content>
                <Head>
                    <GoBack onClick={goBack}>
                        <img src={backGif} width={40} alt="Go Back" />
                    </GoBack>
                    <Title>Create New Booking</Title>
                </Head>

                <Form onSubmit={handleSubmit}>
                    {error && <Error>{error}</Error>}
                    <Agrupate>
                        <Column>
                            <Label>Booking ID</Label>
                            <Input type="text" name="id" disabled value={newBookingId()} />
                        </Column>
                        <Column>
                            <Label>Status</Label>
                            <Select create value={status} onChange={(e) => setStatus(e.target.value)}>
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
                            <AutocompleteContainer>
                                <Input
                                    type="text"
                                    value={searchUser}
                                    onChange={(e) => {
                                        setSearchUser(e.target.value);
                                        setShowUserSuggestions(true);
                                    }}
                                    onFocus={() => setShowUserSuggestions(true)}
                                    onBlur={() => {
                                        setTimeout(() => setShowUserSuggestions(false), 200);
                                    }}
                                    placeholder="Search user..."
                                    required
                                />
                                {showUserSuggestions && filteredUsers.length > 0 && (
                                    <SuggestionsList>
                                        {filteredUsers.map((u: User) => (
                                        <li
                                            key={u.id}
                                            onClick={() => {
                                            setSearchUser(u.name);
                                            setSelectedGuest(u.id);
                                            setShowUserSuggestions(false);
                                            }}
                                        >
                                            {u.name}
                                        </li>
                                        ))}
                                    </SuggestionsList>
                                )}
                            </AutocompleteContainer>
                        </Column>
                        <Column>
                            <Label>Room</Label>
                            <AutocompleteContainer>
                                <Input
                                    type="text"
                                    value={searchRoom}
                                    onChange={(e) => {
                                        setSearchRoom(e.target.value);
                                        setShowRoomSuggestions(true);
                                    }}
                                    onFocus={() => setShowRoomSuggestions(true)}
                                    onBlur={() => {
                                        setTimeout(() => setShowRoomSuggestions(false), 200);
                                    }}
                                    placeholder="Search room..."
                                    required
                                />
                                {showRoomSuggestions && filteredRooms.length > 0 && (
                                    <SuggestionsList>
                                        {filteredRooms.map((r: Room) => (
                                        <li
                                            key={r.id}
                                            onClick={() => {
                                            setSearchRoom(r.room_name);
                                            setSelectedRoom(r.id);
                                            setShowRoomSuggestions(false);
                                            }}
                                        >
                                            {r.room_name}
                                        </li>
                                        ))}
                                    </SuggestionsList>
                                )}
                            </AutocompleteContainer>
                        </Column>
                    </Agrupate>
                    <Label>Special Request</Label>
                    <TextArea name="notes" placeholder="Notes..." />
                    <Button type="submit">Create Booking</Button>
                </Form>
            </Content>
        </Container>
    );
};