import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../interfaces/review';
import { fetchReviews, fetchReview, fetchRandomReviewsThunk, createReviewThunk, updateReviewThunk } from './reviewsThunks';

interface ReviewsState {
    reviews: Review[];
    review: Review | null;
}

const initialState: ReviewsState = {
    reviews: [],
    review: null,
};

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.reviews = action.payload;
            })
            .addCase(fetchReview.fulfilled, (state, action: PayloadAction<Review>) => {
                state.review = action.payload;
            })
            .addCase(fetchRandomReviewsThunk.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.reviews = action.payload;
            })
            .addCase(createReviewThunk.fulfilled, (state, action: PayloadAction<Review>) => {
                state.reviews.push(action.payload);
            })
            .addCase(updateReviewThunk.fulfilled, (state, action: PayloadAction<Review>) => {
                const index = state.reviews.findIndex(review => review.order_id === action.payload.order_id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
            });
    }
});

export default reviewsSlice.reducer;
