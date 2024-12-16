import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const users = JSON.parse(localStorage.getItem("employees")) || [];
    return users
})

export const fetchUser = createAsyncThunk('users/fetchUser', async (id) => {
    const users = JSON.parse(localStorage.getItem("employees")) || [];
    return users.find((user) => user.id === id) || null
})

export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
    const users = JSON.parse(localStorage.getItem("employees")) || [];
    const userWithId = { id: Date.now(), ...newUser }
    const updatedUsers = [...users, userWithId]
    localStorage.setItem("employees", JSON.stringify(updatedUsers))
    return userWithId
})

export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
    const users = JSON.parse(localStorage.getItem("employees")) || []
    const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
    )
    localStorage.setItem("employees", JSON.stringify(updatedUsers))
    return updatedUser
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    const users = JSON.parse(localStorage.getItem("employees")) || []
    const updatedUsers = users.filter((user) => user.id !== id)
    localStorage.setItem("employees", JSON.stringify(updatedUsers))
    return id
})
