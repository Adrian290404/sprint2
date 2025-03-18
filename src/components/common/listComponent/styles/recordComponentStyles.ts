import styled, { css } from "styled-components";

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    font-family: "Poppins", sans-serif;
`;

export const StyledThead = styled.thead`
    background-color: ${({ theme }) => theme.recordHeadBackground};
    transition: background-color 0.3s ease;
`;

export const StyledTh = styled.th`
    padding: 0.75rem;
    text-align: left;
    border-bottom: 2px solid ${({ theme }) => theme.recordThBorder};
    color:${({ theme }) => theme.recordTh};
    transition: color 0.3s ease, border-bottom 0.3s ease;
`;

export const StyledTd = styled.td`
    padding: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.recordTdBorder};
    color:${({ theme }) => theme.recordTd};;
    transition: color 0.3s ease, border-bottom 0.3s ease;
    position: relative;
    vertical-align: middle;
`;

interface StyledTrProps {
    unread?: boolean;
    type?: "create" | "update" | "delete";
}

export const StyledTr = styled.tr<StyledTrProps>`
    height: 40px;

    background-color: ${props => {
        switch (props.type) {
        case "create":
            return props.theme.recordCreateBg; 
        case "update":
            return props.theme.recordUpdateBg;
        case "delete":
            return props.theme.recordDeleteBg;
        default:
            return props.theme.recordDefaultBg;
        }
    }};

    &:nth-child(even) {
        background-color: ${props => {
            switch (props.type) {
                case "create":
                    return props.theme.recordCreateBgEven;
                case "update":
                    return props.theme.recordUpdateBgEven;
                case "delete":
                    return props.theme.recordDeleteBgEven;
                default:
                    return props.theme.recordDefaultBgEven;
            }
        }};
    }

    &:hover {
        background-color: ${props => props.theme.recordHoverBg};
    }
    
    transition: background-color 0.3s ease;
`;

interface ButtonProps {
    type?: string;
}

export const StyledButton = styled.button<ButtonProps>`
    background-color: ${({ theme, type }) => type === "remake" ? theme.recordRemakeButtonBg : theme.recordDefaultButtonBg};
    transition: background-color 0.3s ease, color 0.3s ease;
    color: ${({ theme }) => theme.background};
    border: none;
    padding: 0.3em 1em;
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5em;

    &:hover {
        background-color: ${({ theme, type }) => type === "remake" ? theme.recordRemakeButtonHover : theme.recordDefaultButtonHover};
    }
`;

interface ReadProps {
    show: boolean;
}

export const Read = styled.div<ReadProps>`
    ${props => !props.show && css`
        background-color:${({ theme }) => theme.recordRead}; 
        transition: background-color 0.3s ease;
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