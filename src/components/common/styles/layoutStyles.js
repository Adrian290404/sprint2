import styled from "styled-components";

export const Layout = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`
export const Sidebar = styled.aside`
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 15.4em;
`
export const Header = styled.header`
    background-color: white;
    height: 5.4em;
    position: fixed;
    top: 0;
    left: 15.4em;
    right: 0;
`;
export const Content = styled.main`
    background-color: purple; //prueba
    margin-left: 15.4em;
    margin-top: 5.4em;
    flex-grow: 1;
`;