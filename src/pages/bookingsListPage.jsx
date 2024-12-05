import { ManagementComponent } from "../components/common/managementComponent"
import { PaginationComponent } from "../components/common/paginationComponent"
// import { BookingsListComponent } from "../components/pages/bookings/bookingsListComponent"
import { ListComponent } from "../components/common/listComponent"
import { Background } from "../components/common/styles/layoutStyles"

export const BookingsListPage = () => {
    return <Background>
        <ManagementComponent />
        {/* <BookingsListComponent /> */}
        <ListComponent />
        <PaginationComponent />
    </Background>
}