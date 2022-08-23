import { configureStore } from '@reduxjs/toolkit';

import productModalSlice from './product-modal/productModalSlice';
import cartItemSlice from './shopping-cart/cartItemSlice';
import totalProductSlice from './total-product/totalProductSlice';

export const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cartItems: cartItemSlice,
        totalProduct: totalProductSlice,
    },
});
