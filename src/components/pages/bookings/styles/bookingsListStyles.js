import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #FFFFFF;
    border-radius: .7em;
`;
export const Row = styled.tr`
    text-align: left;
    border: none;
    border-top: ${(props) => (props.type === "body" ? "2px solid #f8f8f8" : "none")}
`
export const Th = styled.th`
    padding: 1em;
    color: #393939;
    font-size: 1rem;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
`
export const Td = styled.td`
    padding: 1em;
    color: #393939;
    font-size: 1rem;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
    vertical-align: top;
`
export const GuestContainer = styled.div`
    display: flex;
    font-weight: 500;
    cursor: pointer;
`
export const InfoContainer = styled.div`
    margin-left: 1em;
`
export const Image = styled.img`
    width: 45px;
    height: 45px;
`
export const Id = styled.p`
    color: #799283;
    font-size: 0.875rem;
    font-weight: 300;
`
export const Hour = styled.p`
    font-size: 0.875rem;
    font-weight: 300;
`
export const Notes = styled.button`
    width: 80%;
    padding: .6em;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    border-radius: 1em;
    ${(props) => (props.active ? 
        "cursor: pointer; background-color: #EEF9F2; color: #212121; border: none;" 
        : 
        "border: 1px solid #799283; color: #799283;"
    )}
`
export const Status = styled.button`
    width: 80%;
    padding: .6em;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    border-radius: 1em;
    border: none;
    ${(props) => (props.type) === "Refund" && 
        "color: #E23428; background-color: #FFEDEC;"
    }
    ${(props) => (props.type) === "Booked" && 
        "color: #5AD07A; background-color: #E8FFEE;"
    }
    ${(props) => (props.type) === "Pending" && 
        "color: #6D6D6D; background-color: #E2E2E2;"
    }
    ${(props) => (props.type) === "Cancelled" && 
        "color: #BEBEBE; background-color: #575757;"
    }
`