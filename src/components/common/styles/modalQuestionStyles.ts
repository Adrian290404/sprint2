import styled from "styled-components"

interface ButtonProps {
    type: "cancel" | "delete";
}
  
export const Container = styled.div`
    padding: 2em;
    font-family: "Poppins", sans-serif;
    background-color: ${({ theme }) => theme.background};
    box-shadow: 0px 16px 30px ${({ theme }) => theme.modalShadow};
    position: fixed;
    top: 50%;
    left: 56.5%;
    transform: translate(-50%, -50%);
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
    border-radius: 1em;
`;
  
export const Question = styled.div`
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
`;
  
export const Buttons = styled.div`
    display: flex;
    justify-content: center;
    gap: 2em;
    margin-top: 2em;
`;
  
export const Button = styled.button<ButtonProps>`
    cursor: pointer;
    font-size: 1.5rem;
    padding: 1em 3em;
    border: none;
    background-color: ${({ theme, type }) => type === "cancel" ? theme.modalButtonCancelBg : theme.modalButtonConfirmBg};
    color: ${({ theme, type }) => type === "cancel" ? theme.modalButtonCancelText : theme.modalButtonConfirmText};
    transition: transform 0.2s ease;
    border-radius: 0.7em;

    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        background-color: ${({ theme, type }) => type === "cancel" ? theme.modalButtonCancelBgHover : theme.modalButtonConfirmBgHover};
    }
`;