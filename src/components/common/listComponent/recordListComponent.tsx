import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { fetchNotifications } from "../../../features/notifications/notificationsThunks";
import { StyledTable, StyledThead, StyledTr, StyledTh, StyledTd, StyledButton, Read } from "./styles/recordComponentStyles";
import { Notification } from "../../../interfaces/notification";
import { filterNotifications } from "./functions/filterNotifications";
import { paginateData } from "./functions/paginateData";

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
                                    {notification.type}
                                </StyledTd>
                                <StyledTd>{notification.collection}</StyledTd>
                                <StyledTd>{notification.details.message}</StyledTd>
                                <StyledTd>{new Date(notification.timestamp).toLocaleString()}</StyledTd>
                                <StyledTd>
                                    <StyledButton>Button</StyledButton>
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