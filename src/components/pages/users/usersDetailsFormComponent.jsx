import { FormContainer, FormField, TwoFields, Label, Input, CheckboxContainer, CheckboxLabel, Buttons, Icon, Button } from '../rooms/styles/roomDetailsFormStyles'
import { useState } from 'react'
import { TiArrowBackOutline } from "react-icons/ti"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../features/users/usersThunks';

export const UsersDetailsFormComponent = ({id, name, image, job, join, contact, schedule, changePage}) => {
    const [jobDesk, setJobDesk] = useState(job)
    const [userContact, setUserContact] = useState(contact)
    const [userScheduled, setUserScheduled] = useState(schedule)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e, setter, emptyValue) => {
        const value = e.target.value
        setter(value.trim() === "" ? emptyValue : value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedUser = {
            id: id,
            name: name,
            image: image,
            join: join,
            "job_desk": jobDesk,
            "schedule": userScheduled,
            "contact": userContact,
        }
        dispatch(updateUser(updatedUser)).then(() => {
            navigate(0)
        })
    }

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
                        type="number"
                        onChange={(e) => handleChange(e, setUserContact, contact)}
                        placeholder={contact}
                    />
                </FormField>
                <FormField>
                    <Label>scheduled</Label>
                    <Input
                        id="scheduled"
                        name="scheduled"
                        type="text"
                        pattern="^(?:\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b)?$"
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
    )
}