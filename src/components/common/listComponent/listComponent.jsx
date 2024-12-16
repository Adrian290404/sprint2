import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Table, Row, Th } from "./styles/listStyles"
import { BookingsList } from "./bookingsList"
import { RoomsList } from "./roomsList"
import { UsersList } from "./usersList"
import { ReviewsList } from "./reviewsList"

export const ListComponent = ({ currentPage }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const rooms = useSelector((state) => state.rooms.rooms)

    const dataMapping = {
        "/bookings": {
            data: [],
            headers: ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"],
            Component: BookingsList
        },
        "/room": {
            data: rooms,
            headers: ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", "Status"],
            Component: RoomsList
        },
        "/users": {
            data: [],
            headers: ["Name", "Job Desk", "Schedule", "Contact", "Status"],
            Component: UsersList
        },
        "/dashboard/customerReviews": {
            data: [],
            headers: ["Order ID", "Date", "Customer", "Comment", "Action"],
            Component: ReviewsList
        }
    }

    const { data, headers, Component } = dataMapping[location.pathname] || { data: [], headers: [], Component: null }

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
                {Component && <Component data={data} currentPage={currentPage} handleNavigate={handleNavigate} />}
            </tbody>
        </Table>
    )
}