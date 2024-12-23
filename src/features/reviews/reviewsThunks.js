import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || []
    return reviews
})
export const updateReview = createAsyncThunk('reviews/updateReview', async (updatedReview) => {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || []
    const updatedReviews = reviews.map((review) =>
        review.order_id === updatedReview.order_id ? updatedReview : review
    )
    localStorage.setItem("reviews", JSON.stringify(updatedReviews))
    return updatedReview
})
