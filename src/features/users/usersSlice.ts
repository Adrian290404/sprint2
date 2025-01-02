import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from './usersThunks';

interface User {
    id: number;
    [key: string]: any; 
}

interface UsersState {
    users: User[];
    user: User | null;
}

const initialState: UsersState = {
    users: JSON.parse(localStorage.getItem("employees") || "[]"),
    user: null
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        saveUsersToLocalStorage(state) {
            localStorage.setItem("employees", JSON.stringify(state.users));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.users = action.payload;
                localStorage.setItem("employees", JSON.stringify(state.users));
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | null>) => {
                state.user = action.payload;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload);
                localStorage.setItem("employees", JSON.stringify(state.users));
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
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
    }
});

export const { saveUsersToLocalStorage } = usersSlice.actions;

export default usersSlice.reducer;