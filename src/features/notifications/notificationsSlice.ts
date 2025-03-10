import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNotifications, fetchCountNoRead, markAllAsRead } from './notificationsThunks';
import { Notification } from '../../interfaces/notification';
import { NotificationsResponse } from './notificationsThunks';

interface NotificationsState {
    notifications: Notification[];
    currentPage: number;
    totalNotifications: number;
    totalPages: number;
    countNoRead: number;
    loading: boolean;
    error: string | null;
}
  
const initialState: NotificationsState = {
    notifications: [],
    currentPage: 0,
    totalNotifications: 0,
    totalPages: 0,
    countNoRead: 0,
    loading: false,
    error: null,
};
  
export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        // fetchNotifications
        .addCase(fetchNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<NotificationsResponse>) => {
            state.notifications = action.payload.notifications;
            state.currentPage = action.payload.currentPage;
            state.totalNotifications = action.payload.totalNotifications;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
        })
        .addCase(fetchNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
  
        // fetchCountNoRead
        .addCase(fetchCountNoRead.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCountNoRead.fulfilled, (state, action: PayloadAction<number>) => {
            state.countNoRead = action.payload;
            state.loading = false;
        })
        .addCase(fetchCountNoRead.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
  
        // markAllAsRead
        .addCase(markAllAsRead.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(markAllAsRead.fulfilled, (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
            state.countNoRead = 0;
            state.loading = false;
        })
        .addCase(markAllAsRead.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});