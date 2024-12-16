import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedMenu: "",
    selectedOption: "Newest"
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload
        },
        setSelectedOption: (state, action) => {
            state.selectedOption = action.payload
        }
    }
})

export const { setSelectedMenu, setSelectedOption } = filterSlice.actions