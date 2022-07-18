import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

import Navigate from '../routes/Navigate';

import { BrowserRouter } from 'react-router-dom';

function Layout() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className="container">
                    <div className="main">
                        <Navigate />
                    </div>
                </div>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default Layout;
