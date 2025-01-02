import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRooms, fetchRoom, createRoom, updateRoom, deleteRoom } from './roomsThunks';

interface Room {
    id: number;
    [key: string]: any; 
}

interface RoomsState {
    rooms: Room[];
    room: Room | null;
}

const initialState: RoomsState = {
    rooms: JSON.parse(localStorage.getItem("rooms") || "[]"),
    room: null
};

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        saveRoomsToLocalStorage(state) {
            localStorage.setItem("rooms", JSON.stringify(state.rooms));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
                state.rooms = action.payload;
                localStorage.setItem("rooms", JSON.stringify(state.rooms));
            })
            .addCase(fetchRoom.fulfilled, (state, action: PayloadAction<Room | null>) => {
                state.room = action.payload;
            })
            .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
                state.rooms.push(action.payload);
                localStorage.setItem("rooms", JSON.stringify(state.rooms));
            })
            .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
                const index = state.rooms.findIndex((room) => room.id === action.payload.id);
                if (index !== -1) {
                    state.rooms[index] = action.payload;
                    localStorage.setItem("rooms", JSON.stringify(state.rooms));
                }
            })
            .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<number>) => {
                state.rooms = state.rooms.filter((room) => room.id !== action.payload);
                localStorage.setItem("rooms", JSON.stringify(state.rooms));
            });
    }
});

export const { saveRoomsToLocalStorage } = roomsSlice.actions;

export default roomsSlice.reducer;
