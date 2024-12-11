import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './login/authSlice'
import { roomsSlice } from './rooms/roomsSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        rooms: roomsSlice.reducer
    },
})