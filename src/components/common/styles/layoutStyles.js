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
    left: ${(props) => (props.isVisible ? "0" : "-15.4em")};
    bottom: 0;
    width: 15.4em;
    transition: left 0.3s ease;
`
export const Header = styled.header`
    background-color: white;
    height: 5.4em;
    position: fixed;
    top: 0;
    left: ${(props) => (props.isVisible ? "15.4em" : "0")};
    right: 0;
    transition: left 0.3s ease;
`;
export const Content = styled.main`
    background-color: #f8f8f8;
    margin-left: ${(props) => (props.isSidebarVisible ? "15.4em" : "0")};
    margin-top: 5.4em;
    flex-grow: 1;
    transition: margin-left 0.3s ease;
    padding: 2em;
`;