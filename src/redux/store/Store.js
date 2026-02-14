import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from '../slices/AuthSlice.js';

const Store = configureStore({
    reducer: {
        Auth: AuthSlice,
    }
})

export default Store;