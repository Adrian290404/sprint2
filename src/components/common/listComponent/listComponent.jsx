import { useNavigate, useLocation } from "react-router-dom"
import { Table, Row, Th } from "./styles/listStyles"
import { BookingsList } from "./bookingsList"
import { RoomsList } from "./roomsList"
import { UsersList } from "./usersList"
import { ReviewsList } from "./reviewsList"

export const ListComponent = ({ currentPage }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const dataMapping = {
        "/bookings": {
            headers: ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"],
            Component: BookingsList
        },
        "/room": {
            headers: ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", "Status"],
            Component: RoomsList
        },
        "/users": {
            headers: ["Name", "Job Desk", "Schedule", "Contact", "Status"],
            Component: UsersList
        },
        "/dashboard/customerReviews": {
            headers: ["Order ID", "Date", "Customer", "Comment", "Action"],
            Component: ReviewsList
        }
    }

    const { headers, Component } = dataMapping[location.pathname] || { headers: [], Component: null }

    const handleNavigate = (id) => {
        navigate(`${location.pathname}/${id}`)
    }

    return (
        <Table>
            <thead>
                <Row type="head">
                    {headers.map((header, index) => (
                        <Th key={index}>{header}</Th>
                    ))}
                </Row>
            </thead>
            <tbody>
                {Component && <Component currentPage={currentPage} handleNavigate={handleNavigate} />}
            </tbody>
        </Table>
    )
}