import { Container, CardContainer, ProfileImage, CardContent, EmployeeName, InfoGroup, InfoText, Clock, Agrupate, GoBack, Options, Icon } from "./styles/userDetailsStyles";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, deleteUser } from "../../../features/users/usersThunks";
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

    const handleDelete = (): void => {
        if (id) {
            dispatch(deleteUser(Number(id)));
            closeModal();
            navigate(-1);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>; 
    }

    if (!user) {
        return <p>User not found.</p>; 
    }

    return (
        <Container>
            <CardContainer>
                <ProfileImage src={user.image} alt={`${user.name}'s profile`} />
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
                                    <MdDelete size={30} onClick={openModal} />
                                </Icon>
                            </Options>
                            <InfoGroup center>
                                <InfoText>{user.job_desk}</InfoText>
                            </InfoGroup>
                            <Agrupate>
                                <InfoGroup>
                                    <MdOutlineCalendarToday size={25} />
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
                                        {user.schedule.replace(/, /g, " - ")}
                                    </InfoText>
                                </InfoGroup>
                            </Agrupate>
                        </>
                    ) : (
                        <UsersDetailsFormComponent
                            id={user.id}
                            name={user.name}
                            image={user.image}
                            job={user.job_desk}
                            join={user.join}
                            contact={user.contact}
                            schedule={user.schedule}
                            changePage={editInfo}
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
    );
};
