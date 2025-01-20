import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../interfaces/employee';

interface NewEmployee {
    name: string;
    image: string;
    join: string;
    job_desk: string;
    schedule: string;
    contact: string;
}

export const fetchUsers = createAsyncThunk<Employee[]>('users/fetchUsers', async () => {
    const users: Employee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    return users;
});

export const fetchUser = createAsyncThunk<Employee | null, number>('users/fetchUser', async (id) => {
    const users: Employee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    return users.find((user) => user.id === id) || null;
});

export const createUser = createAsyncThunk<Employee, NewEmployee>('users/createUser', async (newUser) => {
    const users: Employee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    const userWithId: Employee = { id: Date.now(), ...newUser };  
    const updatedUsers = [...users, userWithId];
    localStorage.setItem('employees', JSON.stringify(updatedUsers));
    return userWithId;
});

export const updateUser = createAsyncThunk<Employee, Employee>('users/updateUser', async (updatedUser) => {
    const users: Employee[] = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    localStorage.setItem('employees', JSON.stringify(updatedUsers));
    return updatedUser;
});

export const deleteUser = createAsyncThunk<number, number>('users/deleteUser', async (id) => {
    const users = JSON.parse(localStorage.getItem("employees") || "[]") as Employee[];
    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("employees", JSON.stringify(updatedUsers));
    return id;
});