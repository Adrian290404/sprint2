import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage: 1,
    itemsPerPage: 10,
    paginatedData: [],
    totalItems: 0
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPage(state, action) {
            state.currentPage = action.payload
        },
        setData(state, action) {
            const { data, itemsPerPage } = action.payload
            state.itemsPerPage = itemsPerPage
            state.totalItems = data.length
            state.paginatedData = paginateData(data, itemsPerPage)
        }
    }
})

const paginateData = (data, itemsPerPage) => {
    const pages = Math.ceil(data.length / itemsPerPage)
    return Array.from({ length: pages }, (_, index) =>
        data.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
    )
}

export const { setPage, setData } = paginationSlice.actions