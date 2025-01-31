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

export const fetchUsers = createAsyncThunk<Employee[]>('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        return await apiRequest<Employee[]>('https://db5xe9k83b.execute-api.eu-west-3.amazonaws.com/api/protected/employees', 'GET');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const fetchUser = createAsyncThunk<Employee, number>('users/fetchUser', async (id, { rejectWithValue }) => {
    try {
        return await apiRequest<Employee>(`https://db5xe9k83b.execute-api.eu-west-3.amazonaws.com/api/protected/employees/${id}`, 'GET');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const createUser = createAsyncThunk<Employee, NewEmployee>('users/createUser', async (newUser, { rejectWithValue }) => {
    try {
        return await apiRequest<Employee>('https://db5xe9k83b.execute-api.eu-west-3.amazonaws.com/api/protected/employees', 'POST', newUser);
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const updateUser = createAsyncThunk<Employee, Employee>('users/updateUser', async (updatedUser, { rejectWithValue }) => {
    try {
        return await apiRequest<Employee>(
            `https://db5xe9k83b.execute-api.eu-west-3.amazonaws.com/api/protected/employees/${updatedUser.id}`,
            'PUT',
            updatedUser
        );
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteUser = createAsyncThunk<number, number>('users/deleteUser', async (id, { rejectWithValue }) => {
    try {
        await apiRequest<void>(`https://db5xe9k83b.execute-api.eu-west-3.amazonaws.com/api/protected/employees/${id}`, 'DELETE');
        return id;
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});