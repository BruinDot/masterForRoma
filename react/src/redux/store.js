import { configureStore } from "@reduxjs/toolkit";
import { tovarsRuducer } from "./slices/tovars";
import { authReducer } from "./slices/auth";

const store = configureStore({
    reducer: {
        tovars: tovarsRuducer,
        auth: authReducer,
    },
});

export default store;