import { Container, Question, Buttons, Button } from "./styles/modalQuestionStyles"

export const ModalQuestionComponent = ({isOpen, onClose, onConfirm, name, func}) => {
    if (!isOpen) return null
    return (
        <Container>
            <Question>Are you sure to delete {name}?</Question>
            <Buttons>
                <Button type="cancel" onClick={onClose}>Cancel</Button>              
                <Button type="delete" onClick={onConfirm}>{func}</Button>                    
            </Buttons>
        </Container>
    )
}