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

    const [productLocal, setProductLocal] = useState(products ? products : []);

    const [turnOver, setTurnOver] = useState([]);

    const [order, setOrder] = useState([]);

    const [listUsers, setListUsers] = useState([]);

    const [vouchers, setVouchers] = useState([]);

    // set the product that user select into state if user hasn't login yet
    useEffect(() => {
        if (!hasUser) {
            setProductLocal(products);
        }
    }, [hasUser, products]);

    // get all infomations of the current user
    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: hasUser ? hasUser.uid : null,
        };
    }, [hasUser]);

    const userDetails = useFireStore('users', userCondition);

    // get all products from firestore
    useEffect(() => {
        async function fetchData() {
            const response = await getDocuments('products');
            setListProducts(response);
        }
        fetchData();
    }, []);

    // get category data from firestore
    useEffect(() => {
        async function fetchData() {
            const response = await getDocuments('categories');
            setCategoryItems(response);
        }
        fetchData();
    }, []);

    // funtion random product
    const randomProducts = useCallback(
        (count) => {
            const max = listProducts.length - count;
            const min = 0;
            const start = Math.floor(Math.random() * (max - min));
            return listProducts.slice(start, start + count);
        },
        [listProducts]
    );

    // get turnover datas
    useEffect(() => {
        async function fetchData() {
            const response = await getDocuments('turnovers');
            setTurnOver(response);
        }
        fetchData();
    }, []);

    // get order datas
    useEffect(() => {
        async function fetchData() {
            const response = await getDocuments('orders');
            setOrder(response);
        }
        fetchData();
    }, []);

    //get list users
    useEffect(() => {
        async function fetchData() {
            const response = await getDocuments('users');
            setListUsers(response);
        }
        fetchData();
    }, []);

    // get list vouchers
    useEffect(() => {
        async function fetchData() {
            const response = await getDocuments('vouchers');
            setVouchers(response);
        }
        fetchData();
    }, []);

    return (
        <AppContext.Provider
            value={{
                listProducts,
                randomProducts,
                categoryItems,
                userDetails,
                productLocal,
                setProductLocal,
                turnOver,
                order,
                listUsers,
                vouchers,
            }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
