export const filterRooms = (rooms, selectedMenu, selectedOption) => {
    let filteredRooms = [...rooms]
    if (selectedMenu === "Avaiable Rooms") {
        filteredRooms = filteredRooms.filter(room => room.avaiable)
    } 
    else if (selectedMenu === "Booked Rooms") {
        filteredRooms = filteredRooms.filter(room => !room.avaiable)
    }

    switch (selectedOption) {
        case "Newest":
            filteredRooms.sort((a, b) => b.id - a.id)
            break
        case "Highest price":
            filteredRooms.sort((a, b) => b.rate - a.rate)
            break
        case "Lowest price":
            filteredRooms.sort((a, b) => a.rate - b.rate)
            break
        default:
            break
    }

    return filteredRooms
}