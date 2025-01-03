import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogged: localStorage.getItem("isLogged") === "true",
        user: JSON.parse(localStorage.getItem("user")) || null,
        error: null,
    },
    reducers: {
        login(state, action) {
            state.isLogged = true
            state.user = action.payload
            localStorage.setItem("isLogged", "true")
            localStorage.setItem("user", JSON.stringify(action.payload))
            state.error = null
        },
        logout(state) {
            state.isLogged = false
            state.user = null
            localStorage.removeItem("isLogged")
            localStorage.removeItem("user")
            localStorage.removeItem("rooms")
            localStorage.removeItem("employees")
            localStorage.removeItem("bookings")
            localStorage.removeItem("reviews")
            state.error = null
        },
        updateUser(state, action){
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
            state.error = null
        }
    },
})

export const { login, logout, updateUser } = authSlice.actions