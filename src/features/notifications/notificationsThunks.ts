import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../apiRequest';
import { Notification } from '../../interfaces/notification';

const url = import.meta.env.VITE_API_URL + '/protected/notifications';

export interface NotificationsResponse {
    currentPage: number;
    notifications: Notification[];
    totalNotifications: number;
    totalPages: number;
}

export const fetchNotifications = createAsyncThunk<NotificationsResponse>('notifications/fetchNotifications', async (_, { rejectWithValue }) => {
    try {
        return await apiRequest<NotificationsResponse>(url, 'GET');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const fetchCountNoRead = createAsyncThunk<number>('notifications/fetchCountNoRead', async (_, { rejectWithValue }) => {
    try {
        return await apiRequest<number>(`${url}/count`, 'GET');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const markAllAsRead = createAsyncThunk<Notification[]>('notifications/markAllAsRead', async (_, { rejectWithValue }) => {
    try {
        return await apiRequest<Notification[]>(url, 'PUT');
    } 
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});