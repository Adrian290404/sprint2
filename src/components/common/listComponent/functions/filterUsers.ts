import { activeEmployee } from "./activeEmployee";

interface User {
    id: number;
    name: string;
    schedule: boolean;
}

export const filterUsers = (
    users: User[],
    selectedMenu: string,
    selectedOption: string
): User[] => {
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
