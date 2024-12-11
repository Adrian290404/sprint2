import { createSlice } from '@reduxjs/toolkit';
import { fetchRooms, fetchRoom, createRoom, updateRoom, deleteRoom } from './roomsThunks';

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [],
        room: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload
            })
            .addCase(fetchRoom.fulfilled, (state, action) => {
                state.room = action.payload
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload)
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                const index = state.rooms.findIndex((room) => room.id === action.payload.id)
                if (index !== -1) {
                    state.rooms[index] = action.payload
                }
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.rooms = state.rooms.filter((room) => room.id !== action.payload)
            })
    }
})