import { useRef, FormEvent } from 'react';
import { Container, Content, Form, Agrupate, Default, Column, Label, Input, Button, Title, GoBack, Head } from '../../common/styles/createStyles';
import { MdOutlineAutoAwesome } from "react-icons/md";
import backGif from '../../../assets/back.gif'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUser } from '../../../features/users/usersThunks';
import { RootState, AppDispatch } from '../../../features/store';
import { Employee } from '../../../interfaces/employee'; 
import { toast } from 'react-toastify';
import { CursorPointer } from '../../common/styles/icons';

export const UsersCreateComponent = () => {
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users); 
    const navigate = useNavigate();
    const location = useLocation();

    const userData = location.state?.employeeData as Employee | undefined;

    const newUserId = (): number => {
        const Ids = users.map(user => user.id).sort((a, b) => a - b);
        for (let i = 1; i <= Ids.length; i++) {
            if (!Ids.includes(i)) {
                return i;
            }
        }
        return Ids.length + 1;
    };

    const handleSetDefaultValue = (inputRef: React.RefObject<HTMLInputElement>, value: string): void => {
        if (inputRef.current) {
            inputRef.current.value = value;
        }
    };

    const formatDate = (): string => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const goBack = (): void => {
        navigate(-1);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newUser: Employee = {
            id: newUserId(),
            name: formData.get('name') as string,
            image: formData.get('image') as string,
            join: formatDate(),
            job_desk: formData.get('job_desk') as string,
            schedule: formData.get('schedule') as string,
            contact: formData.get('contact') as string,
        };

        await dispatch(createUser(newUser));
        toast.success("Employee created successfully")
        await navigate(`/users/${newUser.id}`);
    };

    return (
        <Container>
            <Content>
                <Head>
                    <GoBack onClick={goBack}>
                        <img src={backGif} width={40} />
                    </GoBack>
                    <Title>Create New User</Title>                    
                </Head>
                <Form onSubmit={handleSubmit}>
                    <Agrupate>
                        <Column>
                            <Label>User ID</Label>
                            <Input
                                type="text"
                                name="id"
                                disabled
                                value={newUserId()}
                            />
                        </Column>
                        <Column>
                            <Label>Join</Label>
                            <Input
                                type="text"
                                name="join"
                                disabled
                                value={formatDate()}
                            />
                        </Column>
                    </Agrupate>

                    <Label>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        defaultValue={userData ? userData.name : ""}
                        required
                    />

                    <Label>Job Desk</Label>
                    <Input
                        type="text"
                        name="job_desk"
                        defaultValue={userData ? userData.job_desk : ""}
                        required
                    />

                    <Label>Schedule</Label>
                    <Input
                        type="text"
                        name="schedule"
                        pattern="^(?:(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday))?$"
                        defaultValue={userData ? userData.schedule : ""}
                        required
                    />

                    <Label>Contact</Label>
                    <Input
                        type="text"
                        name="contact"
                        defaultValue={userData ? userData.contact : ""}
                        required
                    />

                    <Agrupate>
                        <Column>
                            <Label>Image</Label>
                            <Input
                                type="url"
                                name="image"
                                ref={imageInputRef}
                                defaultValue={userData ? userData.image : ""}
                                required
                            />
                        </Column>
                        <CursorPointer type="normal">
                            <MdOutlineAutoAwesome
                                size={30}   
                                onClick={() => handleSetDefaultValue(imageInputRef, "https://cdn.pixabay.com/photo/2017/07/18/23/40/group-2517459_1280.png")}
                            />
                        </CursorPointer>
                    </Agrupate>
                    <Button type="submit">Create User</Button>
                </Form>
            </Content>
        </Container>
    );
};