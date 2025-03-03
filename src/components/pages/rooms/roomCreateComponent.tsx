import { useRef, FormEvent } from 'react'
import { Container, Content, Form, Agrupate, Default, Column, Label, Input, Button, Checkbox, Title, GoBack } from '../../common/styles/createStyles'
import { MdOutlineAutoAwesome } from "react-icons/md"
import { TiBackspaceOutline } from "react-icons/ti"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createRoom } from "../../../features/rooms/roomsThunks"
import { AppDispatch } from '../../../features/store'
import { Room } from '../../../interfaces/room'

export const RoomCreateComponent = () => {
    const facilitiesInputRef = useRef<HTMLInputElement | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSetDefaultValue = (inputRef: React.RefObject<HTMLInputElement>, value: string): void => {
        if (inputRef && inputRef.current) {
            inputRef.current.value = value;
        }
    };

    const goBack = (): void => {
        navigate(-1)
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
    
        const formData = new FormData(e.target as HTMLFormElement)
       
        const newRoom: Omit<Room, 'id'> = {
            room_name: formData.get('room_name') as string,
            bed_type: formData.get('bed_type') as string,
            room_floor: formData.get('room_floor') as string,
            facilities: formData.get('facilities') as string,
            rate: parseFloat(formData.get('rate') as string),
            avaiable: formData.get('available') === 'on',
            image: formData.get('image') as string,
        }
    
       
        dispatch(createRoom(newRoom)).then((action: any) => {
            if (action.payload) {
                navigate(`/room/${action.payload.id}`);
            } 
            else {
                navigate(`/rooms`);
            }
        });
    };

    return (
        <Container>
            <Content>
                <GoBack onClick={goBack}>
                    <TiBackspaceOutline size={30}/>
                </GoBack>
                <Title>Create New Room</Title>
                <Form onSubmit={handleSubmit}>
                    <Agrupate>
                        <div>
                            <Label>Room ID</Label>
                            <Input
                                type="text"
                                name="id"
                                disabled
                                value="Auto-generated"
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
};