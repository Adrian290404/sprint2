import styled from "styled-components"

interface ButtonProps {
    type: "cancel" | "delete";
  }
  
  export const Container = styled.div`
    padding: 2em;
    font-family: "Poppins", sans-serif;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 16px 30px rgba(0, 0, 0, 0.56);
    position: fixed;
    top: 50%;
    left: 56.5%;
    transform: translate(-50%, -50%);
    border-radius: 1em;
  `;
  
  export const Question = styled.div`
    font-size: 2rem;
    font-weight: 600;
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
    background-color: ${(props) => (props.type === "cancel" ? "#e0e0e0" : "#e74c3c")};
    color: ${(props) => (props.type === "cancel" ? "#333333" : "#ffffff")};
    transition: transform 0.2s ease;
    border-radius: 0.7em;
  
    &:hover {
      transform: scale(1.05);
      transform: translateY(-2px);
      background-color: ${(props) => (props.type === "cancel" ? "#bdbdbd" : "#c0392b")};
    }
  `;