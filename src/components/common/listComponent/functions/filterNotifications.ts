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