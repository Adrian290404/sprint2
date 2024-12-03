import { SideMenuComponent } from "./sideMenuComponent"
import { TopMenuComponent } from "./topMenuComponent"
import { Outlet } from "react-router-dom"
import { Layout } from "./styles/layoutStyles"
import { Sidebar } from "./styles/layoutStyles"
import { Header } from "./styles/layoutStyles"
import { Content } from "./styles/layoutStyles"

export const LayoutComponent = () => {
    return <>
        <Layout>
            <Sidebar>
                <SideMenuComponent />
            </Sidebar>
            <Header>
                <TopMenuComponent />
            </Header>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    </>
}