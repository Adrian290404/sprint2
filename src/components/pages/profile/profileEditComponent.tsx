import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Relative, Container, GoBack, Title, Input, Button } from "./styles/profileEditStyles";
import { TiBackspaceOutline } from "react-icons/ti";
import { updateUser } from "../../../features/login/authSlice";
import { RootState, AppDispatch } from "../../../features/store";

interface AuthUser {
    name: string;
    email: string;
}

interface ProfileEditComponentProps {
    onClose: () => void;
    color: string;
    type: "name" | "email"; 
}

export const ProfileEditComponent: React.FC<ProfileEditComponentProps> = ({ onClose, color, type }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [newValue, setNewValue] = useState<string>("");

    const handleChange = () => {
        if (!newValue.trim()) {
            return;
        }

        const updatedUser: AuthUser = {
            ...user,
            name: type === "name" ? newValue : user?.name || "Unknown", 
            email: type === "email" ? newValue : user?.email || "user@unknown.com",  
        };

        dispatch(updateUser(updatedUser)); 
        onClose();
    };

    return (
        <Relative>
            <Container>
                <GoBack>
                    <TiBackspaceOutline size={30} onClick={onClose} color={color} />
                </GoBack>
                <Title color={color}>Edit {type}</Title>
                    <Input
                        type="text"
                        color={color}
                        placeholder={"New " + type}
                        maxLength={type === "name" ? 15 : 25}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                <Button color={color} onClick={handleChange}>
                    Change {type}
                </Button>
            </Container>
        </Relative>
    );
};
