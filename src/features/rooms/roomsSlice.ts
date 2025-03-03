import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRooms, fetchRoom, createRoom, updateRoom, deleteRoom } from './roomsThunks';
import { Room } from '../../interfaces/room';

interface RoomsState {
    rooms: Room[];
    room: Room | undefined;
    loading: boolean;
    error: string | null;
    deleteSuccess: boolean;
}

const initialState: RoomsState = {
    rooms: [],
    room: undefined,
    loading: false,
    error: null,
    deleteSuccess: false,
};

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        resetDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
        // Fetch all rooms
        .addCase(fetchRooms.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
            state.rooms = action.payload;
            state.loading = false;
        })
        .addCase(fetchRooms.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Fetch a room
        .addCase(fetchRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRoom.fulfilled, (state, action: PayloadAction<Room>) => {
            state.room = action.payload;
            state.loading = false;
        })
        .addCase(fetchRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Create a room
        .addCase(createRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
            state.rooms.push(action.payload);
            state.loading = false;
        })
        .addCase(createRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update a room
        .addCase(updateRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
            const index = state.rooms.findIndex((room) => room.id === action.payload.id);
            if (index !== -1) {
            state.rooms[index] = action.payload;
            }
            state.loading = false;
        })
        .addCase(updateRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Delete a room
        .addCase(deleteRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.deleteSuccess = false;
        })
        .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<number>) => {
            state.rooms = state.rooms.filter((room) => room.id !== action.payload);
            state.loading = false;
            state.deleteSuccess = true;
        })
        .addCase(deleteRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.deleteSuccess = false;
        });
    },
});

export const { resetDeleteSuccess } = roomsSlice.actions;
export default roomsSlice.reducer;
