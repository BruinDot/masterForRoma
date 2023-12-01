import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTovars = createAsyncThunk('tovars/fetchTovars', async () => {
    const {data} = await axios.get('/tovars');
    return data;
});
export const fetchSortTovars = createAsyncThunk('tovars/fetchSortTovars', async (sortType) => {
    const {data} = await axios.get(`/tovars/sort?sortBy=${sortType}`);
    return data;
});
export const fetchSearchTovars = createAsyncThunk('tovars/fetchSearchTovars', async (query) => {
    const {data} = await axios.get(`/tovars/search/?query=${query ?? ''}`);
    return data;
});
export const fetchRemoveTovar = createAsyncThunk('tovars/fetchRemoveTovar', async (id) => {
    await axios.delete(`/tovars/${id}`);
});

const initialState = {
    tovars: {
        items: [],
        status: 'loading'
    }
};

const tovarsSlice = createSlice({
    name: 'tovars',
    initialState,
    reducers: {},
    extraReducers: {
        // Получение товаров
        [ fetchTovars.pending ]: (state) => {
            state.tovars.items = [];
            state.tovars.status = 'loading';
        },
        [ fetchTovars.fulfilled ]: (state, action) => {
            state.tovars.items = action.payload;
            state.tovars.status = 'loaded';
        },
        [ fetchTovars.rejected ]: (state) => {
            state.tovars.items = [];
            state.tovars.status = 'error';
        },
        // Удаление товара
        [ fetchRemoveTovar.pending ]: (state, action) => {
            state.tovars.items = state.tovars.items.filter(obj => obj._id !== action.meta.arg);
        },
        // Сортировка товаров
        [ fetchSortTovars.pending ]: (state) => {
            state.tovars.items = [];
            state.tovars.status = 'loading';
        },
        [ fetchSortTovars.fulfilled ]: (state, action) => {
            state.tovars.items = action.payload;
            state.tovars.status = 'loaded';
        },
        [ fetchSortTovars.rejected ]: (state) => {
            state.tovars.items = [];
            state.tovars.status = 'error';
        },
        // Поиск товаров
        [ fetchSearchTovars.pending ]: (state) => {
            state.tovars.items = [];
            state.tovars.status = 'loading';
        },
        [ fetchSearchTovars.fulfilled ]: (state, action) => {
            state.tovars.items = action.payload;
            state.tovars.status = 'loaded';
        },
        [ fetchSearchTovars.rejected ]: (state) => {
            state.tovars.items = [];
            state.tovars.status = 'error';
        },
    },
});

export const tovarsRuducer = tovarsSlice.reducer;