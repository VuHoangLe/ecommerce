import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Helmet from '../../components/Helmet';
import Button from '../../components/button';
import CartItems from '../../features/client/shopping-cart/components/CartItems';

import '../../features/client/shopping-cart/components/cart.scss';
import { addDocument, updateField } from '../../firebase/services';
import { arrayUnion } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthenProvider';
import { AppContext } from '../../context/AppProvider';

function Cart() {
    const { hasUser } = useContext(AuthContext);
    const { userDetails, productLocal, setProductLocal } = useContext(AppContext);

    const [userProducts, setUserProduct] = useState(userDetails[0] ? userDetails[0].products : []);

    const [isGuest, setIsGuest] = useState(true);

    const [cartItems, setCartItems] = useState([]);

    const [totalProduct, setTotalProduct] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

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
            setCartItems(productLocal);
        } else {
            if (productLocal.length) {
                if (userDetails[0]) {
                    productLocal.forEach((item) => {
                        updateField('users', userDetails[0]?.docId, {
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
                    setProductLocal([]);
                    localStorage.removeItem('cartItems');
                }
            } else {
                setCartItems(userDetails[0]?.products);
            }
        }
    }, [isGuest, productLocal, userDetails, userProducts, cartItems, setProductLocal]);

    useEffect(() => {
        setTotalPrice(cartItems?.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
        setTotalProduct(cartItems?.reduce((total, item) => total + Number(item.quantity), 0));
    }, [cartItems]);

    const handlePurchase = async () => {
        if (isGuest) {
            alert('You need to login first');
            navigate('/login');
        } else {
            if (cartItems.length) {
                const orderId = await addDocument('orders', {
                    customer: userDetails[0]?.displayName,
                    products: userDetails[0]?.products,
                });
                navigate(`/cart/${orderId.id}`);
            } else {
                alert("you haven't bought anything yet");
            }
        }
    };

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
                        <Button size="block" onClick={() => handlePurchase()}>
                            Place Order
                        </Button>
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
