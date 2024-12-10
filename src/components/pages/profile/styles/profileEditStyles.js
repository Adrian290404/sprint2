import styled from "styled-components"
import { lighten } from "polished";

export const Relative = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`
export const Container = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #EBEBEB;
    border-radius: 2em;
    width: 80%;
    max-width: 25em;
    box-shadow: 0px 16px 30px #00000014;
    font-family: "Poppins", sans-serif;
    text-align: center;
    padding: .8em 2em 1.5em 2em;
`
export const GoBack = styled.div`
    position: absolute;
    top: 1em;
    left: 1em;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
    }
`
export const Title = styled.h2`
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 1em;
    display: inline;
    color: ${(props) => props.color};
    border-bottom: 1px solid ${(props) => props.color};
`
export const Input = styled.input`
    display: block;
    width: 80%;
    height: 2em;
    margin: 2em auto 3em auto;
    outline: none;
    border: 1px solid ${(props) => props.color};
    border-radius: 2em;
    font-family: "Poppins", sans-serif;
    padding: 0 1em;
    text-align: center;
`
export const Button = styled.button`
    width: 50%;
    font-family: "Poppins", sans-serif;
    background-color: ${(props) => props.color};
    color: #FFFFFF;
    border: none;
    border-radius: 1em;
    padding: 0.8em 0;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    &:hover {
        background-color: ${(props) => lighten(0.1, props.color)}; /* Aclara el color base */
        transform: scale(1.05);
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
`