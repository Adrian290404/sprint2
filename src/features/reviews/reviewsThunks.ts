import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../interfaces/review';
import { apiRequest } from '../apiRequest';

const baseUrl = import.meta.env.VITE_API_URL + '/protected/reviews';

export interface NewReview {
    order_id: number;
    date: string;
    customer_id: number;
    rating: number;
    review: string;
    action: "pending" | "approved" | "rejected";
}

export const fetchReviews = createAsyncThunk<Review[]>('reviews/fetchReviews',async (_, { rejectWithValue }) => {
        try {
            return await apiRequest<Review[]>(baseUrl, 'GET');
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchReview = createAsyncThunk<Review, number>(
    'reviews/fetchReview',
    async (order_id, { rejectWithValue }) => {
        try {
            return await apiRequest<Review>(`${baseUrl}/${order_id}`, 'GET');
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchRandomReviewsThunk = createAsyncThunk<Review[]>(
    'reviews/fetchRandomReviews',
    async (_, { rejectWithValue }) => {
        try {
            // Asumimos que en tu API tienes un endpoint para obtener reviews aleatorias.
            return await apiRequest<Review[]>(`${baseUrl}/random`, 'GET');
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createReviewThunk = createAsyncThunk<Review, NewReview>(
    'reviews/createReview',
    async (newReview, { rejectWithValue }) => {
        try {
            return await apiRequest<Review>(baseUrl, 'POST', newReview);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateReviewThunk = createAsyncThunk<Review, { order_id: number; action: "pending" | "approved" | "rejected" }>(
    'reviews/updateReview',
    async ({ order_id, action }, { rejectWithValue }) => {
        try {
            // Llamamos al endpoint para actualizar el estado de la review
            return await apiRequest<Review>(`${baseUrl}/${order_id}`, 'PUT', { action });
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
