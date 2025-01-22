import { createAsyncThunk } from '@reduxjs/toolkit';
import { Booking } from '../../interfaces/booking';
import { apiRequest } from '../apiRequest';

interface NewBooking {
    user_id: number;
    room_id: number;
    order_date: string;
    check_in: string;
    check_out: string;
    special_request: string;
    status: string;
}

export const fetchBookings = createAsyncThunk<Booking[]>('bookings/fetchBookings', async (_, { rejectWithValue }) => {
    try {
        return await apiRequest<Booking[]>('http://localhost:3000/api/protected/bookings', 'GET');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const fetchBooking = createAsyncThunk<Booking, number>('bookings/fetchBooking', async (id, { rejectWithValue }) => {
    try {
        return await apiRequest<Booking>(`http://localhost:3000/api/protected/bookings/${id}`, 'GET');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const createBooking = createAsyncThunk<Booking, NewBooking>('bookings/createBooking', async (newBooking, { rejectWithValue }) => {
    try {
        return await apiRequest<Booking>('http://localhost:3000/api/protected/bookings', 'POST', newBooking);
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const updateBooking = createAsyncThunk<Booking, Booking>('bookings/updateBooking', async (updatedBooking, { rejectWithValue }) => {
    try {
        return await apiRequest<Booking>(
            `http://localhost:3000/api/protected/bookings/${updatedBooking.id}`,
            'PUT',
            updatedBooking
        );
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteBooking = createAsyncThunk<number, number>('bookings/deleteBooking', async (id, { rejectWithValue }) => {
    try {
        await apiRequest<void>(`http://localhost:3000/api/protected/bookings/${id}`, 'DELETE');
        return id;
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});