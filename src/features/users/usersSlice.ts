import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from './usersThunks';
import { Employee } from '../../interfaces/employee';

interface UsersState {
    users: Employee[];
    user: Employee | null;
}

const initialState: UsersState = {
    users: JSON.parse(localStorage.getItem("employees") || "[]"),
    user: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        saveUsersToLocalStorage(state) {
            localStorage.setItem("employees", JSON.stringify(state.users));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Employee[]>) => {
                state.users = action.payload;
                localStorage.setItem("employees", JSON.stringify(state.users));
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<Employee | null>) => {
                const users = JSON.parse(localStorage.getItem("employees") || "[]");
                state.user = users.find((user: Employee) => user.id === action.payload?.id) || null;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<Employee>) => {
                state.users.push(action.payload);
                localStorage.setItem("employees", JSON.stringify(state.users));
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<Employee>) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                    localStorage.setItem("employees", JSON.stringify(state.users));
                }
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
                localStorage.setItem("employees", JSON.stringify(state.users));
            });
    },
});

export const { saveUsersToLocalStorage } = usersSlice.actions;