import { createAsyncThunk } from '@reduxjs/toolkit';
import { Room } from '../../interfaces/room';

interface NewRoom {
    room_name: string;
    bed_type: string;
    room_floor: string;
    facilities: string;
    rate: number;
    avaiable: boolean;
    image: string;
}

export const fetchRooms = createAsyncThunk<Room[]>('rooms/fetchRooms', async () => {
    const rooms: Room[] = JSON.parse(localStorage.getItem('rooms') || '[]');
    return rooms;
});

export const fetchRoom = createAsyncThunk<Room | null, number>('rooms/fetchRoom', async (id) => {
    const rooms: Room[] = JSON.parse(localStorage.getItem('rooms') || '[]');
    return rooms.find((room) => room.id === id) || null;
});

export const createRoom = createAsyncThunk<Room, NewRoom>('rooms/createRoom', async (newRoom) => {
    const rooms: Room[] = JSON.parse(localStorage.getItem('rooms') || '[]');
    const roomWithId: Room = { id: Date.now(), ...newRoom };
    const updatedRooms = [...rooms, roomWithId];
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    return roomWithId;
});

export const updateRoom = createAsyncThunk<Room, Room>('rooms/updateRoom', async (updatedRoom) => {
    const rooms: Room[] = JSON.parse(localStorage.getItem('rooms') || '[]');
    const updatedRooms = rooms.map((room) =>
        room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room
    );
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    return updatedRoom;
});

export const deleteRoom = createAsyncThunk<number, number>('rooms/deleteRoom', async (id) => {
    const rooms: Room[] = JSON.parse(localStorage.getItem('rooms') || '[]');
    const updatedRooms = rooms.filter((room) => room.id !== id);
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    return id;
});