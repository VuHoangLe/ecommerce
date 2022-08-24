import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManageLayOut from '../layouts/manage/ManageLayOut';
import Analytic from '../pages/ManagePage/Analytic';

import Customers from '../pages/ManagePage/Customers';
import Dashboard from '../pages/ManagePage/Dashboard';
import Order from '../pages/ManagePage/Order';
import Product from '../pages/ManagePage/Product';
import ProductItem from '../pages/ManagePage/ProductItem';

function Manage() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ManageLayOut>
                        <Dashboard />
                    </ManageLayOut>
                }
            />
            <Route
                path="/customer"
                element={
                    <ManageLayOut>
                        <Customers />
                    </ManageLayOut>
                }
            />
            <Route
                path="/product"
                element={
                    <ManageLayOut>
                        <Product />
                    </ManageLayOut>
                }
            />

            <Route
                path="/product/:id"
                element={
                    <ManageLayOut>
                        <ProductItem />
                    </ManageLayOut>
                }
            />
            <Route
                path="/order"
                element={
                    <ManageLayOut>
                        <Order />
                    </ManageLayOut>
                }
            />
            <Route
                path="/analytic"
                element={
                    <ManageLayOut>
                        <Analytic />
                    </ManageLayOut>
                }
            />
        </Routes>
    );
}

export default Manage;
