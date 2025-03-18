import { SideMenuComponent } from "./sideMenuComponent";
import { TopMenuComponent } from "./topMenuComponent";
import { Outlet } from "react-router-dom";
import { Layout, Sidebar, Header, Content } from "./styles/layoutStyles";
import { useState } from "react";

interface LayoutComponentProps {
    onLogout: () => void;
    toggleTheme: () => void;
}

export const LayoutComponent = ({ onLogout, toggleTheme }: LayoutComponentProps) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    return (
        <Layout>
            <Sidebar isVisible={isSidebarVisible}>
                <SideMenuComponent />
            </Sidebar>
            <Header isVisible={isSidebarVisible}>
                <TopMenuComponent 
                    onToggleSidebar={toggleSidebar} 
                    onLogout={onLogout} 
                    toggleTheme={toggleTheme} 
                />
            </Header>
            <Content isSidebarVisible={isSidebarVisible}>
                <Outlet />
            </Content>
        </Layout>
    );
};