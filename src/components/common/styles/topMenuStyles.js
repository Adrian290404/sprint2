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
    align-items: center;
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
    
`
export const TitleContainer = styled.div`
    margin-left: 3em;
`
export const SubTitleContainer = styled.div`
    color: #6E6E6E;
    font-weight: 500;
    ${(props) => (props.active ? "display: flex" : "display: none")};
`
export const Page = styled.p`
    color: #135846;
`