import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    value: items,
};

const delItem = (state, item) => {
    return state.filter((e) => e.docId !== item.docId || e.color !== item.color || e.size !== item.size);
};

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            let isDuplicated = false;
            state.value.forEach((elmt) => {
                if (newItem.docId === elmt.docId && newItem.color === elmt.color && newItem.size === elmt.size) {
                    isDuplicated = true;
                }
            });

            if (isDuplicated) {
                let temp = state.value.map((elmt) => {
                    if (elmt.docId === newItem.docId && newItem.color === elmt.color && newItem.size === elmt.size) {
                        elmt.quantity += newItem.quantity;
                    }
                    return elmt;
                });
                state.value = temp;
            } else {
                state.value = [
                    ...state.value,
                    {
                        ...action.payload,
                    },
                ];
            }

            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        updateItem: (state, action) => {
            const itemUpdate = action.payload;

            let temp = state.value.map((elmt) => {
                if (
                    elmt.docId === itemUpdate.docId &&
                    itemUpdate.color === elmt.color &&
                    itemUpdate.size === elmt.size
                ) {
                    elmt.quantity = itemUpdate.quantity;
                }
                return elmt;
            });
            state.value = temp;

            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
        removeItem: (state, action) => {
            const itemRemove = action.payload;
            state.value = delItem(state.value, itemRemove);
            localStorage.setItem('cartItems', JSON.stringify(state.value));
        },
    },
});

export const { addItem, updateItem, removeItem } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
