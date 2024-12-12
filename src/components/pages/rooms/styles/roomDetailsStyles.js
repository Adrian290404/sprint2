import styled from 'styled-components'

export const Container = styled.div`
    background-color: #f8f8f8;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
`
export const Content = styled.div`
    width: 90%;
    max-width: 40em;
    border-radius: 1em;
    box-shadow: 0px 16px 30px #00000014;
    background-color: #FFFFFF;
    font-family: "Poppins", sans-serif;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
export const ImageContainer = styled.div`
    position: relative;
`
export const Image = styled.img`
    width: 100%;
    height: 40vh;
    object-fit: cover;
    border-radius: 1em 1em 0 0;
`
export const ImageInformation = styled.img`
    width: 120px;
    height: 120px;
    position: absolute;
    top: .5em;
    left: .5em;
`
export const Details = styled.div`
    padding: 1em 2em 2em 2em;
    font-size: 1.2rem;
    position: relative;
`
export const GoBack = styled.div`
    position: absolute;
    top: 1.5em;
    left: 1em;
    cursor: pointer;
    transition: transform 0.2s ease;
    color: #9E9E9E;
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color: #616161;
    }
`
export const Title = styled.h1`
    font-size: 2rem;
    color: #222;
    text-align: center;
    text-decoration: underline;
`
export const TypeAndFloor = styled.div`
    display: flex;
    justify-content: space-evenly;   
    margin-top: 1.5em; 
`
export const Info = styled.span`
    font-weight: 600;
    color: black;
`
export const Facilities = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.5em;
    text-align: center;
    gap: .5em;
`
export const Price = styled.p`
    display: inline;
    font-weight: bold;
    color: black;
    font-size: 1.2rem;
    background-color: #FFFFFF;
    color: #BEAD8E;
    border-radius: .6em .6em 0 0;
    padding: .5em 1em;
    position: absolute;
    bottom: 0;
    right: 1em;
`
export const Small = styled.span`
    font-size: .6rem;
    color: #222;
`
export const Options = styled.div`
    display: flex;
    position: absolute;
    gap: .8em;
    top: 1.5em;
    right: 1em;
`
export const Icon = styled.div`
    cursor: pointer;
    transition: transform 0.2s ease;
    color: ${(props) => (props.delete ? "#E57373" : "#64B5F6")};
    &:hover {
        transform: scale(1.05);
        transform: translateY(-2px);
        color: ${(props) => (props.delete ? "#D32F2F" : "#1976D2")};
    }
`