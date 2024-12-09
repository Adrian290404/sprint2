export const formatDate = (dateString) => {
    const date = new Date(dateString)

    const day = date.getDate()
    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
        day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th"
    const month = date.toLocaleString("en-US", { month: "short" })
    const year = date.getFullYear()
    const zero = (date.getHours() <= 9 || (date.getHours() <= 21 && date.getHours() >= 13)) ? "0" : ""
    const hours = zero + date.getHours() % 12 || 12
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const ampm = date.getHours() >= 12 ? "PM" : "AM"

    return `${month} ${day}${suffix} ${year} ${hours}:${minutes} ${ampm}`
}