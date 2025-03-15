import { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../../features/bookings/bookingsThunks";
import { Container, Button, Buttons, FormContainer, Input, Label, FormField, TextArea, AutocompleteContainer, SuggestionsList, Select, Error } from "../../common/styles/detailsFormStyles";
import { AppDispatch } from "../../../features/store";
import { Booking } from "../../../interfaces/booking";
import { toast } from "react-toastify";
import { fetchRooms } from "../../../features/rooms/roomsThunks";
import { fetchUsers } from "../../../features/users/usersThunks";
import { GiSave } from "react-icons/gi";

export const BookingDetailsFormComponent: FC<Booking> = ({check_in, check_out, user_id, room_id, id, order_date, special_request, status}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const rooms = useSelector((state: any) => state.rooms.rooms);
    const users = useSelector((state: any) => state.users.users);

    const convertToDatetimeLocal = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    const [checkIn, setCheckIn] = useState<string>(convertToDatetimeLocal(check_in));
    const [checkOut, setCheckOut] = useState<string>(convertToDatetimeLocal(check_out));
    
    const [request, setRequest] = useState<string>(special_request || "");
    const [state, setState] = useState<string>(status);
    
    const [selectedGuest, setSelectedGuest] = useState<number>(user_id);
    const [selectedRoom, setSelectedRoom] = useState<number>(room_id);

    const [searchUser, setSearchUser] = useState<string>(
        users.find((u: any) => u.id === user_id)?.name || ""
    );
    const [searchRoom, setSearchRoom] = useState<string>(
        rooms.find((r: any) => r.id === room_id)?.room_name || ""
    );

    useEffect(() => {
        dispatch(fetchRooms());
        dispatch(fetchUsers());
    }, [dispatch]);

    const [showUserSuggestions, setShowUserSuggestions] = useState<boolean>(false);
    const [showRoomSuggestions, setShowRoomSuggestions] = useState<boolean>(false);

    const filteredUsers = users.filter((u: any) =>
        u.name.toLowerCase().startsWith(searchUser.toLowerCase())
    );
    const filteredRooms = rooms.filter((r: any) =>
        r.room_name.toLowerCase().startsWith(searchRoom.toLowerCase())
    );

    const [error, setError] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const currentDate = new Date();

        if (checkInDate < currentDate) {
            setError("Check-In date cannot be in the past");
            return;
        }
        if (checkOutDate <= checkInDate) {
            setError("Check-Out date must be after Check-In date");
            return;
        }

        const updatedBooking = {
            user_id: selectedGuest,
            room_id: selectedRoom,
            id,
            order_date,
            check_in: checkIn,
            check_out: checkOut,
            special_request: request,
            status: state
        };

        dispatch(updateBooking(updatedBooking)).then(() => {
            toast.success("Booking updated successfully");
            navigate("/bookings");
        });
    };

    return (
        <Container>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    {error && <Error>{error}</Error>}
                    <FormField>
                        <Label>Check In</Label>
                        <Input
                            type="datetime-local"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label>Check Out</Label>
                        <Input
                            type="datetime-local"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label>User</Label>
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
                        />
                        {showUserSuggestions && filteredUsers.length > 0 && (
                            <SuggestionsList>
                                {filteredUsers.map((u: any) => (
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
                    </FormField>
                    <FormField>
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
                        />
                            {showRoomSuggestions && filteredRooms.length > 0 && (
                                <SuggestionsList>
                                    {filteredRooms.map((r: any) => (
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
                    </FormField>
                    <FormField>
                        <Label>Status</Label>
                        <Select 
                            className={state} 
                            value={state} 
                            onChange={(e) => setState(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Booked">Booked</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Refund">Refund</option>
                        </Select>
                    </FormField>
                    <FormField>
                        <Label>Special Request</Label>
                        <TextArea
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                        />
                    </FormField>
                    <Buttons>
                        <Button type="submit"><GiSave size={20} />Save Changes</Button>
                    </Buttons>
                </form>
            </FormContainer>
        </Container>
    );
};