import { createAsyncThunk } from '@reduxjs/toolkit';
import { Room } from '../../interfaces/room';
import { apiRequest } from '../apiRequest';

interface NewRoom {
    room_name: string;
    bed_type: string;
    room_floor: string;
    facilities: string;
    rate: number;
    avaiable: boolean;
    image: string;
}

export const fetchRooms = createAsyncThunk<Room[]>(
    'rooms/fetchRooms',
    async (_, { rejectWithValue }) => {
        try {
        return await apiRequest<Room[]>('http://localhost:3000/api/protected/rooms', 'GET');
        } catch (error: any) {
        return rejectWithValue(error.message);
        }
    }
);

export const fetchRoom = createAsyncThunk<Room, number>(
    'rooms/fetchRoom',
    async (id, { rejectWithValue }) => {
        try {
        return await apiRequest<Room>(`http://localhost:3000/api/protected/rooms/${id}`, 'GET');
        } catch (error: any) {
        return rejectWithValue(error.message);
        }
    }
);

export const createRoom = createAsyncThunk<Room, NewRoom>(
    'rooms/createRoom',
    async (newRoom, { rejectWithValue }) => {
        try {
        return await apiRequest<Room>('http://localhost:3000/api/protected/rooms', 'POST', newRoom);
        } catch (error: any) {
        return rejectWithValue(error.message);
        }
    }
);

export const updateRoom = createAsyncThunk<Room, Room>(
    'rooms/updateRoom',
    async (updatedRoom, { rejectWithValue }) => {
        try {
        return await apiRequest<Room>(`http://localhost:3000/api/protected/rooms/${updatedRoom.id}`, 'PUT', updatedRoom);
        } catch (error: any) {
        return rejectWithValue(error.message);
        }
    }
);

export const deleteRoom = createAsyncThunk<number, number>(
    'rooms/deleteRoom',
    async (id, { rejectWithValue }) => {
        try {
        await apiRequest<void>(`http://localhost:3000/api/protected/rooms/${id}`, 'DELETE');
        return id;
        } catch (error: any) {
        return rejectWithValue(error.message);
        }
    }
);