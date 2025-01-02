import { createAsyncThunk } from '@reduxjs/toolkit';

interface Room {
    id: number;
    [key: string]: any; 
}

export const fetchRooms = createAsyncThunk<Room[]>(
    'rooms/fetchRooms',
    async () => {
        const rooms = JSON.parse(localStorage.getItem("rooms") || "[]") as Room[];
        return rooms;
    }
);

export const fetchRoom = createAsyncThunk<Room | null, number>(
    'rooms/fetchRoom',
    async (id) => {
        const rooms = JSON.parse(localStorage.getItem("rooms") || "[]") as Room[];
        return rooms.find((room) => room.id === id) || null;
    }
);

export const createRoom = createAsyncThunk<Room, Omit<Room, 'id'>>(
    'rooms/createRoom',
    async (newRoom) => {
        const rooms = JSON.parse(localStorage.getItem("rooms") || "[]") as Room[];
        const roomWithId = { id: Date.now(), ...newRoom };
        const updatedRooms = [...rooms, roomWithId];
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
        return roomWithId;
    }
);

export const updateRoom = createAsyncThunk<Room, Room>(
    'rooms/updateRoom',
    async (updatedRoom) => {
        const rooms = JSON.parse(localStorage.getItem("rooms") || "[]") as Room[];
        const updatedRooms = rooms.map((room) =>
            room.id === updatedRoom.id ? updatedRoom : room
        );
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
        return updatedRoom;
    }
);

export const deleteRoom = createAsyncThunk<number, number>(
    'rooms/deleteRoom',
    async (id) => {
        const rooms = JSON.parse(localStorage.getItem("rooms") || "[]") as Room[];
        const updatedRooms = rooms.filter((room) => room.id !== id);
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
        return id;
    }
);