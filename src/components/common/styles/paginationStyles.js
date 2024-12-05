import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    font-size: .8rem;
    font-weight: 400;
    color: #393939;
    align-items: center;
    margin-top: 2em;
`
export const Button = styled.button`
    padding: ${(props) => (props.controller ? "1em 2em" : "1em 1.2em")};
    margin: 0.2em;
    border: ${(props) => (props.controller ? "1px solid #135846" : "none")};;
    border-radius: 1em;
    background: ${(props) => (props.isSelected ? "#135846" : "#FFFFFF")};
    color: ${(props) => (props.controller ? "#135846" : ((props.isSelected ? "#FFFFFF" : "#393939")))} ;
    cursor: pointer;
`