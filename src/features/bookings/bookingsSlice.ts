import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBookings, fetchBooking, createBooking, updateBooking, deleteBooking } from './bookingsThunks';
import { Booking } from '../../interfaces/booking';

interface BookingsState {
    bookings: Booking[];
    booking: Booking | null;
}

const initialState: BookingsState = {
    bookings: JSON.parse(localStorage.getItem("bookings") || "[]"),
    booking: null,
};

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        saveBookingsToLocalStorage(state) {
            localStorage.setItem("bookings", JSON.stringify(state.bookings));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.bookings = action.payload;
                localStorage.setItem("bookings", JSON.stringify(state.bookings));
            })
            .addCase(fetchBooking.fulfilled, (state, action: PayloadAction<Booking | null>) => {
                const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
                state.booking = bookings.find((booking: Booking) => booking.id === action.payload?.id) || null;
            })
            .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.bookings.push(action.payload);
                localStorage.setItem("bookings", JSON.stringify(state.bookings));
            })
            .addCase(updateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
                const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                    localStorage.setItem("bookings", JSON.stringify(state.bookings));
                }
            })
            .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<number>) => {
                state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
                localStorage.setItem("bookings", JSON.stringify(state.bookings));
            });
    },
});

export const { saveBookingsToLocalStorage } = bookingsSlice.actions;