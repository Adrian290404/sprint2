import { FaStar } from "react-icons/fa";
import { ReactNode } from "react";

export const showRating = (rating: number): ReactNode[] => {
    const stars: ReactNode[] = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<FaStar key={i} size={20} />);
    }
    return stars;
};