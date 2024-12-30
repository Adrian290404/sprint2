export const filterBookings = (bookings, selectedMenu, selectedOption) => {
    let filteredBookings = [...bookings]
    if (selectedMenu === "Pending") {
        filteredBookings = filteredBookings.filter(booking => booking.status === "Pending")
    } 
    else if (selectedMenu === "Booked") {
        filteredBookings = filteredBookings.filter(booking => booking.status === "Booked")
    } 
    else if (selectedMenu === "Cancelled") {
        filteredBookings = filteredBookings.filter(booking => booking.status === "Cancelled")
    } 
    else if (selectedMenu === "Refund") {
        filteredBookings = filteredBookings.filter(booking => booking.status === "Refund")
    } 

    switch (selectedOption) {
        case "Newest":
            filteredBookings.sort((a, b) => b.id - a.id)
            break
        case "Guest":
            // filteredBookings.sort((a, b) => a.name.localeCompare(b.name)) ORDENAR ALFABETICAMENTE CUANDO YA ESTE CONECTADO A BBDD
            break
        case "Check in":
            filteredBookings.sort((a, b) => new Date(a.check_in) - new Date(b.check_in))
            break
        case "Check out":
            filteredBookings.sort((a, b) => new Date(a.check_out) - new Date(b.check_out))
            break
        default:
            break
    }

    return filteredBookings
}