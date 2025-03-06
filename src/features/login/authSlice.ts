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

const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
const isTokenValid = tokenExpiresAt ? new Date().getTime() < Number(tokenExpiresAt) : false;

const initialState: AuthState = {
    isLogged: localStorage.getItem("isLogged") === "true" && isTokenValid,
    user: isTokenValid ? JSON.parse(localStorage.getItem("user") || "null") : null,
    error: null,
};

if (!isTokenValid) {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiresAt");
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
        login(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
            state.isLogged = true;
            state.user = action.payload.user;
            const expiresAt = new Date().getTime() + 60 * 60 * 1000;
            localStorage.setItem("isLogged", "true");
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("authToken", action.payload.token);
            localStorage.setItem("tokenExpiresAt", expiresAt.toString());
            state.error = null;
        },

        logout(state) {
            state.isLogged = false;
            state.user = null;
            localStorage.removeItem("isLogged");
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            localStorage.removeItem("tokenExpiresAt");
            localStorage.removeItem("reviews");
            state.error = null;
        },

        updateUser(state, action: PayloadAction<AuthUser>) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.error = null;
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        }
    },
});

export const { login, logout, updateUser, setError } = authSlice.actions;

export default authSlice.reducer;