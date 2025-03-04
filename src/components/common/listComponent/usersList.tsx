import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Td, Container, Image, InfoContainer, TextLight, ConciergeStatus } from "./styles/listStyles"
import { FaPhoneAlt } from "react-icons/fa";
import { activeEmployee } from "./functions/activeEmployee";
import { paginateData } from "./functions/paginateData";
import { filterUsers } from "./functions/filterUsers";
import { fetchUsers } from "../../../features/users/usersThunks"; 
import { RootState, AppDispatch } from "../../../features/store";
import { Employee } from "../../../interfaces/employee";

interface UsersListProps {
    currentPage: number;
    handleNavigate: (id: number) => void;
}

export const UsersList: React.FC<UsersListProps> = ({ currentPage, handleNavigate }) => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users);
    const { selectedMenu, selectedOption } = useSelector((state: RootState) => state.filter);

    const filteredUsers = filterUsers(users, selectedMenu, selectedOption);
    const paginatedUsers = paginateData(
        filteredUsers.filter((employee): employee is Employee => employee !== undefined && employee !== null),
        10
    )[currentPage - 1] || [];

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.length]);

    return (
        <>
            {paginatedUsers.map((employee: Employee) => (
                <Row key={employee.id} $type="body">
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
            ))}
        </>
    );
};