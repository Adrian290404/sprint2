import styled from "styled-components";

interface InfoProps {
    room?: boolean;
}
interface RoomStatusProps {
    type: "Refund" | "Booked" | "Pending" | "Cancelled";
}
interface ActionProps {
    type: "back" | "edit" | "delete" | "user" | "room";
}
export const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.pageContent};
    transition: background-color 0.3s ease;
    padding: 2em;
`;
export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.3s ease;
    border-radius: 0.5em;
    box-shadow: 0px 16px 30px ${({ theme }) => theme.userInformationShadow};;
    font-family: "Poppins", sans-serif;
    width: 95%;
    margin: 0 auto;
`;
export const LeftSection = styled.div`
    flex: 1;
    padding: 2em 1em 2em 2em;
    position: relative;
`;
export const ProfileInfo = styled.div`
    display: flex;
    gap: 4em;
    margin-bottom: 1.5em;
`;
export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 0.5em;
`;
export const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
`;
export const Name = styled.h2`
    font-size: 1.8em;
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
`;
export const ID = styled.span`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.bookingID};;
    transition: color 0.3s ease;
    margin: 0.5em 0 3em 0;
`;
export const Icon = styled.div`
    color: ${({ theme }) => theme.bookingIconColor};
    border: 1px solid ${({ theme }) => theme.bookingIconBorder};
    display: inline-flex;
    padding: 0.7em;
    border-radius: 0.6em;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.bookingIconHoverBg};
        color: ${({ theme }) => theme.bookingIconHoverColor};
    }
`;
export const Button = styled.button`
    background-color: ${({ theme }) => theme.bookingButtonBg};
    color: ${({ theme }) => theme.bookingButtonColor};
    border: none;
    padding: 0.7em 1em;
    border-radius: 0.6em;
    cursor: pointer;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 1em;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.bookingButtonHoverBg};
        color: ${({ theme }) => theme.bookingButtonHoverColor};
    }
`;
export const Contact = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5em;
`;
export const InfoContainer = styled.div`
    width: 50%;
    font-size: 0.8rem;
`;
export const InfoTitle = styled.p`
    color: ${({ theme }) => theme.bookingInfoTitleColor};
    transition: color 0.3s ease;
    margin-bottom: 0.6em;
`;
export const Info = styled.p<InfoProps>`
    color: ${({ theme }) => theme.bookingInfoColor};
    transition: color 0.3s ease;
    font-weight: 500;
    font-size: ${(props) => (props.room ? "1.3rem" : "0.9rem")};
`;
export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
`;
export const Separator = styled.hr`
    background-color: #ebebeb;
    height: 0.1em;
    border: none;
    width: 100%;
    margin: 1.5em 0;
`;
export const Especificator = styled.span`
    color: ${({ theme }) => theme.bookingID};
    transition: color 0.3s ease;
    font-size: 0.7rem;
`;
export const RoomDetails = styled.div`
    font-size: 0.9rem;
    margin-top: 2em;
    color: ${({ theme }) => theme.bookingRoomDetailsColor};
    transition: color 0.3s ease;
`;
export const FacilitiesTitle = styled.p`
    color: ${({ theme }) => theme.bookingFacilitiesTitleColor};
    transition: color 0.3s ease;
    font-size: 0.8rem;
    margin-top: 2em;
`;
export const FacilityList = styled.ul`
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    margin-top: 1em;
`;
export const Element = styled.li`
    list-style-type: none;
    padding: 1em;
    background-color: ${({ theme }) => theme.bookingIconBorder};
    color: ${({ theme }) => theme.bookingButtonBg};
    border-radius: 0.6em;
    transition: background-color 0.3s ease, color 0.3s ease;
`;
export const RightSection = styled.div`
    flex: 1;
    border-radius: 0 0.5em 0.5em 0;
    overflow: hidden;
    position: relative;
`;
export const RoomContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
export const RoomImage = styled.img`
    width: 100%;
    height: 100%;
`;
export const RoomStatus = styled.p<RoomStatusProps>`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1rem;
    padding: 0.8em 1em;
    border-radius: 0 0.5em 0 0.5em;
    
    ${({ type, theme }) =>
        type === "Refund" &&
        `
            color: ${theme.formRefundColor};
            background-color: ${theme.formRefundBgColor};
            box-shadow: 0 4px 8px rgba(226, 52, 40, 0.3);
        `}
    
    ${({ type, theme }) =>
        type === "Booked" &&
        `
            color: ${theme.formBookedColor};
            background-color: ${theme.formBookedBgColor};
            box-shadow: 0 4px 8px rgba(90, 208, 122, 0.3);
        `}
    
    ${({ type, theme }) =>
        type === "Pending" &&
        `
            color: ${theme.formPendingColor};
            background-color: ${theme.formPendingBgColor};
            box-shadow: 0 4px 8px rgba(109, 109, 109, 0.3);
        `}
    
    ${({ type, theme }) =>
        type === "Cancelled" &&
        `
            color: ${theme.formCancelledColor};
            background-color: ${theme.formCancelledBgColor};
            box-shadow: 0 4px 8px rgba(190, 190, 190, 0.3);
        `}

    transition: background-color 0.3s ease, color 0.3s ease;
`;
export const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    position: absolute;
    top: 2.5em;
    right: 1em;
`;
export const Row = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5em;
    align-items: flex-end;
    justify-content: end;
    align-items: center;
`;
export const GoBookings = styled.div`
    position: absolute;
    top: 2.3em;
    left: 12.4em;
`;
export const Action = styled.div<ActionProps>`
    cursor: pointer;
    color: ${({ theme }) => theme.text};
    transition: transform 0.2s ease, color 0.3 ease;
    ${(props) =>
        props.type === "edit" &&
        `
            &:hover {
                transform: scale(1.05);
                transform: translateY(-2px);
                color: #1976D2;
            }
        `}
    ${(props) =>
        props.type === "delete" &&
        `
            &:hover {
                transform: scale(1.05);
                transform: translateY(-2px);
                color: #D32F2F;
            }
        `}
    ${(props) =>
        (props.type === "user" || props.type === "room") &&
        `
            &:hover {
                transform: scale(1.05);
                transform: translateY(-2px);
                color:rgb(153, 153, 153);
            }
        `}
`;
