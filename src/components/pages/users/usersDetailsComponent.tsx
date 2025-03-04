import { Container, CardContainer, ProfileImage, CardContent, EmployeeName, InfoGroup, InfoText, Clock, Agrupate, GoBack, Options, Icon } from "./styles/userDetailsStyles";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, deleteUser, fetchUsers } from "../../../features/users/usersThunks";
import { MdOutlineCalendarToday, MdOutlineSchedule, MdOutlineLocalPhone, MdDelete } from "react-icons/md";
import { TiBackspaceOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { activeEmployee } from "../../common/listComponent/functions/activeEmployee";
import { UsersDetailsFormComponent } from "./usersDetailsFormComponent";
import { ModalQuestionComponent } from "../../common/modalQuestionComponent";
import { RootState, AppDispatch } from "../../../features/store";

export const UsersDetailsComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.users.user);
    const navigate = useNavigate();
    const [showInformation, setShowInformation] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            dispatch(fetchUser(Number(id))).finally(() => {
                setIsLoading(false); 
            });
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
            await dispatch(deleteUser(Number(id)));
            closeModal();
            await dispatch(fetchUsers());
            navigate(-1);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>; 
    }

    if (!user) {
        return <p>User not found.</p>; 
    }

    const currentUser = Array.isArray(user) ? user[0] : user;

    return (
        <Container>
            <CardContainer>
                <ProfileImage src={currentUser.image} alt={`${currentUser.name}'s profile`} />
                <CardContent>
                    <EmployeeName>{currentUser.name}</EmployeeName>
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
                                    <MdDelete size={30} onClick={openModal} />
                                </Icon>
                            </Options>
                            <InfoGroup center>
                                <InfoText>{currentUser.job_desk}</InfoText>
                            </InfoGroup>
                            <Agrupate>
                                <InfoGroup>
                                    <MdOutlineCalendarToday size={25} />
                                    <InfoText>{currentUser.join}</InfoText>
                                </InfoGroup>
                                <InfoGroup>
                                    <MdOutlineLocalPhone size={25} />
                                    <InfoText>{currentUser.contact}</InfoText>
                                </InfoGroup>
                                <InfoGroup>
                                    <Clock active={activeEmployee(currentUser.schedule)}>
                                        <MdOutlineSchedule size={25} />
                                    </Clock>
                                    <InfoText>
                                        {currentUser.schedule.replace(/, /g, " - ")}
                                    </InfoText>
                                </InfoGroup>
                            </Agrupate>
                        </>
                    ) : (
                        <UsersDetailsFormComponent
                            id={currentUser.id}
                            name={currentUser.name}
                            image={currentUser.image}
                            job={currentUser.job_desk}
                            join={currentUser.join}
                            contact={currentUser.contact}
                            schedule={currentUser.schedule}
                            changePage={editInfo}
                        />
                    )}
                </CardContent>
            </CardContainer>
            <ModalQuestionComponent
                isOpen={showModal}
                onClose={closeModal}
                onConfirm={handleDelete}
                name={currentUser.name}
                func="Delete"
            />
        </Container>
    );
};
