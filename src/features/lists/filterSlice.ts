import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    selectedMenu: string;
    selectedOption: string;
}

const initialState: FilterState = {
    selectedMenu: "",
    selectedOption: "Newest"
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSelectedMenu: (state, action: PayloadAction<string>) => {
            state.selectedMenu = action.payload;
        },
        setSelectedOption: (state, action: PayloadAction<string>) => {
            state.selectedOption = action.payload;
        }
    }
});

export const { setSelectedMenu, setSelectedOption } = filterSlice.actions;

export default filterSlice.reducer;