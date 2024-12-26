import { useRef } from 'react'
import { Container, Content, Form, Agrupate, Default, Column, Label, Input, Button, Title, GoBack } from '../../common/styles/createStyles.js'
import { MdOutlineAutoAwesome } from "react-icons/md"
import { TiBackspaceOutline } from "react-icons/ti"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from "../../../features/users/usersThunks.js"

export const UsersCreateComponent = () => {
    const imageInputRef = useRef(null)
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.users)
    const navigate = useNavigate()

    const newUserId = () => {
        let minId = 1
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === minId) {
                minId = users[i].id + 1
            }
        }
        return minId
    }
    
    const handleSetDefaultValue = (inputRef, value) => {
        if (inputRef && inputRef.current) {
            inputRef.current.value = value
        }
    }

    const formatDate = () => {
        const now = new Date()

        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')

        return `${day}/${month}/${year} ${hours}:${minutes}`
    }

    const goBack = () => {
        navigate(-1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target)
        const newUser = {
            id: newUserId(),
            name: formData.get('name'),
            image: formData.get('image'),
            join: formatDate(),
            job_desk: formData.get('job_desk'),
            schedule: formData.get('schedule'),
            contact: formData.get('contact')
        }
    
        dispatch(createUser(newUser))
        navigate(`/users/${newUserId()}`)
    };

    return (
        <Container>
            <Content>
                <GoBack onClick={goBack}>
                    <TiBackspaceOutline size={30}/>
                </GoBack>
                <Title>Create New User</Title>
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
                        required
                    />
                    
                    <Label>Job Desk</Label>
                    <Input
                        type="text"
                        name="job_desk"
                        required
                    />

                    <Label>Schedule</Label>
                    <Input
                        type="text"
                        name="schedule"
                        pattern="^(?:\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b)?$"
                        required
                    />

                    <Label>Contact</Label>
                    <Input
                        type="number"
                        name="contact"
                        required
                    />
                    <Agrupate>
                        <Column>
                            <Label>Image</Label>
                            <Input
                                type="url"
                                name="image"
                                ref={imageInputRef}
                                required
                            />
                        </Column>
                        <Default>
                            <MdOutlineAutoAwesome
                                size={30}
                                onClick={() => handleSetDefaultValue(imageInputRef, "https://cdn.pixabay.com/photo/2017/07/18/23/40/group-2517459_1280.png")}
                            />
                        </Default>
                    </Agrupate>
                    <Button type="submit">Create User</Button>
                </Form>
            </Content>
        </Container>
    )
}