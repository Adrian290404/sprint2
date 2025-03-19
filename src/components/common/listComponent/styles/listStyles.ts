import styled from "styled-components";

interface RowProps {
    th?: boolean;
}
interface TdProps {
    top?: boolean;
};
interface ImageProps {
    type?: "guest" | "bookingRoom" | "room" | "employee";
};
interface TextLightProps {
    type?: "room" | "employee";
};
interface GuestNotesProps {
    active?: boolean;
};
interface GuestStatusProps {
    type?: "Refund" | "Booked" | "Pending" | "Cancelled";
};
interface RoomStatusProps {
    avaiable?: boolean;
};
interface ConciergeStatusProps {
    active?: boolean;
};
interface ActionProps {
    publish?: boolean;
    archive?: boolean;
};

// GENERAL
export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.3s ease;
    border-radius: 0.7em;
`;
export const Row = styled.tr<RowProps>`
    text-align: left;
    border: none;
    &.body{
        border-top: 2px solid ${({ theme }) => theme.pageContent};;
    }
    &:hover{
        ${(props) => (props.th ? "" : "background-color:rgb(226, 226, 226); cursor: pointer;")}
    }
`;
export const Th = styled.th`
    padding: 1em;
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
    font-size: 1rem;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    border-bottom: 3px solid #BEAD8E;
`;
export const Td = styled.td<TdProps>`
    padding: 1em;
    color: ${({ theme }) => theme.paginationText};
    transition: color 0.3s ease;
    font-size: 1rem;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
    vertical-align: ${(props) => (props.top ? "top" : "middle")};
`;
export const Container = styled.div`
    display: flex;
    font-weight: 500;
    align-items: center;
`;
export const InfoContainer = styled.div`
    margin-left: 1em;
    width: 50%;
`;
export const Image = styled.img<ImageProps>`
    border-radius: 1em;
    ${(props) => props.type === "guest" && "width: 45px; height: 45px"};
    ${(props) => props.type === "bookingRoom" && "width: 85px; height: 45px"};
    ${(props) => props.type === "room" && "width: 150px; height: 77px"};
    ${(props) => props.type === "employee" && "width: 88px; height: 88px"};
    object-fit: cover;
    box-sizing: border-box;
`;
export const TextLight = styled.p<TextLightProps>`
    color: ${({ theme }) => theme.sideMenuOptionsInactive};
    transition: color 0.3s ease;
    font-size: 0.875rem;
    font-weight: 300;
    ${(props) => props.type === "room" && "margin-bottom: .5em"};
    ${(props) => props.type === "employee" && "margin: .5em 0"};
`;

// BOOKINGS LIST
export const GuestHour = styled.p`
    font-size: 0.875rem;
    font-weight: 300;
`;
export const GuestNotes = styled.button<GuestNotesProps>`
    width: 80%;
    padding: 0.6em;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    border-radius: 1em;
    
    ${({ active, theme }) =>
        active
            ? `
                cursor: pointer;
                background-color: ${theme.bookingListNotes};
                color: ${theme.bookingInfoColor};
                border: none;
            `
            : `
                border: 1px solid ${theme.bookingID};
                color: ${theme.bookingID};
            `}
    transition: color 0.3s ease, background-color 0.3 ease;
`;

export const GuestStatus = styled.button<GuestStatusProps>`
    width: 100%;
    padding: 0.6em;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    border-radius: 1em;
    border: none;
    text-align: center;

    &.Refund {
        color: ${({ theme }) => theme.formRefundColor}; 
        background-color: ${({ theme }) => theme.formRefundBgColor};
    }

    &.Booked {
        color: ${({ theme }) => theme.formBookedColor}; 
        background-color: ${({ theme }) => theme.formBookedBgColor};
    }

    &.Pending {
        color: ${({ theme }) => theme.formPendingColor}; 
        background-color: ${({ theme }) => theme.formPendingBgColor};
    }

    &.Cancelled {
        color: ${({ theme }) => theme.formCancelledColor}; 
        background-color: ${({ theme }) => theme.formCancelledBgColor};
    }

    transition: color 0.3s ease, background-color 0.3s ease;
`;

// ROOMS LIST
export const RoomId = styled.p`
    color: ${({ theme }) => theme.bookingId};
    transition: color 0.3s ease;
    font-size: 0.875rem;
    font-weight: 300;
    margin-bottom: 0.5em;
`;
export const RoomPrice = styled.p`
    display: inline;
    color: ${({ theme }) => theme.bookingInfoColor};
    transition: color 0.3s ease;
    font-weight: 600;
`;
export const RoomLittleText = styled.p`
    display: inline;
    color: ${({ theme }) => theme.sideMenuOptionsInactive};
    transition: color 0.3s ease;
    font-size: 0.875rem;
`;
export const RoomStatus = styled.button<RoomStatusProps>`
    width: 100%;
    padding: 0.6em;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    border-radius: 1em;
    border: none;
    color: ${({ theme }) => theme.background};
    background-color: ${(props) => (props.avaiable ? props.theme.checkIcon : props.theme.sideMenuOptionsActive)};
    transition: color 0.3s ease, background-color 0.3s ease;
`;

// EMPLOYEES LIST
export const ConciergeStatus = styled.p<ConciergeStatusProps>`
    width: 100%;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    border: none;
    background: transparent;
    color: ${(props) => (props.active ? props.theme.checkIcon : props.theme.sideMenuOptionsActive)};
    transition: color 0.3s ease;
`;

// REVIEWS LIST
export const Rating = styled.div`
    color: ${({ theme }) => theme.pageInformation};
    transition: color 0.3s ease;
    margin-bottom: 1em;
`;
export const Action = styled.button<ActionProps>`
    display: inline;
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 1rem;
    margin-right: 3em;
    ${(props) => props.publish && `color: ${props.theme.checkIcon}`};
    ${(props) => props.archive && `color: ${props.theme.kpiIcon}`};
    transition: color 0.3s ease;
`;