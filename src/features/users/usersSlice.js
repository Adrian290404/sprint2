import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from './usersThunks'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: JSON.parse(localStorage.getItem("employees")) || [],
        user: null,
    },
    reducers: {
        saveUsersToLocalStorage(state) {
            localStorage.setItem("employees", JSON.stringify(state.users));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                localStorage.setItem("employees", JSON.stringify(state.users))
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const users = JSON.parse(localStorage.getItem("employees")) || [];
                state.user = users.find((user) => user.id === action.payload.id) || null
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
                localStorage.setItem("employees", JSON.stringify(state.users))
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id)
                if (index !== -1) {
                    state.users[index] = action.payload
                    localStorage.setItem("employees", JSON.stringify(state.users))
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload)
                localStorage.setItem("employees", JSON.stringify(state.users))
            })
    }
})

export const { saveUsersToLocalStorage } = usersSlice.actions