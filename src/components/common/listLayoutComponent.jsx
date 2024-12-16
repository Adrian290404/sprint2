import { ManagementComponent } from "./managementComponent"
import { PaginationComponent } from "./paginationComponent"
import { ListComponent } from "./listComponent/listComponent"
import { Background } from "./styles/layoutStyles"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setPage } from "../../features/lists/paginationSlice"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

export const ListLayoutComponent = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector((state) => state.pagination.currentPage)
    const location = useLocation()

    useEffect(() => {
        dispatch(setPage(1))
    }, [location.pathname, dispatch])

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage))
    }

    return (
        <Background>
            <ManagementComponent />
            <ListComponent currentPage={currentPage} />
            <PaginationComponent currentPage={currentPage} setCurrentPage={handlePageChange} />
        </Background>
    )
}