import { useRef } from 'react'
import { Container, Content, Form, Agrupate, Default, Column, Label, Input, Button, Checkbox, Title } from './styles/roomCreateStyles'
import { MdOutlineAutoAwesome } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createRoom } from "../../../features/rooms/roomsThunks.js"

export const RoomCreateComponent = () => {
    const facilitiesInputRef = useRef(null)
    const imageInputRef = useRef(null)
    const dispatch = useDispatch()
    const rooms = useSelector((state) => state.rooms.rooms)
    const navigate = useNavigate()

    const newRoomId = () => {
        let minId = 1
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].id === minId) {
                minId = rooms[i].id + 1
            }
        }
        return minId
    }
    
    const handleSetDefaultValue = (inputRef, value) => {
        if (inputRef && inputRef.current) {
            inputRef.current.value = value
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target)
        const newRoom = {
            id: newRoomId(),
            room_name: formData.get('room_name'),
            bed_type: formData.get('bed_type'),
            room_floor: formData.get('room_floor'),
            facilities: formData.get('facilities'),
            rate: parseFloat(formData.get('rate')),
            avaiable: formData.get('available') === 'on',
            image: formData.get('image'),
        }
    
        dispatch(createRoom(newRoom))
        navigate(`/room/${newRoomId()}`)
    };

    return (
        <Container>
            <Content>
                <Title>Create New Room</Title>
                <Form onSubmit={handleSubmit}>
                    <Agrupate>
                        <div>
                            <Label>Room ID</Label>
                            <Input
                                type="text"
                                name="id"
                                disabled
                                value={newRoomId()}
                            />
                        </div>
                        <div>
                            <Label>Price ($)</Label>
                            <Input
                                type="number"
                                name="rate"
                                required
                            />
                        </div>
                        <div>
                            <Label>Available</Label>
                            <Checkbox
                                type="checkbox"
                                name="available"
                            />
                        </div>
                    </Agrupate>

                    <Label>Room Name</Label>
                    <Input
                        type="text"
                        name="room_name"
                        required
                    />

                    <Label>Bed Type</Label>
                    <Input
                        type="text"
                        name="bed_type"
                        required
                    />

                    <Label>Floor</Label>
                    <Input
                        type="text"
                        name="room_floor"
                        required
                    />

                    <Agrupate default>
                        <Column>
                            <Label>Facilities</Label>
                            <Input
                                type="text"
                                name="facilities"
                                ref={facilitiesInputRef}
                                required
                            />
                        </Column>
                        <Default>
                            <MdOutlineAutoAwesome
                                size={30}
                                onClick={() => handleSetDefaultValue(facilitiesInputRef, "AC, Shower, Two Queen Beds, Towel, Kitchenette, Sofa, LED TV, Wifi")}
                            />
                        </Default>
                    </Agrupate>

                    <Agrupate>
                        <Column>
                            <Label>Image</Label>
                            <Input
                                type="url"
                                name="image"
                                ref={imageInputRef}
                                required
                            />
                        </Column>
                        <Default>
                            <MdOutlineAutoAwesome
                                size={30}
                                onClick={() => handleSetDefaultValue(imageInputRef, "https://cdn.pixabay.com/photo/2016/08/19/06/53/coming-soon-1604663_1280.png")}
                            />
                        </Default>
                    </Agrupate>
                    <Button type="submit">Create Room</Button>
                </Form>
            </Content>
        </Container>
    )
}