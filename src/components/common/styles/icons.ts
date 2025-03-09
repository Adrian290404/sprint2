import styled from "styled-components";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface iconsProps {
    type: string;
};

// TOP MENU
export const Hamburguer = styled(HiOutlineMenuAlt2)`
    margin-top: .4em;
    cursor: pointer;
`
export const CursorPointer = styled.div<iconsProps>`
    cursor: pointer;
    position: relative;
    color: rgb(94, 94, 94);
    ${(props) => props.type === "exit" ? `
        &:hover {
            color: #ff0000;
            transform: scale(1.2);
            transition: 0.3s ease-in-out;
        }
    ` : `
        &:hover {
            color:rgb(0, 0, 0);
            transform: scale(1.2);
            transition: 0.3s ease-in-out;
        }
    `};
`