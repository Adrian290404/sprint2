import { FaStar } from "react-icons/fa";

export const showRating = (rating) => {
    let stars = []
    for (let i = 0; i < rating; i++) {
        stars.push(<FaStar key={i} size={20} />)
    }
    return stars
}