import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoom, deleteRoom } from '../../../features/rooms/roomsThunks'
import { Container, Content, ImageContainer, Image, ImageInformation, TypeAndFloor, Details, Title, Info, Facilities, Price, Small, GoBack, Options, Icon } from './styles/roomDetailsStyles'
import available from "../../../assets/available.png"
import booked from "../../../assets/booked.png"
import { TiBackspaceOutline } from "react-icons/ti"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { RoomDetailsFormComponent } from './roomDetailsFormComponent'
import { RoomsModalQuestionComponent } from './roomsModalQuestionComponent'

export const RoomDetailsComponent = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const room = useSelector((state) => state.rooms.room)
    const navigate = useNavigate()
    const [showInformation, setShowInformation] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(fetchRoom(Number(id)))
        }
    }, [dispatch, id])

    const goBack = () => {
        navigate(-1)
    }

    const editInfo = () => {
        setShowInformation(!showInformation)
    }

    const openModal = () => {
        setShowModal(true)
    }
    
    const closeModal = () => {
        setShowModal(false)
    }

    const handleDelete = () => {
        dispatch(deleteRoom(Number(id)));
        closeModal();
        navigate(-1);
    }
    
    if (!room) {
        return <p>Loading...</p>;
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
                    {showInformation ? (
                        <>
                        <GoBack>
                            <TiBackspaceOutline size={30} onClick={goBack} />
                        </GoBack>
                        <Options>
                            <Icon>
                                <CiEdit size={30} onClick={editInfo} />
                            </Icon>
                            <Icon delete onClick={openModal}>
                                <MdDelete size={30} />
                            </Icon>
                        </Options>
                        <Title>{room.room_name}</Title>
                        <TypeAndFloor>
                            <p><Info>Bed Type. </Info>{room.bed_type}</p>
                            <p><Info>Floor. </Info>{room.room_floor}</p>
                        </TypeAndFloor>
                        <Facilities>
                            <p><Info>Facilities.</Info></p> 
                            <p>{room.facilities}</p>
                        </Facilities>
                        </>
                    ) : (
                        <RoomDetailsFormComponent 
                            id={room.id}
                            image={room.image}
                            name={room.room_name} 
                            bedType={room.bed_type}
                            floor={room.room_floor}
                            facilities={room.facilities}
                            price={room.rate}
                            available={room.avaiable}
                            changePage={editInfo}
                        >
                        </RoomDetailsFormComponent>
                    )}
                </Details>
            </Content>
            <RoomsModalQuestionComponent
                isOpen={showModal} 
                onClose={closeModal} 
                onConfirm={handleDelete} 
                roomName={room.room_name}
            />
        </Container>
    )
}