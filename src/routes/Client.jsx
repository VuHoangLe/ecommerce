import { Routes, Route } from 'react-router-dom';
import ClientLayout from '../layouts/ClientLayOut';
import { Cart, Catalog, Home, Login, Product, Purchase, Register } from '../pages/client';
import Profile from '../pages/client/Profile';
function Client() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ClientLayout>
                        <Home />
                    </ClientLayout>
                }
            />
            <Route
                path="/catalog"
                element={
                    <ClientLayout>
                        <Catalog />
                    </ClientLayout>
                }
            />
            <Route
                path="/cart"
                element={
                    <ClientLayout>
                        <Cart />
                    </ClientLayout>
                }
            />

            <Route
                path="/cart/:id"
                element={
                    <ClientLayout>
                        <Purchase />
                    </ClientLayout>
                }
            />
            <Route
                path="/catalog/:slug"
                element={
                    <ClientLayout>
                        <Product />
                    </ClientLayout>
                }
            />
            <Route
                path="/login"
                element={
                    <ClientLayout>
                        <Login />
                    </ClientLayout>
                }
            />
            <Route
                path="/register"
                element={
                    <ClientLayout>
                        <Register />
                    </ClientLayout>
                }
            />

            <Route
                path="/profile/:id"
                element={
                    <ClientLayout>
                        <Profile />
                    </ClientLayout>
                }
            />

            <Route path="/contact" element={<ClientLayout></ClientLayout>} />
            <Route path="/accessories" element={<ClientLayout></ClientLayout>} />
        </Routes>
    );
}

export default Client;
