import { createSlice } from '@reduxjs/toolkit'
import { fetchBookings, fetchBooking, createBooking, updateBooking, deleteBooking } from './bookingsThunks'

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: JSON.parse(localStorage.getItem("bookings")) || [],
        booking: null
    },
    reducers: {
        saveBookingsToLocalStorage(state) {
            localStorage.setItem("bookings", JSON.stringify(state.bookings))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.bookings = action.payload
                localStorage.setItem("bookings", JSON.stringify(state.bookings))
            })
            .addCase(fetchBooking.fulfilled, (state, action) => {
                const bookings = JSON.parse(localStorage.getItem("bookings")) || []
                state.booking = bookings.find((booking) => booking.id === action.payload.id) || null
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.bookings.push(action.payload)
                localStorage.setItem("bookings", JSON.stringify(state.bookings))
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                const index = state.bookings.findIndex((booking) => booking.id === action.payload.id)
                if (index !== -1) {
                    state.bookings[index] = action.payload
                    localStorage.setItem("bookings", JSON.stringify(state.bookings))
                }
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.filter((booking) => booking.id !== action.payload)
                localStorage.setItem("bookings", JSON.stringify(state.bookings))
            })
    }
})

export const { saveBookingsToLocalStorage } = bookingsSlice.actions