import { Relative, Container, GoBack, Title, Input, Button } from "./styles/profileEditStyles"
import { TiBackspaceOutline } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../../features/authSlice"
import { useState } from "react"

export const ProfileEditComponent = ({ onClose, color, type }) => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [newValue, setNewValue] = useState("")

    const handleChange = () => {
        if (!newValue.trim()) {
            return
        }

        const updatedUser = {
            ...user,
            [type]: newValue,
        }

        dispatch(updateUser(updatedUser))
        onClose()
    }

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
    )
}