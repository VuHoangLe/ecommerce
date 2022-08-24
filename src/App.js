import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import AppProvider from './context/AppProvider';
import AuthenProvider from './context/AuthenProvider';
import { ProductModal } from './features/client/products';
import Client from './routes/Client';
import Manage from './routes/Manage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthenProvider>
                    <AppProvider>
                        <Routes>
                            <Route path="/*" element={<Client />} />
                            <Route path="/manage/*" element={<Manage />} />
                        </Routes>
                        <ProductModal />
                    </AppProvider>
                </AuthenProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
