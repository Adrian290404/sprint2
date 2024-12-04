import styled from "styled-components";

export const BackgroundContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    transition: background-image 1s;
`
export const LogInContainer = styled.div`
    padding: 2em 1em 1em 1em;
    background-color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 4px;
    border-radius: 1em;
    width: 50%;
    min-width: 15em;
    max-width: 30em;
`
export const Title = styled.h2`
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1em;
`
export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2em;
    width: 100%;
    padding: 0 1em;
`
export const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid black;
`
export const Button = styled.button`
    display: block;
    color: #FFFFFF;
    font-family: "Archivo", sans-serif;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.1875rem;
    padding: .7em;
    margin: 0 auto;
    margin-top: 3em;
    background-color: #BEAD8E;
    border: none;
    border-radius: 1em;
    width: 80%;
    cursor: pointer;
`
export const MarginRight = styled.div`
    cursor: pointer;
    margin-right: 1em;
`