import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBookings, fetchBooking, createBooking, updateBooking, deleteBooking } from './bookingsThunks';
import { Booking } from '../../interfaces/booking';

interface BookingsState {
    bookings: Booking[];
    booking: Booking | null;
    loading: boolean;
    error: string | null;
}

const initialState: BookingsState = {
    bookings: [],
    booking: null,
    loading: false,
    error: null,
};

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        
            // Fetch all bookings
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.bookings = action.payload;
                state.loading = false;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch a single booking
            .addCase(fetchBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.booking = action.payload;
                state.loading = false;
            })
            .addCase(fetchBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create a booking
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.bookings.push(action.payload);
                state.loading = false;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update a booking
            .addCase(updateBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete a booking
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<number>) => {
                state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});