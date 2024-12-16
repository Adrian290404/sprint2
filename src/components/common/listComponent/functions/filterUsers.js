import { activeEmployee } from "./activeEmployee"

export const filterUsers = (users, selectedMenu, selectedOption) => {
    let filteredUsers = [...users]
    if (selectedMenu === "Active Employee") {
        filteredUsers = filteredUsers.filter(users => activeEmployee(users.schedule))
    } 
    else if (selectedMenu === "Inactive Employee") {
        filteredUsers = filteredUsers.filter(users => !activeEmployee(users.schedule))
    }

    switch (selectedOption) {
        case "Newest":
            filteredUsers.sort((a, b) => b.id - a.id)
            break
        case "Alphabetic":
            filteredUsers.sort((a, b) => a.name.localeCompare(b.name))
            break
        default:
            break
    }

    return filteredUsers
}