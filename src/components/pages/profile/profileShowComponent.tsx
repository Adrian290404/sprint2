import userPhoto from "../../../assets/userPhoto.jpg";
import { Container, ColorBand, Content, Image, Name, Email, TextContainer, Icon, ProfileBackground } from "./styles/profileShowStyles";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { ProfileEditComponent } from "./profileEditComponent";
import { useState } from "react";
import { RootState } from "../../../features/store";

interface ProfileShowComponentProps {
    color: string;
}

export const ProfileShowComponent: React.FC<ProfileShowComponentProps> = ({ color }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [type, setType] = useState<"name" | "email" | undefined>(undefined); 

    const toggleEdit = (type: "name" | "email" = "name") => { 
        setShowModal(!showModal);
        setType(type);
    };

    return (
        <ProfileBackground>
            {showModal ? (
                <ProfileEditComponent onClose={toggleEdit} color={color} type={type!} /> 
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
    );
};