import styled from "styled-components";

interface SidebarProps {
    isVisible: boolean;
};

interface HeaderProps {
    isVisible: boolean;
};

interface ContentProps {
    isSidebarVisible: boolean;
};

export const Layout = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`;
export const Sidebar = styled.aside<SidebarProps>`
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.3s ease;
    position: fixed;
    top: 0;
    left: ${(props) => (props.isVisible ? "0" : "-15.4em")};
    bottom: 0;
    width: 15.4em;
    transition: left 0.3s ease, background-color 0.3s ease;
`;
export const Header = styled.header<HeaderProps>`
    background-color: ${({ theme }) => theme.background};
    
    height: 5.4em;
    position: fixed;
    z-index: 1;
    top: 0;
    left: ${(props) => (props.isVisible ? "15.4em" : "0")};
    right: 0;
    transition: left 0.3s ease, background-color 0.3s ease;
`;
export const Content = styled.main<ContentProps>`
    margin-left: ${(props) => (props.isSidebarVisible ? "15.4em" : "0")};
    margin-top: 5.4em;
    flex-grow: 1;
    transition: margin-left 0.3s ease;
`;
export const Background = styled.div`
    background-color: ${({ theme }) => theme.pageContent};
    padding: 2em;
    width: 100%;
    min-height: 100%;
`;