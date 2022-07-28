import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

import Navigate from '../routes/Navigate';

import { BrowserRouter } from 'react-router-dom';
import ProductModal from './product/ProductModal';

function Layout() {
    return (
        <BrowserRouter>
            <Header />
            <div className="container">
                <div className="main">
                    <Navigate />
                </div>
            </div>
            <Footer />
            <ProductModal />
        </BrowserRouter>
    );
}

export default Layout;
