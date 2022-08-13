import { configureStore } from '@reduxjs/toolkit';

import productModalSlice from './product-modal/productModalSlice';
import cartItemSlice from './shopping-cart/cartItemSlice';
import userInfoSlice from './user-info/userInfoSlice';

export const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cartItems: cartItemSlice,
        userInfo: userInfoSlice,
    },
});
