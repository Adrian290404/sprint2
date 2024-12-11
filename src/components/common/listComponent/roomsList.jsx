import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchRooms } from "../../../features/rooms/roomsThunks"
import { Row, Td, Container, Image, InfoContainer, TextLight, RoomPrice, RoomLittleText, RoomStatus } from "./styles/listStyles"

export const RoomsList = ({ handleNavigate }) => {
    const dispatch = useDispatch()
    const rooms = useSelector((state) => state.rooms.rooms)

    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch])

    return (
        <>
            {rooms.map((room) => (
                <Row key={room.id} type="body">
                    <Td>
                        <Container onClick={() => handleNavigate(room.id)}>
                            <Image type="room" src={room.image} alt={room.room_name} />
                            <InfoContainer>
                                <TextLight type="room">#{room.id}</TextLight>
                                <p>{room.room_name}</p>
                            </InfoContainer>
                        </Container>
                    </Td>
                    <Td>{room.bed_type}</Td>
                    <Td>{room.room_floor}</Td>
                    <Td>{room.facilities}</Td>
                    <Td>
                        <RoomPrice>${room.rate}</RoomPrice>
                        <RoomLittleText>/night</RoomLittleText>
                    </Td>
                    <Td>
                        <RoomStatus avaiable={room.avaiable}>
                            {room.avaiable ? "Available" : "Booked"}
                        </RoomStatus>
                    </Td>
                </Row>
            ))}
        </>
    )
}