import { activeEmployee } from "./activeEmployee";
import { Employee } from "../../../../interfaces/employee";

export const filterUsers = (
    users: Employee[],
    selectedMenu: string,
    selectedOption: string
): Employee[] => {
    let filteredUsers = [...users];
    if (selectedMenu === "Active Employee") {
        filteredUsers = filteredUsers.filter(user => activeEmployee(user.schedule));
    } 
    else if (selectedMenu === "Inactive Employee") {
        filteredUsers = filteredUsers.filter(user => !activeEmployee(user.schedule));
    }
    switch (selectedOption) {
        case "Newest":
            filteredUsers.sort((a, b) => b.id - a.id);
            break;
        case "Alphabetic":
            filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }
    return filteredUsers;
};
