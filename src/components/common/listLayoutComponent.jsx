import { ManagementComponent } from "./managementComponent"
import { PaginationComponent } from "./paginationComponent"
import { ListComponent } from "./listComponent/listComponent"
import { Background } from "./styles/layoutStyles"
import { useState } from "react"

export const ListLayoutComponent = () => {
    const [currentPage, setCurrentPage] = useState(1)

    return <Background>
        <ManagementComponent />
        <ListComponent currentPage={currentPage} />
        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Background>
}