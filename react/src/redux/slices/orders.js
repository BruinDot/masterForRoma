import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const {data} = await axios.get('/orders/my');
    return data;
});
export const fetchOrdersAll = createAsyncThunk('orders/fetchOrdersAll', async () => {
    const {data} = await axios.get('/orders');
    return data;
});
export const fetchRemoveTovar = createAsyncThunk('orders/fetchRemoveTovar', async (id) => {
    await axios.delete(`/orders/${id}`);
});

const initialState = {
    orders: {
        items: [],
        status: 'loading'
    }
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: {
        // Получение товаров
        [ fetchOrders.pending ]: (state) => {
            state.orders.items = [];
            state.orders.status = 'loading';
        },
        [ fetchOrders.fulfilled ]: (state, action) => {
            state.orders.items = action.payload;
            state.orders.status = 'loaded';
        },
        [ fetchOrders.rejected ]: (state) => {
            state.orders.items = [];
            state.orders.status = 'error';
        },
        // Удаление товара
        [ fetchRemoveTovar.pending ]: (state, action) => {
            state.orders.items = state.orders.items.filter(obj => obj._id !== action.meta.arg);
        },
    },
});

export const ordersRuducer = ordersSlice.reducer;