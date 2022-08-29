import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditProduct from '../features/manage/manage-product/components/EditProduct';
import NewProduct from '../features/manage/manage-product/components/NewProduct';
import ManageLayOut from '../layouts/manage/ManageLayOut';
import { Analytic, Customers, Dashboard, Order, Product } from '../pages/ManagePage';

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
                        <EditProduct />
                    </ManageLayOut>
                }
            />

            <Route
                path="/product/create"
                element={
                    <ManageLayOut>
                        <NewProduct />
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
