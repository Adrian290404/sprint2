import { PaginationComponent } from "../components/common/paginationComponent"
import { BookingsListComponent } from "../components/pages/bookings/bookingsListComponent"

export const BookingsListPage = () => {
    return <>
        <PaginationComponent />
        <BookingsListComponent />
    </>
}