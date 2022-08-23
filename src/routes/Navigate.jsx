import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/catalog/Catalog';
import Cart from '../pages/cart/Cart';
import Product from '../pages/Product';
import Login from '../components/authen/login/Login';
import Register from '../components/authen/register/Register';
import DefaultLayOut from '../defaultlayout/DefaultLayOut';
function Navigate() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <DefaultLayOut>
                        <Home />
                    </DefaultLayOut>
                }
            />
            <Route
                path="/catalog"
                element={
                    <DefaultLayOut>
                        <Catalog />
                    </DefaultLayOut>
                }
            />
            <Route
                path="/cart"
                element={
                    // hasUser ? (
                    <DefaultLayOut>
                        <Cart />
                    </DefaultLayOut>
                    // )
                    // : (
                    //     <DefaultLayOut>
                    //         <CartLocal />
                    //     </DefaultLayOut>
                    // )
                }
            />
            <Route
                path="/catalog/:slug"
                element={
                    <DefaultLayOut>
                        <Product />
                    </DefaultLayOut>
                }
            />
            <Route
                path="/login"
                element={
                    <DefaultLayOut>
                        <Login />
                    </DefaultLayOut>
                }
            />
            <Route
                path="/register"
                element={
                    <DefaultLayOut>
                        <Register />
                    </DefaultLayOut>
                }
            />
            <Route path="/contact" element={<DefaultLayOut></DefaultLayOut>} />
            <Route path="/accessories" element={<DefaultLayOut></DefaultLayOut>} />
        </Routes>
    );
}

export default Navigate;
