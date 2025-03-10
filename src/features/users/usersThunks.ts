import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../interfaces/employee';
import { apiRequest } from '../apiRequest';

interface NewEmployee {
    name: string;
    image: string;
    join: string;
    job_desk: string;
    schedule: string;
    contact: string;
}

const url = import.meta.env.VITE_API_URL + '/protected/employees';

export const fetchUsers = createAsyncThunk<Employee[]>('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        return await apiRequest<Employee[]>(url, 'GET');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const fetchUser = createAsyncThunk<Employee, number>('users/fetchUser', async (id, { rejectWithValue }) => {
    try {
        return await apiRequest<Employee>(`${url}/${id}`, 'GET');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const createUser = createAsyncThunk<Employee, NewEmployee>('users/createUser', async (newUser, { rejectWithValue }) => {
    try {
        return await apiRequest<Employee>(url, 'POST', newUser);
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const updateUser = createAsyncThunk<Employee, Employee>('users/updateUser', async (updatedUser, { rejectWithValue }) => {
    try {
        return await apiRequest<Employee>(`${url}/${updateUser.id}`, 'PUT', updatedUser);
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteUser = createAsyncThunk<number, number>('users/deleteUser', async (id, { rejectWithValue }) => {
    try {
        await apiRequest<void>(`${url}/${id}`, 'DELETE');
        return id;
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});