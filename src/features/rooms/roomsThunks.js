import { createAsyncThunk } from '@reduxjs/toolkit'
import { rooms } from "../../data/rooms"

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(rooms)
        }, 200)
    })
})

export const fetchRoom = createAsyncThunk('rooms/fetchRoom', async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(rooms.find((room) => room.id === id))
        }, 200)
    })
})

export const createRoom = createAsyncThunk('rooms/createRoom', async (newRoom) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: Date.now(), ...newRoom })
        }, 200)
    })
})

export const updateRoom = createAsyncThunk('rooms/updateRoom', async (updatedRoom) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(updatedRoom)
        }, 200)
    });
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(id)
        }, 200)
    })
})