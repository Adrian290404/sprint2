import { createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    id: number;
    [key: string]: any; 
}

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        const users = JSON.parse(localStorage.getItem("employees") || "[]") as User[];
        return users;
    }
);

export const fetchUser = createAsyncThunk<User | null, number>(
    'users/fetchUser',
    async (id) => {
        const users = JSON.parse(localStorage.getItem("employees") || "[]") as User[];
        return users.find((user) => user.id === id) || null;
    }
);

export const createUser = createAsyncThunk<User, Omit<User, 'id'>>(
    'users/createUser',
    async (newUser) => {
        const users = JSON.parse(localStorage.getItem("employees") || "[]") as User[];
        const userWithId = { id: Date.now(), ...newUser };
        const updatedUsers = [...users, userWithId];
        localStorage.setItem("employees", JSON.stringify(updatedUsers));
        return userWithId;
    }
);

export const updateUser = createAsyncThunk<User, User>(
    'users/updateUser',
    async (updatedUser) => {
        const users = JSON.parse(localStorage.getItem("employees") || "[]") as User[];
        const updatedUsers = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        );
        localStorage.setItem("employees", JSON.stringify(updatedUsers));
        return updatedUser;
    }
);

export const deleteUser = createAsyncThunk<number, number>(
    'users/deleteUser',
    async (id) => {
        const users = JSON.parse(localStorage.getItem("employees") || "[]") as User[];
        const updatedUsers = users.filter((user) => user.id !== id);
        localStorage.setItem("employees", JSON.stringify(updatedUsers));
        return id;
    }
);
