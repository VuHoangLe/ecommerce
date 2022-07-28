import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    value: items,
};

const findItem = (state, item) => {
    return state.filter((e) => e.slug === item.slug && e.color === item.color && e.size === item.size);
};

const delItem = (state, item) => {
    return state.filter((e) => e.slug !== item.slug || e.color !== item.color || e.size !== item.size);
};

const sortItem = (arr) => {
    return arr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
};

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const duplicate = findItem(state.value, newItem);
            if (duplicate.length) {
                state.value = delItem(state.value, newItem);
                state.value = [
                    ...state.value,
                    {
                        name: newItem.name,
                        id: duplicate[0].id,
                        slug: newItem.slug,
                        color: newItem.color,
                        size: newItem.size,
                        price: newItem.price,
                        quantity: newItem.quantity + duplicate[0].quantity,
                    },
                ];
            } else {
                state.value = [
                    ...state.value,
                    {
                        ...action.payload,
                        id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1,
                    },
                ];
            }
            localStorage.setItem('cartItems', JSON.stringify(sortItem(state.value)));
        },
        updateItem: (state, action) => {
            const itemUpdate = action.payload;

            const item = findItem(state.value, itemUpdate);
            if (item.length) {
                state.value = delItem(state.value, itemUpdate);

                state.value = [
                    ...state.value,
                    {
                        ...itemUpdate,
                        id: item[0].id,
                    },
                ];
                localStorage.setItem('cartItems', JSON.stringify(sortItem(state.value)));
            }
        },
        removeItem: (state, action) => {
            const itemRemove = action.payload;
            state.value = delItem(state.value, itemRemove);
            localStorage.setItem('cartItems', JSON.stringify(sortItem(state.value)));
        },
    },
});

export const { addItem, updateItem, removeItem } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
