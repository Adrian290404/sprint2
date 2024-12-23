import { Container, CardContainer, ProfileImage, CardContent, EmployeeName, InfoGroup, InfoText, Clock, Agrupate, GoBack, Options, Icon } from "./styles/userDetailsStyles"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUser, deleteUser } from '../../../features/users/usersThunks'
import { MdOutlineCalendarToday } from "react-icons/md"
import { TiBackspaceOutline } from "react-icons/ti"
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { MdOutlineSchedule } from "react-icons/md"
import { MdOutlineLocalPhone } from "react-icons/md"
import { activeEmployee } from "../../common/listComponent/functions/activeEmployee"
import { useState } from "react"
import { UsersDetailsFormComponent } from "./usersDetailsFormComponent"
import { ModalQuestionComponent } from "../../common/modalQuestionComponent"

export const UsersDetailsComponent = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)
    const navigate = useNavigate()
    const [showInformation, setShowInformation] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(fetchUser(Number(id)))
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
        dispatch(deleteUser(Number(id)));
        closeModal();
        navigate(-1);
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return <Container>
        <CardContainer>
            <ProfileImage src={user.image} />
            <CardContent>
            <EmployeeName>{user.name}</EmployeeName>
                {showInformation ? (
                    <>
                        <GoBack>
                            <TiBackspaceOutline size={30} onClick={goBack} />
                        </GoBack>
                        <Options>
                            <Icon>
                                <CiEdit size={30} onClick={editInfo} />
                            </Icon>
                            <Icon delete>
                                <MdDelete size={30} onClick={openModal}/>
                            </Icon>
                        </Options>
                        <InfoGroup center>
                            <InfoText >{user.job_desk}</InfoText>
                        </InfoGroup>
                        <Agrupate>
                            <InfoGroup>
                                <MdOutlineCalendarToday size={25}/>
                                <InfoText>{user.join}</InfoText>                        
                            </InfoGroup>
                            <InfoGroup>
                                <MdOutlineLocalPhone size={25} />
                                <InfoText>{user.contact}</InfoText>                        
                            </InfoGroup>
                            <InfoGroup>
                                <Clock active={activeEmployee(user.schedule)}>
                                    <MdOutlineSchedule size={25} />
                                </Clock>                    
                                <InfoText>
                                    {(user.schedule).replace(/, /g, " - ")}
                                </InfoText> 
                            </InfoGroup>
                        </Agrupate>
                    </>
                ) : (
                    <UsersDetailsFormComponent
                        id = {user.id}
                        name = {user.name}
                        image = {user.image}
                        job = {user.job_desk}
                        join = {user.join}
                        contact = {user.contact}
                        schedule = {user.schedule}
                        changePage = {editInfo}
                    />
                )}
            </CardContent>
        </CardContainer>
        <ModalQuestionComponent
            isOpen={showModal} 
            onClose={closeModal} 
            onConfirm={handleDelete} 
            name={user.name}
            func="Delete"
        />
    </Container>
}