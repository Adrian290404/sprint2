import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoom, deleteRoom } from '../../../features/rooms/roomsThunks'
import { Container, Content, ImageContainer, Image, ImageInformation, Details, Title, Info, Price, Small, GoBack, Options, Icon, Head, Description, Table, TdLabel, TdValue } from './styles/roomDetailsStyles'
import available from "../../../assets/available.png"
import booked from "../../../assets/booked.png"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import backGif from '../../../assets/back.gif'
import { RoomDetailsFormComponent } from './roomDetailsFormComponent'
import { ModalQuestionComponent } from '../../common/modalQuestionComponent'
import { AppDispatch } from '../../../features/store'
import { toast } from 'react-toastify'

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

    const handleDelete = async() => {
        if (id) {
            await dispatch(deleteRoom(Number(id)));
            closeModal();
            toast.success("Room deleted successfully")
            await navigate(-1);
        }
    };

    if (loading) {
        return <Container>
            <p>Loading...</p>
        </Container>;
    }

    return (
        <Container>
            <Content>
                <ImageContainer>
                    <Image src={room.image} alt={room.room_name} />
                    <ImageInformation src={room.avaiable ? available : booked} />
                    <Price>
                        ${room.rate}
                        <Small>/night</Small>
                    </Price>
                </ImageContainer>
                <Details>
                    {showInformation ? (
                        <>
                            <Head>
                                <GoBack onClick={goBack}>
                                    <img src={backGif} width={40} />
                                </GoBack>

                                <div>
                                    <Title>{room.room_name}</Title>  
                                </div>
                                  
                                <Options>
                                    <Icon onClick={editInfo}>
                                        <CiEdit size={30} />
                                    </Icon>
                                    <Icon delete onClick={openModal}>
                                        <MdDelete size={30} />
                                    </Icon>
                                </Options>
                                                        
                            </Head>
                            <Description>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <TdLabel>
                                                <Info>Bed Type</Info>
                                            </TdLabel>
                                            <TdValue>{room.bed_type}</TdValue>
                                        </tr>
                                        <tr>
                                            <TdLabel>
                                                <Info>Floor</Info>
                                            </TdLabel>
                                            <TdValue>{room.room_floor}</TdValue>
                                        </tr>
                                        <tr>
                                            <TdLabel withoutBorder>
                                                <Info>Facilities</Info>
                                            </TdLabel>
                                            <TdValue withoutBorder>{room.facilities}</TdValue>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Description>
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
                        />
                    )}
                </Details>
            </Content>
            <ModalQuestionComponent
                isOpen={showModal}
                onClose={closeModal}
                onConfirm={handleDelete}
                name={room.room_name}
                func="Delete"
            />
        </Container>
    );
};