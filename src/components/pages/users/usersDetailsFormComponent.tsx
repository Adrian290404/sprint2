import { FormContainer, FormField, Label, Input, Buttons, Icon, Button } from '../../common/styles/detailsFormStyles';
import { useState, ChangeEvent, FormEvent } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../features/users/usersThunks';
import { AppDispatch } from '../../../features/store';

interface UsersDetailsFormComponentProps {
    id: number;
    name: string;
    image: string;
    job: string;
    join: string;
    contact: string;
    schedule: string;
    changePage: () => void;
}

export const UsersDetailsFormComponent: React.FC<UsersDetailsFormComponentProps> = ({ id, name, image, job, join, contact, schedule, changePage }) => {
    const [jobDesk, setJobDesk] = useState<string>(job);
    const [userContact, setUserContact] = useState<string>(contact);
    const [userScheduled, setUserScheduled] = useState<string>(schedule);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<string>>,
        emptyValue: string
    ) => {
        const value = e.target.value;
        setter(value.trim() === "" ? emptyValue : value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUser = {
            id,
            name,
            image,
            join,
            job_desk: jobDesk,
            schedule: userScheduled,
            contact: userContact,
        };
        dispatch(updateUser(updatedUser)).then(() => {
            navigate(0);
        });
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Label>Job Desk</Label>
                    <Input
                        id="job"
                        name="job"
                        type="text"
                        onChange={(e) => handleChange(e, setJobDesk, job)}
                        placeholder={job}
                    />
                </FormField>
                <FormField>
                    <Label>Contact</Label>
                    <Input
                        id="contact"
                        name="contact"
                        type="text"
                        onChange={(e) => handleChange(e, setUserContact, contact)}
                        placeholder={contact}
                    />
                </FormField>
                <FormField>
                    <Label>Scheduled</Label>
                    <Input
                        id="scheduled"
                        name="scheduled"
                        type="text"
                        pattern="^(?:(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday))?$"
                        onChange={(e) => handleChange(e, setUserScheduled, schedule)}
                        placeholder={schedule}
                    />
                </FormField>
                <Buttons>
                    <Icon title="go back">
                        <TiArrowBackOutline size={30} onClick={changePage} />
                    </Icon>
                    <Button type="submit">Save Changes</Button>
                </Buttons>
            </form>
        </FormContainer>
    );
};