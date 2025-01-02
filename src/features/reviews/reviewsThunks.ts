import { createAsyncThunk } from '@reduxjs/toolkit';

interface Review {
    order_id: number;
    [key: string]: any; 
}

export const fetchReviews = createAsyncThunk<Review[]>(
    'reviews/fetchReviews',
    async () => {
        const reviews = JSON.parse(localStorage.getItem("reviews") || "[]") as Review[];
        return reviews;
    }
);

export const updateReview = createAsyncThunk<Review, Review>(
    'reviews/updateReview',
    async (updatedReview) => {
        const reviews = JSON.parse(localStorage.getItem("reviews") || "[]") as Review[];
        const updatedReviews = reviews.map((review) =>
            review.order_id === updatedReview.order_id ? updatedReview : review
        );
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
        return updatedReview;
    }
);
