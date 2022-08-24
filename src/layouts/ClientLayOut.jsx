import React from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

function ClientLayout({ children }) {
    return (
        <div className="container">
            <div className="main">
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default ClientLayout;
