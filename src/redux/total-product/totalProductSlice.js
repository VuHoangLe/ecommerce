import { createSlice } from '@reduxjs/toolkit';

const total = localStorage.getItem('totalProduct') !== null ? JSON.parse(localStorage.getItem('totalProduct')) : 0;
const initialState = {
    value: total,
};

export const totalProductSlice = createSlice({
    name: 'totalProduct',
    initialState,
    reducers: {
        setTotal: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('totalProduct', state.value);
        },
        removeTotal: (state) => {
            state.value = null;
        },
    },
});

export const { setTotal, removeTotal } = totalProductSlice.actions;
export default totalProductSlice.reducer;
