import { CgMail } from "react-icons/cg"
import { CiBellOn } from "react-icons/ci"
import { IoLogOutOutline } from "react-icons/io5"
import { Container, Left, Right, Title } from "./styles/topMenuStyles"
import { Hamburguer, CursorPointer } from "./styles/icons"

export const TopMenuComponent = () => {
    return (
        <Container>
            <Left>
                <Hamburguer size={30} color=""/>
                <Title>Dashboard</Title>
            </Left>
            <Right>
                <CursorPointer>
                    <CgMail size={30} color=""/>
                </CursorPointer>
                <CursorPointer>
                    <CiBellOn size={30} color=""/>
                </CursorPointer>
                <CursorPointer>
                    <IoLogOutOutline size={30} color=""/>
                </CursorPointer>
            </Right>
        </Container>
    )
}