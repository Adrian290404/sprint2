import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    font-family: "Poppins", sans-serif;
`
export const Content = styled.div`
    align-items: center;
    justify-content: center;
    padding: 2em;
    max-width: 35em;
    width: 90%;
    margin: 0 auto;
    background-color: #FFFFFF;
    box-shadow: 0px 16px 30px #00000014;
    border-radius: 1em;
`
export const Title = styled.h1`
    margin-bottom: 1em;
    color: #333;
    text-align: center;
    text-decoration: underline;
`
export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .6em;
`
export const Agrupate = styled.div`
    display: flex;
    justify-content: ${(props) => (props.default ? "space-between" : "start" )}space-between;
    gap: 1em;
    align-items: end;
`
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`
export const Default = styled.div`
    cursor: pointer;
    display: flex;
`
export const Label = styled.label`
    font-size: 14px;
    color: #333;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
`
export const Checkbox = styled.input`
    margin-top: 10px;
    transform: scale(1.2);
`
export const Button = styled.button`
    padding: 1em;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 2em;
    &:hover {
      background-color: #45a049;
    }
`