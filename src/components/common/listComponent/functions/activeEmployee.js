export const activeEmployee = (str) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const [startDay, endDay] = str.split(", ")
    const today = new Date().toLocaleString("en-US", { weekday: "long" })

    const startIndex = daysOfWeek.indexOf(startDay)
    const endIndex = daysOfWeek.indexOf(endDay)
    const todayIndex = daysOfWeek.indexOf(today)

    if (startIndex <= endIndex) {
        return todayIndex >= startIndex && todayIndex <= endIndex
    } 
    else {
        return todayIndex >= startIndex || todayIndex <= endIndex
    }
}