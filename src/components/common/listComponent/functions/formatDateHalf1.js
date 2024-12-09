export const formatDateHalf1 = (dateString) => {
    const date = new Date(dateString)
    const options = { month: "short", day: "numeric", year: "numeric" }
    return new Intl.DateTimeFormat("en-US", options).format(date)
}