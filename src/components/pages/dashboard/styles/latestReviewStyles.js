import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    font-family: "Poppins", sans-serif;
    background-color: #FFFFFF;
    border-radius: 0.5em;
    margin-top: 2em; //luego cambiar
    padding: 2em 5em 2em 2em;
`
export const Title = styled.h2`
    color: #393939;
    font-weight: 500;
    font-size: 1.25rem;
    margin-bottom: 1.5em;
`
export const CardsContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 2em;
    position: relative;
`
export const Card = styled.div`
    border: 1px solid #EBEBEB;
    border-radius: .8em;
    padding: 1.5em;
    width: 33%;
    &:hover {
        border: none;
        box-shadow: 0px 16px 30px #00000014;
    }
`
export const Text = styled.p`
    color: #4E4E4E;
    font-weight: 500;
    font-size: 1rem;
`
export const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2em;
`
export const InfoContainer = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
`
export const Image = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 0.7em;
`
export const Name = styled.h3`
    color: #262626;
    font-size: 1rem;
    font-weight: 600;
`
export const Time = styled.p`
    color: #799283;
    font-size: 0.875rem;
    font-weight: 500;
`
export const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    ${(props) => (props.check && "color: #5AD07A; margin-right: .8em;")}
    ${(props) => (props.cross && "color: #E23428")}
    ${(props) => props.arrow &&
        `
            color: #FFFFFF;
            background-color: #135846;
            padding: 0.5em 0.5em 0.3em 0.5em;
            border-radius: 0.8em;
            position: absolute;
            top: 50%;
            right: -7.6em;
            transform: translateY(-50%);
        `
    }
`