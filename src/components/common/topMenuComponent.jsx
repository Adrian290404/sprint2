import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CgMail } from "react-icons/cg";
import { CiBellOn } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { Container } from "./styles/topMenuStyles";
import { Hamburguer } from "./styles/topMenuStyles";

export const TopMenuComponent = () => {
    return (
        <Container>
            <Hamburguer><HiOutlineMenuAlt2 size={30} color=""/></Hamburguer>
            <h1>Dashboard</h1>
            <CgMail size={30} color=""/>
            <CiBellOn size={30} color=""/>
            <IoLogOutOutline size={30} color=""/>
        </Container>
    )
}