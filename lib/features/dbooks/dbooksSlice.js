import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    isLoading: false,
    isError: null,
};

const dbooksSlice = createSlice({
    name: "dbooks",
    initialState,
    reducers: {},
});

export default dbooksSlice.reducer;
