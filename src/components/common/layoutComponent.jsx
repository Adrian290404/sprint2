import { SideMenuComponent } from "./sideMenuComponent"
import { TopMenuComponent } from "./topMenuComponent"
import { Outlet } from "react-router-dom"
import { Layout, Sidebar, Header, Content } from "./styles/layoutStyles"
import { useState } from "react"

export const LayoutComponent = ({ onLogout }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)
    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev)
    }
    
    return (
        <Layout>
            <Sidebar isVisible={isSidebarVisible}>
                <SideMenuComponent />
            </Sidebar>
            <Header isVisible={isSidebarVisible}>
                <TopMenuComponent onToggleSidebar={toggleSidebar} onLogout={onLogout} />
            </Header>
            <Content isSidebarVisible={isSidebarVisible}>
                <Outlet />
            </Content>
        </Layout>
    )
}