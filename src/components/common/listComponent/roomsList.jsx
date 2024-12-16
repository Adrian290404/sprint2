import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchRooms } from "../../../features/rooms/roomsThunks"
import { Row, Td, Container, Image, InfoContainer, TextLight, RoomPrice, RoomLittleText, RoomStatus } from "./styles/listStyles"
import { paginateData } from "./functions/paginateData"
import { filterRooms } from "./functions/filterRooms"

export const RoomsList = ({ currentPage, handleNavigate }) => {
    const dispatch = useDispatch()
    const rooms = useSelector((state) => state.rooms.rooms)
    const { selectedMenu, selectedOption } = useSelector((state) => state.filter)

    const filteredRooms = filterRooms(rooms, selectedMenu, selectedOption)
    const paginatedRooms = paginateData(filteredRooms, 10)[currentPage - 1] || []

    useEffect(() => {
        if (rooms.length === 0) {
            dispatch(fetchRooms())
        }
    }, [dispatch, rooms.length])

    return (
        <>
            {paginatedRooms.map((room) => (
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