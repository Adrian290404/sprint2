import { Container, CardContainer, ProfileImage, EmployeeName, GoBack, Options, Icon, ImageContainer, NameContainer, Head, JobDesk, Table, TdLabel, Info, TdValue, Description } from "./styles/userDetailsStyles";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, deleteUser } from "../../../features/users/usersThunks";
import { MdDelete } from "react-icons/md";
import backGif from '../../../assets/back.gif'
import { CiEdit } from "react-icons/ci";
import { activeEmployee } from "../../common/listComponent/functions/activeEmployee";
import { UsersDetailsFormComponent } from "./usersDetailsFormComponent";
import { ModalQuestionComponent } from "../../common/modalQuestionComponent";
import { RootState, AppDispatch } from "../../../features/store";
import { toast } from "react-toastify";

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

    const handleDelete = async() => {
        if (id) {
            await dispatch(deleteUser(Number(id)));
            closeModal();
            toast.success("Employee deleted successfully")
            await navigate(-1);
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
                <Head>
                    <ImageContainer>
                        <GoBack>
                            <img src={backGif} width={40} onClick={goBack} />
                        </GoBack>
                        <ProfileImage src={user.image} alt={`${user.name}'s profile`} />
                    </ImageContainer>
                    <NameContainer>
                        <div>
                            <EmployeeName>{user.name}</EmployeeName>
                            <JobDesk>{user.job_desk}</JobDesk>
                        </div>     
                        <Options>
                            <Icon>
                                <CiEdit size={30} onClick={editInfo} />
                            </Icon>
                            <Icon delete>
                                <MdDelete size={30} onClick={openModal} />
                            </Icon>
                        </Options>
                    </NameContainer>                    
                </Head>
                    {showInformation ? (
                        <>
                            <Description>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <TdLabel>
                                                <Info>Join date</Info>
                                            </TdLabel>
                                            <TdValue>{user.join}</TdValue>
                                        </tr>
                                        <tr>
                                            <TdLabel>
                                                <Info>Contact</Info>
                                            </TdLabel>
                                            <TdValue>{user.contact}</TdValue>
                                        </tr>
                                        <tr>
                                            <TdLabel withoutBorder>
                                                <Info>Schedule</Info>
                                            </TdLabel>
                                            <TdValue withoutBorder>{user.schedule.replace(/, /g, " - ")} ({activeEmployee(user.schedule) ? "active now" : "inactive"})</TdValue>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Description>
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
