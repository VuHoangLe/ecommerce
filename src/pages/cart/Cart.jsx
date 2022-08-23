import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Helmet from '../../components/Helmet';
import Button from '../../components/button/Button';
import CartItems from './CartItems';
import { AuthContext } from '../../components/context/AuthenProvider';

import './cart.scss';
import { updateField } from '../../firebase/services';
import { AppContext } from '../../components/context/AppProvider';
import { arrayUnion } from 'firebase/firestore';

function Cart() {
    const { hasUser } = useContext(AuthContext);
    const { userDetails, productLocal } = useContext(AppContext);

    const [userProducts, setUserProduct] = useState(userDetails[0] ? userDetails[0].products : []);

    const [isGuest, setIsGuest] = useState(true);

    const [localItems, setLocalItem] = useState(productLocal);

    const [cartItems, setCartItems] = useState([]);

    const [totalProduct, setTotalProduct] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setLocalItem(productLocal);
    }, [productLocal]);

    useEffect(() => {
        if (userDetails[0]) {
            setUserProduct(userDetails[0].products);
        }
    }, [userDetails]);

    useEffect(() => {
        if (hasUser) {
            setIsGuest(false);
        }
    }, [hasUser]);

    useEffect(() => {
        if (isGuest) {
            console.log('unlogin with local');
            setCartItems(localItems);
        } else {
            if (localItems.length) {
                console.log('login with local');
                if (userDetails[0]) {
                    localItems.forEach((item) => {
                        return updateField('users', userDetails[0]?.docId, {
                            products: arrayUnion({
                                color: item.color,
                                docId: item.docId,
                                price: item.price,
                                quantity: item.quantity,
                                size: item.size,
                            }),
                        });
                    });
                    setCartItems(userDetails[0]?.products);
                    localStorage.removeItem('cartItems');
                }
            } else {
                console.log('login without local');
                setCartItems(userDetails[0]?.products);
            }
        }
    }, [isGuest, localItems, userDetails, userProducts, cartItems]);

    useEffect(() => {
        setTotalPrice(cartItems?.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
        setTotalProduct(cartItems?.reduce((total, item) => total + Number(item.quantity), 0));
    }, [cartItems]);

    return (
        <Helmet title="Cart">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__detail">
                        <p>{totalProduct > 1 ? `Total (${totalProduct} items) ` : `Total (${totalProduct} item) `}</p>
                        <div className="cart__info__detail__price">
                            <span>Subtotal:</span>
                            <span>{totalPrice}$</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">Place Order</Button>
                        <Link to="/catalog">
                            <Button size="block">Keep Buying</Button>
                        </Link>
                    </div>
                </div>

                <div className="cart__list">
                    {cartItems?.map((item, index) => (
                        <CartItems
                            key={index}
                            cartItems={item}
                            data={cartItems}
                            isGuest={isGuest}
                            userDetails={userDetails[0]}
                        />
                    ))}
                </div>
            </div>
        </Helmet>
    );
}

export default Cart;
