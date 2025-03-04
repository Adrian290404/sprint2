export const activeEmployee = (str: string): boolean => {
    const daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [startDay, endDay] = str.split(", ");
    const today: string = new Date().toLocaleString("en-US", { weekday: "long" });

    const startIndex: number = daysOfWeek.indexOf(startDay);
    const endIndex: number = daysOfWeek.indexOf(endDay);
    const todayIndex: number = daysOfWeek.indexOf(today);

    if (startIndex <= endIndex) {
        return todayIndex >= startIndex && todayIndex <= endIndex;
    } 
    else {
        return todayIndex >= startIndex || todayIndex <= endIndex;
    }
};