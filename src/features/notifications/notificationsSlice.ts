import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNotifications, fetchCountNoRead, markAllAsRead } from './notificationsThunks';
import { Notification } from '../../interfaces/notification';

interface NotificationsState {
  notifications: Notification[];
  countNoRead: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  countNoRead: 0,
  loading: false,
  error: null,
};

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetchNotifications
        .addCase(fetchNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
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