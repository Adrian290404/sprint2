import { createSlice } from '@reduxjs/toolkit';
import { fetchRooms, fetchRoom, createRoom, updateRoom, deleteRoom } from './roomsThunks'

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: JSON.parse(localStorage.getItem("rooms")) || [], // Leer de localStorage
        room: null,
    },
    reducers: {
        saveRoomsToLocalStorage(state) {
            localStorage.setItem("rooms", JSON.stringify(state.rooms));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
                localStorage.setItem("rooms", JSON.stringify(state.rooms))
            })
            .addCase(fetchRoom.fulfilled, (state, action) => {
                const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
                state.room = rooms.find((room) => room.id === action.payload.id) || null
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
                localStorage.setItem("rooms", JSON.stringify(state.rooms))
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                const index = state.rooms.findIndex((room) => room.id === action.payload.id)
                if (index !== -1) {
                    state.rooms[index] = action.payload
                    localStorage.setItem("rooms", JSON.stringify(state.rooms))
                }
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.rooms = state.rooms.filter((room) => room.id !== action.payload)
                localStorage.setItem("rooms", JSON.stringify(state.rooms))
            })
    }
})

export const { saveRoomsToLocalStorage } = roomsSlice.actions