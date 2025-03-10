import styled, { css } from "styled-components";

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    background-color: #ffffff;
    font-family: "Poppins", sans-serif;
`;

export const StyledThead = styled.thead`
    background-color: #dcdcdc;
`;

export const StyledTh = styled.th`
    padding: 0.75rem;
    text-align: left;
    border-bottom: 2px solid #ccc;
    color:rgb(36, 36, 36);
`;

export const StyledTd = styled.td`
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
    color:rgb(58, 58, 58);
    position: relative;
`;

interface StyledTrProps {
    unread?: boolean;
    type?: "create" | "update" | "delete";
}

export const StyledTr = styled.tr<StyledTrProps>`
    background-color: ${props => {
        switch (props.type) {
        case "create":
            return "#e0f8e9"; 
        case "update":
            return "#e0eaf8";
        case "delete":
            return "#f8e0e0";
        default:
            return "#ffffff";
        }
    }};

    &:nth-child(even) {
        background-color: ${props => {
            switch (props.type) {
                case "create":
                return "#d4f7dc";
                case "update":
                return "#d4e7f7";
                case "delete":
                return "#f7d4d4";
                default:
                return "#f9f9f9";
            }
        }};
    }

    &:hover {
        background-color:rgb(204, 202, 202);
    }
`;

interface ButtonProps {
    type?: string;
}

export const StyledButton = styled.button<ButtonProps>`
    background-color: ${({ type }) => type === "remake" ? "#e67e22" : "#3498db"};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5em;

    &:hover {
        background-color: ${({ type }) => type === "remake" ? "#d35400" : "#2980b9"};
    }
`;

interface ReadProps {
    show: boolean;
}

export const Read = styled.div<ReadProps>`
    ${props => !props.show && css`
          background-color:rgb(0, 119, 255);    
          position: absolute;
          top: 0;
          left: 0;
          padding: .2em;
          margin: 0;
          height: 100%;
          border-radius: 0 1em 1em 0;
    `}
`;

export const TextAndIcons = styled.div`
    display: flex;
    align-items: center;
    gap: .5em;
`