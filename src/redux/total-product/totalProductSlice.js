import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

export const totalProductSlice = createSlice({
    name: 'totalProduct',
    initialState,
    reducers: {
        setTotal: (state) => {
            ++state.value;
        },

        removeTotal: (state) => {
            --state.value;
        },
    },
});

export const { setTotal, removeTotal } = totalProductSlice.actions;
export default totalProductSlice.reducer;
