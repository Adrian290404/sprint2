import { createSlice } from '@reduxjs/toolkit'
import { fetchReviews, updateReview } from './reviewsThunks'

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: JSON.parse(localStorage.getItem("reviews")) || [],
        review: null
    },
    reducers: {
        saveReviewsToLocalStorage(state) {
            localStorage.setItem("reviews", JSON.stringify(state.reviews))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload
                localStorage.setItem("reviews", JSON.stringify(state.reviews))
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const index = state.reviews.findIndex((reviews) => reviews.order_id === action.payload.order_id)
                if (index !== -1) {
                    state.reviews[index] = action.payload
                    localStorage.setItem("reviews", JSON.stringify(state.reviews))
                }
            })
    }
})

export const { saveReviewsToLocalStorage } = reviewsSlice.actions