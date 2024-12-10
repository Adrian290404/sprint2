import userPhoto from "../../../assets/userPhoto.jpg"
import { Container, ColorBand, Content, Image, Name, Email, TextContainer, Icon, ProfileBackground } from "./styles/profileShowStyles"
import { useSelector } from "react-redux"
import { CiEdit } from "react-icons/ci";
import { ProfileEditComponent } from "./profileEditComponent";
import { useState } from "react";

export const ProfileShowComponent = ( {color} ) => {
    const { user } = useSelector((state) => state.auth)
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState()
    const toggleEdit = (type = "") => {
        setShowModal(!showModal)
        setType(type)
    }

    return (
        <ProfileBackground>
            {showModal ? (
                <ProfileEditComponent onClose={toggleEdit} color={color} type={type} /> 
            ) : (
                <Container>
                    <ColorBand color={color}></ColorBand>
                    <Content>
                        <Image src={userPhoto} />
                        <TextContainer>
                            <Name>{user?.name || "User"}</Name>
                            <Icon color={color} onClick={() => toggleEdit("name")}>
                                <CiEdit size={25} />
                            </Icon>
                        </TextContainer>
                        <TextContainer>
                            <Email>{user?.email || "user@gmail.com"}</Email>
                            <Icon color={color} onClick={() => toggleEdit("email")}>
                                <CiEdit size={25} />
                            </Icon>
                        </TextContainer>
                    </Content>
                </Container>
            )}
        </ProfileBackground>
    )
}