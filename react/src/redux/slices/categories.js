import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const {data} = await axios.get('/categories');
    return data;
});
export const fetchSortCategories = createAsyncThunk('categories/fetchSortCategories', async (sortType) => {
    const {data} = await axios.get(`/categories/sort?sortBy=${sortType}`);
    return data;
});
export const fetchSearchCategories = createAsyncThunk('categories/fetchSearchCategories', async (query) => {
    const {data} = await axios.get(`/categories/search/?query=${query ?? ''}`);
    return data;
});
export const fetchRemoveTovar = createAsyncThunk('categories/fetchRemoveTovar', async (id) => {
    await axios.delete(`/categories/${id}`);
});

const initialState = {
    categories: {
        items: [],
        status: 'loading'
    }
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        // Получение товаров
        [ fetchCategories.pending ]: (state) => {
            state.categories.items = [];
            state.categories.status = 'loading';
        },
        [ fetchCategories.fulfilled ]: (state, action) => {
            state.categories.items = action.payload;
            state.categories.status = 'loaded';
        },
        [ fetchCategories.rejected ]: (state) => {
            state.categories.items = [];
            state.categories.status = 'error';
        },
        // Удаление товара
        [ fetchRemoveTovar.pending ]: (state, action) => {
            state.categories.items = state.categories.items.filter(obj => obj._id !== action.meta.arg);
        },
        // Сортировка товаров
        [ fetchSortCategories.pending ]: (state) => {
            state.categories.items = [];
            state.categories.status = 'loading';
        },
        [ fetchSortCategories.fulfilled ]: (state, action) => {
            state.categories.items = action.payload;
            state.categories.status = 'loaded';
        },
        [ fetchSortCategories.rejected ]: (state) => {
            state.categories.items = [];
            state.categories.status = 'error';
        },
    },
});

export const categoriesRuducer = categoriesSlice.reducer;