import { FormContainer, FormField, TwoFields, Label, Input, CheckboxContainer, CheckboxLabel, Buttons, Button } from '../../common/styles/detailsFormStyles'
import { useState } from 'react'
import { GiSave } from "react-icons/gi";
import backGif from '../../../assets/back.gif'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateRoom } from '../../../features/rooms/roomsThunks'
import { AppDispatch } from '../../../features/store'
import { toast } from 'react-toastify'
import { CustomCheckbox } from '../../common/styles/createStyles';
import { CursorPointer } from '../../common/styles/icons';

interface RoomDetailsFormProps {
    id: number
    image: string
    name: string
    bedType: string
    floor: string
    facilities: string
    price: number
    available: boolean
    changePage: () => void
}

export const RoomDetailsFormComponent = ({id, image, name, bedType, floor, facilities, price, available, changePage}: RoomDetailsFormProps) => {
    const [isAvailable, setIsAvailable] = useState<boolean>(available)
    const [roomName, setRoomName] = useState<string>(name)
    const [roomFacilities, setRoomFacilities] = useState<string>(facilities)
    const [roomBedType, setRoomBedType] = useState<string>(bedType)
    const [roomFloor, setRoomFloor] = useState<string>(floor)
    const [roomPrice, setRoomPrice] = useState<number>(price)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const handleCheckboxChange = (): void => {
        setIsAvailable(!isAvailable)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>, emptyValue: string | number): void => {
        const value = e.target.value
        setter(value.trim() === "" ? emptyValue : (typeof emptyValue === "number" ? Number(value) : value))
    }    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const updatedRoom = {
            id,
            room_name: roomName,
            bed_type: roomBedType,
            room_floor: roomFloor,
            facilities: roomFacilities,
            rate: roomPrice,
            avaiable: isAvailable,
            image
        }

        await dispatch(updateRoom(updatedRoom))
        toast.success("Room updated successfully")
        await navigate(-1)
    }

    return (
        <FormContainer type="room">
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
                            placeholder={String(price)}
                        />
                    </div>
                    <div>
                        <Label>Available</Label>
                        <CheckboxContainer>
                            <CustomCheckbox
                                id="available"
                                name="available"
                                type="checkbox"
                                checked={isAvailable}
                                onChange={handleCheckboxChange}
                            />
                        </CheckboxContainer>
                    </div>
                </TwoFields>
                <Buttons>
                    <CursorPointer onClick={changePage}>
                        <img src={backGif} width={40}  />
                    </CursorPointer>
                    <Button type="submit"><GiSave size={20} />Save Changes</Button>
                </Buttons>
            </form>
        </FormContainer>
    )
};