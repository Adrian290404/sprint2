interface Booking {
    id: number;
    status: string;
    check_in: string;
    check_out: string;
    // Campos necesarios
}

export const filterBookings = (
    bookings: Booking[], 
    selectedMenu: string, 
    selectedOption: string
): Booking[] => {
    let filteredBookings = [...bookings];

    if (selectedMenu === "Pending") {
        filteredBookings = filteredBookings.filter(booking => booking.status === "Pending");
    } 
    else if (selectedMenu === "Booked") {
        filteredBookings = filteredBookings.filter(booking => booking.status === "Booked");
    } 
    else if (selectedMenu === "Cancelled") {
        filteredBookings = filteredBookings.filter(booking => booking.status === "Cancelled");
    } 
    else if (selectedMenu === "Refund") {
        filteredBookings = filteredBookings.filter(booking => booking.status === "Refund");
    } 

    switch (selectedOption) {
        case "Newest":
            filteredBookings.sort((a, b) => b.id - a.id);
            break;
        case "Guest":
            // filteredBookings.sort((a, b) => a.name.localeCompare(b.name)) // Ordenar alfabéticamente cuando ya esté conectado a la base de datos
            break;
        case "Check in":
            filteredBookings.sort((a, b) => new Date(a.check_in).getTime() - new Date(b.check_in).getTime());
            break;
        case "Check out":
            filteredBookings.sort((a, b) => new Date(a.check_out).getTime() - new Date(b.check_out).getTime());
            break;
        default:
            break;
    }

    return filteredBookings;
};