import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import dBookReducer from "./features/dbooks/dbooksSlice";
import { booksApi } from "../services/booksAPI";

const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        dbooksR: dBookReducer,
    },
    middleware: (
        getDefaultMiddleware // Caching
    ) => getDefaultMiddleware().concat(booksApi.middleware),
});
setupListeners(store.dispatch); // Refetch

export default store;
