import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
    name: string;
    email: string;
}

interface AuthState {
    isLogged: boolean;
    user: AuthUser | null;
    error: string | null;
}

const initialState: AuthState = {
    isLogged: localStorage.getItem("isLogged") === "true",
    user: JSON.parse(localStorage.getItem("user") || "null"),
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<AuthUser>) {
            state.isLogged = true;
            state.user = action.payload;
            localStorage.setItem("isLogged", "true");
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.error = null;
        },
        logout(state) {
            state.isLogged = false;
            state.user = null;
            localStorage.removeItem("isLogged");
            localStorage.removeItem("user");
            localStorage.removeItem("rooms");
            localStorage.removeItem("employees");
            localStorage.removeItem("bookings");
            localStorage.removeItem("reviews");
            state.error = null;
        },
        updateUser(state, action: PayloadAction<AuthUser>) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.error = null;
        }
    },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;