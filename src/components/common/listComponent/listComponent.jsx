import { useNavigate, useLocation } from "react-router-dom"
import { bookings } from "../../../data/bookings"
import { rooms } from "../../../data/rooms"
import { employees } from "../../../data/employees"
import { Table, Row, Th } from "./styles/listStyles"
import { BookingsList } from "./bookingsList"
import { RoomsList } from "./roomsList"
import { ConciergeList } from "./conciergeList"

export const ListComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const dataMapping = {
    "/bookings": {
      data: bookings,
      headers: ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"],
      Component: BookingsList
    },
    "/room": {
      data: rooms,
      headers: ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", "Status"],
      Component: RoomsList
    },
    "/concierge": {
      data: employees,
      headers: ["Name", "Job Desk", "Schedule", "Contact", "Status"],
      Component: ConciergeList
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
        {Component && <Component data={data} handleNavigate={handleNavigate} />}
      </tbody>
    </Table>
  )
}