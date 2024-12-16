import { Row, Td, Container, Image, InfoContainer, TextLight, ConciergeStatus } from "./styles/listStyles"
import { FaPhoneAlt } from "react-icons/fa"
import { activeEmployee } from "./functions/activeEmployee"
import { useSelector, useDispatch } from "react-redux"
import { paginateData } from "./functions/paginateData"
import { filterUsers } from "./functions/filterUsers"
import { useEffect } from "react"

export const UsersList = ({ currentPage, handleNavigate }) => {

    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.users)
    const { selectedMenu, selectedOption } = useSelector((state) => state.filter)

    const filteredUsers = filterUsers(users, selectedMenu, selectedOption)
    const paginatedUsers = paginateData(filteredUsers, 10)[currentPage - 1] || []

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers())
        }
    }, [dispatch, users.length])
    
    return (
        paginatedUsers.map((employee) => (
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
                    <ConciergeStatus active={activeEmployee(employee.schedule)}>
                        {activeEmployee(employee.schedule) ? "Active" : "Inactive"}
                    </ConciergeStatus>
                </Td>
            </Row>
        ))
    )
}