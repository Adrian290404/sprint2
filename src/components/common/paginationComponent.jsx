import { Container, Button } from "./styles/paginationStyles"
import { paginateData } from "./listComponent/functions/paginateData"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { filterRooms } from "./listComponent/functions/filterRooms"
import { setSelectedMenu, setSelectedOption } from "../../features/lists/filterSlice"
import { setPage } from "../../features/lists/paginationSlice"
import { useEffect } from "react"

export const PaginationComponent = ({ currentPage, setCurrentPage}) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { selectedMenu, selectedOption } = useSelector((state) => state.filter)

    useEffect(() => {
        dispatch(setPage(1))
    }, [selectedMenu, selectedOption])

    const info = () => {
        switch (location.pathname) {
            case "/room":
                const rooms = useSelector((state) => state.rooms.rooms)
                const filteredRooms = filterRooms(rooms, selectedMenu, selectedOption)
                console.log(filteredRooms)
                return {
                    "pages": paginateData(filteredRooms, 10).length,
                    "itemsOnPage": paginateData(filteredRooms, 10)[currentPage - 1]?.length || 0,
                    "totalItems": filteredRooms.length,
                    "typeOfData": "rooms"
                }
            default:
                return { pages: 1, itemsOnPage: 0, totalItems: 0, typeOfData: "data" }
        }
    }

    const pagesInfo = info()
    const pages = pagesInfo.pages
    const totalItems = pagesInfo.totalItems
    const itemsOnPage = pagesInfo.itemsOnPage
    const typeOfData = pagesInfo.typeOfData

    const changeIndex = (index) => {
        setCurrentPage(index)
    }

    return (
        <Container>
            <p>Showing {itemsOnPage} of {totalItems} {typeOfData}</p>
            <div>
                <Button controller onClick={() => changeIndex(currentPage === 1 ? pages : currentPage - 1)}>
                    Prev
                </Button>
                {Array.from({ length: pages }, (_, index) => (
                    <Button
                        key={index}
                        isSelected={currentPage === index + 1}
                        onClick={() => changeIndex(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}
                <Button controller onClick={() => changeIndex(currentPage === pages ? 1 : currentPage + 1)}>
                    Next
                </Button>
            </div>
        </Container>
    )
}