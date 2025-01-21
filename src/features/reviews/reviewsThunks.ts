import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../interfaces/review';

export interface NewReview {
    date: string;
    customer: string;
    rating: number;
    review: string;
    action: "pending" | "approved" | "rejected";
}

export const fetchReviews = createAsyncThunk<Review[]>('reviews/fetchReviews', async () => {
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]") as Review[];
    return reviews;
});

export const updateReview = createAsyncThunk<Review, Review>('reviews/updateReview', async (updatedReview) => {
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]") as Review[];
    const updatedReviews = reviews.map((review) =>
        review.order_id === updatedReview.order_id ? updatedReview : review
    );
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    return updatedReview;
});