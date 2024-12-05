import { ManagementComponent } from "../components/common/managementComponent"
import { PaginationComponent } from "../components/common/paginationComponent"
import { ListComponent } from "../components/common/listComponent"
import { Background } from "../components/common/styles/layoutStyles"

export const ConciergeListPage = () => {
    return <Background>
        <ManagementComponent />
        <ListComponent />
        <PaginationComponent />
</Background>
}