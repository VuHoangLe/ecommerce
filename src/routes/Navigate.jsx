import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/catalog/Catalog';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
function Navigate() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/catalog:slug" element={<Product />} />
        </Routes>
    );
}

export default Navigate;
