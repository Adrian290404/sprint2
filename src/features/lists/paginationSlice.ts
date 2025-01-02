import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    paginatedData: any[]; 
    totalItems: number;
}

const initialState: PaginationState = {
    currentPage: 1,
    itemsPerPage: 10,
    paginatedData: [],
    totalItems: 0
};

const paginateData = (data: any[], itemsPerPage: number): any[][] => { 
    const pages = Math.ceil(data.length / itemsPerPage);
    return Array.from({ length: pages }, (_, index) =>
        data.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
    );
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setData: (state, action: PayloadAction<{ data: any[]; itemsPerPage: number }>) => { 
            const { data, itemsPerPage } = action.payload;
            state.itemsPerPage = itemsPerPage;
            state.totalItems = data.length;
            state.paginatedData = paginateData(data, itemsPerPage);
        }
    }
});

export const { setPage, setData } = paginationSlice.actions;

export default paginationSlice.reducer;