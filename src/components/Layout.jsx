import Navigate from '../routes/Navigate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductModal from './product/ProductModal';
import Manage from '../routes/Manage';
import AppProvider from './context/AppProvider';
import AuthenProvider from './context/AuthenProvider';

function Layout() {
    return (
        <BrowserRouter>
            <AuthenProvider>
                <AppProvider>
                    <Routes>
                        <Route path="/*" element={<Navigate />} />
                        <Route path="/manage/*" element={<Manage />} />
                    </Routes>
                    <ProductModal />
                </AppProvider>
            </AuthenProvider>
        </BrowserRouter>
    );
}

export default Layout;
