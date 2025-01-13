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
    background-color: #f8f8f8;
    padding: 2em;
`;
export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 0.5em;
    box-shadow: 0px 16px 30px #00000014;
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
`;
export const ID = styled.span`
    font-size: 0.75rem;
    color: #799283;
    margin: 0.5em 0 3em 0;
`;
export const Icon = styled.div`
    color: #135846;
    border: 1px solid #e8f2ef;
    display: inline-flex;
    padding: 0.7em;
    border-radius: 0.6em;
    cursor: pointer;
`;
export const Button = styled.button`
    background-color: #135846;
    color: white;
    border: none;
    padding: 0.7em 1em;
    border-radius: 0.6em;
    cursor: pointer;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 1em;
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
    color: #6e6e6e;
    margin-bottom: 0.6em;
`;
export const Info = styled.p<InfoProps>`
    color: #212121;
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
    color: #799283;
    font-size: 0.7rem;
`;
export const RoomDetails = styled.div`
    font-size: 0.9rem;
    margin-top: 2em;
    color: #363636;
`;
export const FacilitiesTitle = styled.p`
    color: #6e6e6e;
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
    background-color: #e8f2ef;
    color: #135846;
    border-radius: 0.6em;
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
    ${(props) =>
        props.type === "Refund" &&
        `
            color: #e23428;
            background-color: #ffedec;
            box-shadow: 0 4px 8px rgba(226, 52, 40, 0.3);
        `}
    ${(props) =>
        props.type === "Booked" &&
        `
            color: #5ad07a;
            background-color: #e8ffee;
            box-shadow: 0 4px 8px rgba(90, 208, 122, 0.3);
        `}
    ${(props) =>
        props.type === "Pending" &&
        `
            color: #6d6d6d;
            background-color: #e2e2e2;
            box-shadow: 0 4px 8px rgba(109, 109, 109, 0.3);
        `}
    ${(props) =>
        props.type === "Cancelled" &&
        `
            color: #bebebe;
            background-color: #575757;
            box-shadow: 0 4px 8px rgba(190, 190, 190, 0.3);
        `}
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
    gap: 1.5em;
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
    transition: transform 0.2s ease;
    ${(props) =>
        props.type === "back" &&
        `
            color: #9e9e9e;
            &:hover {
                transform: scale(1.05);
                transform: translateY(-2px);
                color: #616161;
            }
        `}
    ${(props) =>
        props.type === "edit" &&
        `
            color: #64b5f6;
            &:hover {
                transform: scale(1.05);
                transform: translateY(-2px);
                color: #1976d2;
            }
        `}
    ${(props) =>
        props.type === "delete" &&
        `
            color: #e57373;
            &:hover {
                transform: scale(1.05);
                transform: translateY(-2px);
                color: #d32f2f;
            }
        `}
    ${(props) =>
        (props.type === "user" || props.type === "room") &&
        `
            color: #81c784;
            &:hover {
                transform: scale(1.05);
                transform: translateY(-2px);
                color: #388e3c;
            }
        `}
`;
