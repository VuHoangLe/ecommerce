import Authen from './authen/Authen';
import Navigate from '../routes/Navigate';
import { BrowserRouter } from 'react-router-dom';
import ProductModal from './product/ProductModal';

function Layout() {
    return (
        <BrowserRouter>
            <Authen>
                <Navigate />
                <ProductModal />
            </Authen>
        </BrowserRouter>
    );
}

export default Layout;
