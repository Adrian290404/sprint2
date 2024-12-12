import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    return rooms
})
export const fetchRoom = createAsyncThunk('rooms/fetchRoom', async (id) => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    return rooms.find((room) => room.id === id) || null
})
export const createRoom = createAsyncThunk('rooms/createRoom', async (newRoom) => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    const roomWithId = { id: Date.now(), ...newRoom }
    const updatedRooms = [...rooms, roomWithId]
    localStorage.setItem("rooms", JSON.stringify(updatedRooms))
    return roomWithId
})
export const updateRoom = createAsyncThunk('rooms/updateRoom', async (updatedRoom) => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || []
    const updatedRooms = rooms.map((room) =>
        room.id === updatedRoom.id ? updatedRoom : room
    )
    localStorage.setItem("rooms", JSON.stringify(updatedRooms))
    return updatedRoom
})
export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || []
    const updatedRooms = rooms.filter((room) => room.id !== id)
    localStorage.setItem("rooms", JSON.stringify(updatedRooms))
    return id
});