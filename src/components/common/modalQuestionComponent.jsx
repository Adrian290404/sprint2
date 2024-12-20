import { Container, Question, Buttons, Button } from "./styles/modalQuestionStyles"

export const ModalQuestionComponent = ({isOpen, onClose, onConfirm, roomName}) => {
    if (!isOpen) return null
    return (
        <Container>
            <Question>Are you sure to delete {roomName}?</Question>
            <Buttons>
                <Button type="cancel" onClick={onClose}>Cancel</Button>              
                <Button type="delete" onClick={onConfirm}>Delete</Button>                    
            </Buttons>
        </Container>
    )
}