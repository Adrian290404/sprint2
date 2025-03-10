import { Notification } from "../../../../interfaces/notification";

export const filterNotifications = (
    notifications: Notification[],
    selectedMenu: string,
    selectedOption: string
): Notification[] => {
    let filteredNotifications = [...notifications];
    if (selectedMenu === "Create") {
        filteredNotifications = filteredNotifications.filter((notification) => notification.type == "create");
    }
    else if (selectedMenu === "Update") {
        filteredNotifications = filteredNotifications.filter((notification) => notification.type == "update");
    }
    else if (selectedMenu === "Delete") {
        filteredNotifications = filteredNotifications.filter((notification) => notification.type == "delete");
    }
    else if (selectedMenu === "Bookings") {
        filteredNotifications = filteredNotifications.filter((notification) => notification.collection == "bookings");
    }
    else if (selectedMenu === "Rooms") {
        filteredNotifications = filteredNotifications.filter((notification) => notification.collection == "rooms");
    }
    else if (selectedMenu === "Employees") {
        filteredNotifications = filteredNotifications.filter((notification) => notification.collection == "employees");
    }
    switch (selectedOption) {
        case "Newest":
            filteredNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            break;
        case "Oldest":
            filteredNotifications.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            break;        
        default:
            break;
    }
    return filteredNotifications;
};  