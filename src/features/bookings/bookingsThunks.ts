import { createAsyncThunk } from '@reduxjs/toolkit';

interface Booking {
    id: number;
    name: string;
    date: string;
    status: string;
}

interface NewBooking {
    name: string;
    date: string;
    status: string;
}

export const fetchBookings = createAsyncThunk<Booking[]>('bookings/fetchBookings', async () => {
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings;
});

export const fetchBooking = createAsyncThunk<Booking | null, number>('bookings/fetchBooking', async (id) => {
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.find((booking) => booking.id === id) || null;
});

export const createBooking = createAsyncThunk<Booking, NewBooking>('bookings/createBooking', async (newBooking) => {
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingWithId: Booking = { id: Date.now(), ...newBooking };
    const updatedBookings = [...bookings, bookingWithId];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    return bookingWithId;
});

export const updateBooking = createAsyncThunk<Booking, Booking>('bookings/updateBooking', async (updatedBooking) => {
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    return updatedBooking;
});

export const deleteBooking = createAsyncThunk<number, number>('bookings/deleteBooking', async (id) => {
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    return id;
});