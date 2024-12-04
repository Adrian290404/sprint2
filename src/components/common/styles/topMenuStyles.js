import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
`
export const Left = styled.div`
    display: flex;
    justify-content: start;
    margin-left: 2em;
`
export const Right = styled.div`
    display: flex;
    justify-content: end;
    gap: 2em;
    margin-right: 2em;
`
export const Title = styled.h1`
    font-family: "Poppins", sans-serif;
    font-size: 1.75rem;
    font-weight: 600;
    margin-left: 2em;
`