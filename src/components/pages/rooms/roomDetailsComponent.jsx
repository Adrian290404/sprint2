import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoom } from '../../../features/rooms/roomsThunks'
import { Container, Content, ImageContainer, Image, ImageInformation, TypeAndFloor, Details, Title, Info, Facilities, Price, Small, GoBack } from './styles/roomDetailsStyles'
import available from "../../../assets/available.png"
import booked from "../../../assets/booked.png"
import { TiBackspaceOutline } from "react-icons/ti"

export const RoomDetailsComponent = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const room = useSelector((state) => state.rooms.room)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            dispatch(fetchRoom(Number(id)))
        }
    }, [dispatch, id])

    const goBack = () => {
        navigate(-1)
    }

    return (
        <Container>
            <Content>
                <ImageContainer>
                    <Image src={room.image} alt={room.room_name} />
                    <ImageInformation src={room.avaiable ? available : booked} />
                    <Price>${room.rate}<Small>/night</Small></Price>
                </ImageContainer>
                <Details>
                    <GoBack>
                        <TiBackspaceOutline size={30} onClick={goBack} />
                    </GoBack>
                    <Title>{room.room_name}</Title>
                    <TypeAndFloor>
                        <p><Info>Bed Type. </Info>{room.bed_type}</p>
                        <p><Info>Floor. </Info>{room.room_floor}</p>
                    </TypeAndFloor>
                    <Facilities>
                        <p><Info>Facilities.</Info></p> 
                        <p>{room.facilities}</p>
                    </Facilities>
                </Details>
            </Content>
        </Container>
    )
}