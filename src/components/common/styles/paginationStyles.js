import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #6e6e6e;
`
export const List = styled.ul`
    display: flex;
    list-style-type: none;
    margin-bottom: 2em;
`
export const Item = styled.li`
    padding: .6em 2em;
    cursor: pointer;
    ${({ isSelected }) => (isSelected ? "border-bottom: 1px solid #135846; color: #135846" : "border-bottom: 1px solid #d4d4d4; color: #6e6e6e")};
`
export const Buttons = styled.div`

`
export const Button = styled.button`

`
export const Filter = styled.select`

`