import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

interface ListComponentProps {
    currentPage: number;
}

export const RecordListComponent: React.FC<ListComponentProps> = ({ currentPage }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { notifications, loading, error } = useSelector((state: RootState) => state.notifications);
    const { selectedMenu, selectedOption } = useSelector((state: any) => state.filter);

    const filteredNotifications = filterNotifications(notifications, selectedMenu, selectedOption);
    const paginatedNotifications = paginateData(
        filteredNotifications.filter((notification): notification is Notification => notification !== undefined && notification !== null),
        10
    )[currentPage - 1] || [];

    useEffect(() => {
        dispatch(fetchNotifications());
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
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const singular = (str: string) => str.slice(0, -1)

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
                                    {((notification.collection === "bookings" && notification.type !== "delete") || 
                                    (notification.type !== "delete" && notification.collection !== "bookings")) && (
                                        <StyledButton>
                                            View {singular(notification.collection)}
                                            <FaRegEye size="20" />
                                        </StyledButton>
                                    )}

                                    {(notification.collection !== "bookings" && notification.type === "delete") && (
                                        <StyledButton type="remake">
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