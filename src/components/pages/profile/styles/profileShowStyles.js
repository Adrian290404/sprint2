import styled from "styled-components"

export const ProfileBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    position: relative;
`
export const Container = styled.div`
    border: 2px solid #EBEBEB;
    border-radius: 2em;
    width: 80%;
    max-width: 25em;
    box-shadow: 0px 16px 30px #00000014;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
`
export const ColorBand = styled.div`
    width: 100%;
    height: 8em;
    background-color: ${(props) => props.color};
    border-radius: 2em 2em 0 0;
`
export const Content = styled.div`
    text-align: center;
    padding: 0 1em 3em 1em;
    font-family: "Poppins", sans-serif;
`
export const Image = styled.img`
    width: 7em;
    height: 7em;
    margin-top: -3.5em;
    border: 5px solid #FFFFFF;
    border-radius: 50%;
`
export const TextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
`
export const Name = styled.h2`
    font-size: 2rem;
    font-weight: 500;
`
export const Icon = styled.div`
    cursor: pointer;
    display: flex;
    background-color: ${(props) => props.color};
    color: #FFFFFF;
    padding: .2em;
    border-radius: .5em;
`
export const Email = styled.h3`
    font-size: 1rem;
    font-weight: 300;
`