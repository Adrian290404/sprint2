import styled from "styled-components";

interface iconsProps {
    type?: string;
};

// TOP MENU
export const CursorPointer = styled.div<iconsProps>`
    cursor: pointer;
    position: relative;
    color: ${({ theme }) => theme.icons};
    transition: color 0.3s ease;

    &:hover {
        color: ${(props) => (props.type === "exit" ? "#ff0000" : props.theme.text)};
        transform: scale(1.2);
        transition: 0.3s ease-in-out;
    }
`;