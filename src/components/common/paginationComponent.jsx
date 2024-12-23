import { Container, Button } from "./styles/paginationStyles"
import { paginateData } from "./listComponent/functions/paginateData"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { filterRooms } from "./listComponent/functions/filterRooms"
import { filterUsers } from "./listComponent/functions/filterUsers"
import { filterBookings } from "./listComponent/functions/filterBookings"
import { filterReviews } from "./listComponent/functions/filterReviews"
import { setPage } from "../../features/lists/paginationSlice"
import { useEffect } from "react"


export const PaginationComponent = ({ currentPage, setCurrentPage}) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { selectedMenu, selectedOption } = useSelector((state) => state.filter)

    useEffect(() => {
        dispatch(setPage(1))
    }, [selectedMenu, selectedOption, location.pathname])

    const info = () => {
        let data
        let func
        let dataName
        switch (location.pathname) {
            case "/room":
                data=useSelector((state) => state.rooms.rooms)
                func = filterRooms
                dataName = "rooms"
                break
            case "/users":
                data=useSelector((state) => state.users.users)
                func = filterUsers
                dataName = "users"
                break
            case "/bookings":
                data=useSelector((state) => state.bookings.bookings)
                func = filterBookings
                dataName = "bookings"
                break
            case "/dashboard/customerReviews":
                data=useSelector((state) => state.reviews.reviews)
                func = filterReviews
                dataName = "reviews"
                break
            default:
                return { pages: 1, itemsOnPage: 0, totalItems: 0, typeOfData: "data" }
        }
        const filtered = func(data, selectedMenu, selectedOption)
        return {
            "pages": paginateData(filtered, 10).length,
            "itemsOnPage": paginateData(filtered, 10)[currentPage - 1]?.length || 0,
            "totalItems": filtered.length,
            "typeOfData": dataName
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