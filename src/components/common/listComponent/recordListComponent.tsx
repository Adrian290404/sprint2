import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from "../../../features/store";
import { fetchNotifications, markAllAsRead } from "../../../features/notifications/notificationsThunks";
import { StyledTable, StyledThead, StyledTr, StyledTh, StyledTd, StyledButton, Read, TextAndIcons } from "./styles/recordComponentStyles";
import { Notification } from "../../../interfaces/notification";
import { filterNotifications } from "./functions/filterNotifications";
import { paginateData } from "./functions/paginateData";
import { GiHouseKeys } from "react-icons/gi";
import { TbCalendarCheck } from "react-icons/tb";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { CgRedo } from "react-icons/cg";
import { fetchRooms } from "../../../features/rooms/roomsThunks";
import { fetchUsers } from "../../../features/users/usersThunks";
import { fetchBookings } from "../../../features/bookings/bookingsThunks";
import { toast } from "react-toastify";

interface ListComponentProps {
    currentPage: number;
}

export const RecordListComponent: React.FC<ListComponentProps> = ({ currentPage }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const room = useSelector((state: RootState) => state.rooms.room);
    const rooms = useSelector((state: RootState) => state.rooms.rooms);
    const users = useSelector((state: RootState) => state.users.users);
    const bookings = useSelector((state: RootState) => state.bookings.bookings);
    const { notifications, loading, error } = useSelector((state: RootState) => state.notifications);
    const { selectedMenu, selectedOption } = useSelector((state: any) => state.filter);

    const filteredNotifications = filterNotifications(notifications, selectedMenu, selectedOption);
    const paginatedNotifications = paginateData(
        filteredNotifications.filter((notification): notification is Notification => notification !== undefined && notification !== null),
        10
    )[currentPage - 1] || [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchNotifications());
                await dispatch(fetchRooms());
                await dispatch(fetchUsers());
                await dispatch(fetchBookings());
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        return () => {
            const markAndFetch = async () => {
                await dispatch(markAllAsRead());
                await dispatch(fetchNotifications());
            };
            markAndFetch();
        };
    }, [dispatch]);
    
    const firstUpperCase = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const singular = (str: string) => str.slice(0, -1);

    const handleRemake = async (collection: string, json: any) => {
        if (collection === "rooms") {
            const roomFound = rooms.find((room) => 
                room.room_name === json.room_name &&
                room.bed_type === json.bed_type &&
                room.room_floor === json.room_floor &&
                room.facilities === json.facilities
            );
            if (!roomFound) {
                navigate("/room/create", {
                    state: { roomData: json }
                });
            }
            else {
                const id = roomFound.id;
                toast.warn(`Room with same details already exists in the system. ID: ${id}`);
                return;
            }
        }
        else {
            const userFound = users.find((user) => 
                user.name === json.name &&
                user.image === json.image &&
                user.job_desk === json.job_desk &&
                user.schedule === json.schedule &&
                user.contact === json.contact
            );
            if (!userFound) {
                navigate("/users/create", {
                    state: { employeeData: json }
                });
            } 
            else {
                const id = userFound.id;
                toast.warn(`Employee with same details already exists in the system. ID: ${id}`);
                return;
            }
        }
    };
    
    const handleNavigate = (collection: string, id: number) => {
        if (collection === "rooms") {
            const roomExists = rooms.some(room => room.id === id);
            if (!roomExists) {
                toast.error(`Room with id ${id} not found`);
                return;
            }
            navigate(`/room/${id}`);
        } 
        else if (collection === "employees") {
            const employeeExists = users.some(user => user.id === id);
            if (!employeeExists) {
                toast.error(`Employee with id ${id} not found`);
                return;
            }
            navigate(`/users/${id}`);
        }
        else if (collection === "bookings") {
            const bookingExists = bookings.some(booking => booking.id === id);
            if (!bookingExists) {
                toast.error(`Booking with id ${id} not found`);
                return;
            }
            navigate(`/bookings/${id}`);
        }
        else {
            return;
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <StyledTable>
                <StyledThead>
                    <tr>
                        <StyledTh>Type</StyledTh>
                        <StyledTh>Collection</StyledTh>
                        <StyledTh>Message</StyledTh>
                        <StyledTh>Date</StyledTh>
                        <StyledTh>Options</StyledTh>
                    </tr>
                </StyledThead>
                <tbody>
                    {paginatedNotifications.length > 0 ? (
                        paginatedNotifications.map((notification) => (
                            <StyledTr
                                key={notification.id}
                                unread={!notification.read}
                                type={notification.type}
                            >
                                <StyledTd>
                                    <Read show={notification.read}></Read>
                                    <TextAndIcons>
                                        {notification.type === "delete" ? (
                                            <MdDelete size="20" />
                                        ) : notification.type === "create" ? (
                                            <MdCreateNewFolder size="20" />
                                        ) : (
                                            <MdEdit size="20" />
                                        )}
                                        {firstUpperCase(notification.type)}
                                    </TextAndIcons>
                                </StyledTd>
                                <StyledTd>
                                    <TextAndIcons>
                                        {notification.collection === "bookings" ? (
                                            <TbCalendarCheck size="20" />
                                        ) : notification.collection === "rooms" ? (
                                            <GiHouseKeys size="20" />
                                        ) : (
                                            <IoPeopleCircleSharp size="20" />
                                        )}
                                        {firstUpperCase(notification.collection)}
                                    </TextAndIcons>
                                </StyledTd>
                                <StyledTd>{notification.details.message}</StyledTd>
                                <StyledTd>{new Date(notification.timestamp).toLocaleString()}</StyledTd>
                                <StyledTd>
                                    {notification.details.seeContent && 
                                    ((notification.collection === "bookings" && notification.type !== "delete") || 
                                    (notification.type !== "delete" && notification.collection !== "bookings")) && (
                                        <StyledButton onClick={() => handleNavigate(notification.collection, Number(notification.details.id))}>
                                            View {singular(notification.collection)}
                                            <FaRegEye size="20" />
                                        </StyledButton>
                                    )}

                                    {(notification.collection !== "bookings" && notification.type === "delete") && (
                                        <StyledButton type="remake" onClick={() => handleRemake(notification.collection, notification.details.redo)}>
                                            Remake {singular(notification.collection)}
                                            <CgRedo size="20" />
                                        </StyledButton>
                                    )}
                                </StyledTd>
                            </StyledTr>
                        ))
                    ) : (
                        <tr>
                            <StyledTd colSpan={5}>No hay notificaciones</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
        </div>
    );
};