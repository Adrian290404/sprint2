import { Row, Td, Container, Image, InfoContainer, TextLight, ConciergeStatus } from "./styles/listStyles"
import { FaPhoneAlt } from "react-icons/fa"

export const UsersList = ({ data, handleNavigate }) => {
  const isActive = (schedule) => {
    const [startDay, endDay] = schedule.split(", ")
    const today = new Date().toLocaleString("en-US", { weekday: "long" })
    return today >= startDay && today <= endDay
  }

  return (
    data.map((employee) => (
      <Row key={employee.id} type="body">
        <Td>
          <Container onClick={() => handleNavigate(employee.id)}>
            <Image type="employee" src={employee.image} alt={employee.name} />
            <InfoContainer>
              <p>{employee.name}</p>
              <TextLight>#{employee.id}</TextLight>
            </InfoContainer>
          </Container>
        </Td>
        <Td>{employee.job_desk}</Td>
        <Td>{employee.schedule}</Td>
        <Td>
          <FaPhoneAlt /> {employee.contact}
        </Td>
        <Td>
          <ConciergeStatus active={isActive(employee.schedule)}>
            {isActive(employee.schedule) ? "Active" : "Inactive"}
          </ConciergeStatus>
        </Td>
      </Row>
    ))
  )
}