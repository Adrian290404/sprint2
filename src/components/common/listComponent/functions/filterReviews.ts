interface Review {
    action: string;
    date: string;
    rating: number;
}
  
export const filterReviews = (
    reviews: Review[],
    selectedMenu: string,
    selectedOption: string
): Review[] => {
    let filteredReviews = [...reviews];
    if (selectedMenu === "Published") {
        filteredReviews = filteredReviews.filter((review) => review.action === "Published");
    } 
    else if (selectedMenu === "Archived") {
        filteredReviews = filteredReviews.filter((review) => review.action === "Archived");
    }
    switch (selectedOption) {
        case "Newest":
            filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            break;
        case "Best Valoration":
            filteredReviews.sort((a, b) => b.rating - a.rating);
            break;
        case "Worst Valoration":
            filteredReviews.sort((a, b) => a.rating - b.rating);
            break;
        default:
            break;
    }
    return filteredReviews;
};