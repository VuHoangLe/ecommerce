import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDocuments } from '../firebase/services';
import useFireStore from '../hooks/useFirestore';
import { AuthContext } from './AuthenProvider';

export const AppContext = createContext();
function AppProvider({ children }) {
    const { hasUser } = useContext(AuthContext);

    const products = useSelector((state) => state.cartItems.value);

    const [listProducts, setListProducts] = useState([]);

    const [categoryItems, setCategoryItems] = useState([]);

    const [userId, setUserId] = useState(hasUser ? hasUser.uid : null);

    const [productLocal, setProductLocal] = useState(products ? products : []);

    useEffect(() => {
        if (!hasUser) {
            setProductLocal(products);
        }
    }, [hasUser, products]);

    useEffect(() => {
        if (hasUser) {
            setUserId(hasUser.uid);
        }
    }, [hasUser]);

    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: userId,
        };
    }, [userId]);

    const userDetails = useFireStore('users', userCondition);

    useEffect(() => {
        async function fetchData() {
            const response = await getDocuments('products');
            setListProducts(response);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await getDocuments('categories');
            setCategoryItems(response);
        }
        fetchData();
    }, []);

    const randomProducts = useCallback(
        (count) => {
            const max = listProducts.length - count;
            const min = 0;
            const start = Math.floor(Math.random() * (max - min));
            return listProducts.slice(start, start + count);
        },
        [listProducts]
    );

    return (
        <AppContext.Provider
            value={{ listProducts, randomProducts, categoryItems, userDetails, productLocal, setProductLocal }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
