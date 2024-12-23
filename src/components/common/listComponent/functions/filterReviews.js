export const filterReviews = (reviews, selectedMenu, selectedOption) => {
    let filteredReviews = [...reviews]
    if (selectedMenu === "Published") {
        filteredReviews = filteredReviews.filter(reviews => reviews.action === "Published")
    } 
    else if (selectedMenu === "Archived") {
        filteredReviews = filteredReviews.filter(reviews => reviews.action === "Archived")
    } 

    switch (selectedOption) {
        case "Newest":
            filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date))
            break
        case "Best Valoration":
            filteredReviews.sort((a, b) => b.rating - a.rating)
            break
        case "Worst Valoration":
            filteredReviews.sort((a, b) => a.rating - b.rating)
            break
        default:
            break
    }

    return filteredReviews
}