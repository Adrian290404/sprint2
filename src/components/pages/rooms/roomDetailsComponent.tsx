import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoom, fetchRooms, deleteRoom } from '../../../features/rooms/roomsThunks'
import { Container, Content, ImageContainer, Image, ImageInformation, TypeAndFloor, Details, Title, Info, Facilities, Price, Small, GoBack, Options, Icon } from './styles/roomDetailsStyles'
import available from "../../../assets/available.png"
import booked from "../../../assets/booked.png"
import { TiBackspaceOutline } from "react-icons/ti"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { RoomDetailsFormComponent } from './roomDetailsFormComponent'
import { ModalQuestionComponent } from '../../common/modalQuestionComponent'
import { AppDispatch } from '../../../features/store'

export const RoomDetailsComponent = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const room = useSelector((state: any) => state.rooms.room);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [showInformation, setShowInformation] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            dispatch(fetchRoom(Number(id))).finally(() => setLoading(false));
        }
    }, [dispatch, id]);

    const goBack = (): void => {
        navigate(-1);
    };

    const editInfo = (): void => {
        setShowInformation(!showInformation);
    };

    const openModal = (): void => {
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    const handleDelete = async (): Promise<void> => {
        if (id) {
            await dispatch(deleteRoom(Number(id)));
            closeModal();
            await dispatch(fetchRooms());
            navigate(-1);
        }
    };
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!room) {
        return <p>Room not found.</p>; 
    }

    const currentRoom = Array.isArray(room) ? room[0] : room;

    return (
        <Container>
            <Content>
                <ImageContainer>
                    <Image src={currentRoom.image} alt={currentRoom.room_name} />
                    <ImageInformation src={currentRoom.avaiable ? available : booked} />
                    <Price>
                        ${currentRoom.rate}
                        <Small>/night</Small>
                    </Price>
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
                            <Title>{currentRoom.room_name}</Title>
                            <TypeAndFloor>
                                <p>
                                    <Info>Bed Type. </Info>
                                    {currentRoom.bed_type}
                                </p>
                                <p>
                                    <Info>Floor. </Info>
                                    {currentRoom.room_floor}
                                </p>
                            </TypeAndFloor>
                            <Facilities>
                                <p>
                                    <Info>Facilities.</Info>
                                </p>
                                <p>{currentRoom.facilities}</p>
                            </Facilities>
                        </>
                    ) : (
                        <RoomDetailsFormComponent
                            id={currentRoom.id}
                            image={currentRoom.image}
                            name={currentRoom.room_name}
                            bedType={currentRoom.bed_type}
                            floor={currentRoom.room_floor}
                            facilities={currentRoom.facilities}
                            price={currentRoom.rate}
                            available={currentRoom.avaiable}
                            changePage={editInfo}
                        />
                    )}
                </Details>
            </Content>
            <ModalQuestionComponent
                isOpen={showModal}
                onClose={closeModal}
                onConfirm={handleDelete}
                name={currentRoom.room_name}
                func="Delete"
            />
        </Container>
    );
};