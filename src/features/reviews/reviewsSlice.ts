import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReviews, updateReview } from './reviewsThunks';

interface Review {
    order_id: number;
    [key: string]: any; 
}

interface ReviewsState {
    reviews: Review[];
    review: Review | null;
}

const initialState: ReviewsState = {
    reviews: JSON.parse(localStorage.getItem("reviews") || "[]"),
    review: null
};

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        saveReviewsToLocalStorage(state) {
            localStorage.setItem("reviews", JSON.stringify(state.reviews));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.reviews = action.payload;
                localStorage.setItem("reviews", JSON.stringify(state.reviews));
            })
            .addCase(updateReview.fulfilled, (state, action: PayloadAction<Review>) => {
                const index = state.reviews.findIndex((review) => review.order_id === action.payload.order_id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                    localStorage.setItem("reviews", JSON.stringify(state.reviews));
                }
            });
    }
});

export const { saveReviewsToLocalStorage } = reviewsSlice.actions;

export default reviewsSlice.reducer;