import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || []
    return bookings
})

export const fetchBooking = createAsyncThunk('bookings/fetchBooking', async (id) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || []
    return bookings.find((booking) => booking.id === id) || null
})

export const createBooking = createAsyncThunk('bookings/createBooking', async (newBooking) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || []
    const bookingWithId = { id: Date.now(), ...newBooking }
    const updatedBookings = [...bookings, bookingWithId]
    localStorage.setItem("bookings", JSON.stringify(updatedBookings))
    return bookingWithId
})

export const updateBooking = createAsyncThunk('bookings/updateBooking', async (updatedBooking) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || []
    const updatedBookings = bookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
    )
    localStorage.setItem("bookings", JSON.stringify(updatedBookings))
    return updatedBooking
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || []
    const updatedBookings = bookings.filter((booking) => booking.id !== id)
    localStorage.setItem("bookings", JSON.stringify(updatedBookings))
    return id
})