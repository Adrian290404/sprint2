import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogged: localStorage.getItem("isLogged") === "true",
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
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
export default authSlice.reducer