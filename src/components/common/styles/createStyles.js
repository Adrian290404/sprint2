import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    font-family: "Poppins", sans-serif;
    position: relative;
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    font-size: 0.875rem;
    color: #333;
`;

export const Input = styled.input`
    padding: .8em;
    font-size: 0.875rem;
    border: 1px solid #ddd;
    border-radius: 4px;
`
export const Checkbox = styled.input`
    margin-top: 1.5em;
    transform: scale(1.2);
`
export const Button = styled.button`
    padding: 1em;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: .5em;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 2em;
    &:hover {
      background-color: #45a049;
    }
`
export const GoBack = styled.div`
    position: absolute;
    top: 2.7em;
    left: 2em;
    cursor: pointer;
    transition: transform 0.2s ease;
    color:rgb(92, 92, 92);
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color:rgb(0, 0, 0);
    }
`
export const Select = styled.select`
    padding: 0.8em;
    font-size: 0.875rem;
    border: 1px solid #ddd;
    border-radius: 0.4em;
    background-color: #fff;
    color: #333;
    appearance: none;
    cursor: pointer;
    outline: none;

    ${({ $type }) => $type === "Refund" && `
        color: #E23428;
        background-color: #FFEDEC;
    `}
    ${({ $type }) => $type === "Booked" && `
        color: #5AD07A;
        background-color: #E8FFEE;
    `}
    ${({ $type }) => $type === "Pending" && `
        color: #6D6D6D;
        background-color: #E2E2E2;
    `}
    ${({ $type }) => $type === "Cancelled" && `
        color: #BEBEBE;
        background-color: #575757;
    `}
`
export const Textarea = styled.textarea`
    padding: 0.8em;
    font-size: 0.875rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    width: 100%;
    height: 8em;
    outline: none;
    resize: none;
`
export const Error = styled.p`
    color: red;
`