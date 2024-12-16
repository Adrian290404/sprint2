import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './login/authSlice'
import { roomsSlice } from './rooms/roomsSlice';
import { paginationSlice } from "./lists/paginationSlice"
import { filterSlice } from './lists/filterSlice'
import { usersSlice } from './users/usersSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        pagination: paginationSlice.reducer,
        filter: filterSlice.reducer,
        rooms: roomsSlice.reducer,
        users: usersSlice.reducer     
    },
})