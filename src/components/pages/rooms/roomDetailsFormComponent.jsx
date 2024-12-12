import { FormContainer, FormField, TwoFields, Label, Input, CheckboxContainer, CheckboxLabel, Buttons, Icon, Button } from './styles/roomDetailsFormStyles'
import { useState } from 'react'
import { TiArrowBackOutline } from "react-icons/ti"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updateRoom } from '../../../features/rooms/roomsThunks';

export const RoomDetailsFormComponent = ({ id, image, name, bedType, floor, facilities, price, available, changePage }) => {
    const [isAvailable, setIsAvailable] = useState(available)
    const [roomName, setRoomName] = useState(name)
    const [roomFacilities, setRoomFacilities] = useState(facilities)
    const [roomBedType, setRoomBedType] = useState(bedType)
    const [roomFloor, setRoomFloor] = useState(floor)
    const [roomPrice, setRoomPrice] = useState(price)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCheckboxChange = () => {
        setIsAvailable(!isAvailable)
    };

    const handleChange = (e, setter, emptyValue) => {
        const value = e.target.value
        setter(value.trim() === "" ? emptyValue : value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedRoom = {
            id: id,
            "room_name": roomName,
            "bed_type": roomBedType,
            "room_floor": roomFloor,
            "facilities": roomFacilities,
            "rate": Number(roomPrice),
            "avaiable": isAvailable,
            image: image,
        }
        dispatch(updateRoom(updatedRoom)).then(() => {
            navigate(0)
        })
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Label>Room name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        onChange={(e) => handleChange(e, setRoomName, name)}
                        placeholder={name}
                    />
                </FormField>
                <FormField>
                    <Label>Facilities</Label>
                    <Input
                        id="facilities"
                        name="facilities"
                        type="text"
                        onChange={(e) => handleChange(e, setRoomFacilities, facilities)}
                        placeholder={facilities}
                    />
                </FormField>
                <TwoFields>
                    <div>
                        <Label>Bed Type</Label>
                        <Input
                            id="bedType"
                            name="bedType"
                            type="text"
                            onChange={(e) => handleChange(e, setRoomBedType, bedType)}
                            placeholder={bedType}
                        />
                    </div>
                    <div>
                        <Label>Floor</Label>
                        <Input
                            id="floor"
                            name="floor"
                            type="text"
                            onChange={(e) => handleChange(e, setRoomFloor, floor)}
                            placeholder={floor}
                        />
                    </div>
                </TwoFields>
                <TwoFields>
                    <div>
                        <Label>Price</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            onChange={(e) => handleChange(e, setRoomPrice, price)}
                            placeholder={price}
                        />
                    </div>
                    <div>
                        <CheckboxContainer>
                            <input
                                id="available"
                                name="available"
                                type="checkbox"
                                checked={isAvailable}
                                onChange={handleCheckboxChange}
                            />
                            <CheckboxLabel>Available</CheckboxLabel>
                        </CheckboxContainer>
                    </div>
                </TwoFields>
                <Buttons>
                    <Icon title="go back">
                        <TiArrowBackOutline size={30} onClick={changePage} />
                    </Icon>
                    <Button type="submit">Save Changes</Button>
                </Buttons>
            </form>
        </FormContainer>
    )
}