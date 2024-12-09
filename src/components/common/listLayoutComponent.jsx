import { ManagementComponent } from "./managementComponent"
import { PaginationComponent } from "./paginationComponent"
import { ListComponent } from "./listComponent/listComponent"
import { Background } from "./styles/layoutStyles"

export const ListLayoutComponent = () => {
    return <Background>
        <ManagementComponent />
        <ListComponent />
        <PaginationComponent />
    </Background>
}