import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { arrayUnion } from 'firebase/firestore';

import { AuthContext } from '../../context/AuthenProvider';
import { AppContext } from '../../context/AppProvider';

import { addDocument, updateField } from '../../firebase/services';

import Helmet from '../../components/Helmet';
import Button from '../../components/button';
import CartItems from '../../features/client/shopping-cart/components/CartItems';

import '../../features/client/shopping-cart/components/cart.scss';

function Cart() {
    const { hasUser } = useContext(AuthContext);
    const { userDetails, productLocal, setProductLocal } = useContext(AppContext);

    const navigate = useNavigate();

    // get products user select from firestore
    const [userProducts, setUserProduct] = useState(userDetails[0] ? userDetails[0].products : []);

    //check user status
    const [isGuest, setIsGuest] = useState(true);

    const [cartItems, setCartItems] = useState([]);

    const [totalProduct, setTotalProduct] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

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
            // if user hasn't login, set item in cart = all the item in the local storage
            setCartItems(productLocal);
        } else {
            // user has login
            // has item in local storage(user select while hasnt login yet)
            if (productLocal.length) {
                if (userDetails[0]) {
                    // loop products in localstorage and update to firestore
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
                    // set product's item in cart by get data from firestorage
                    setCartItems(userDetails[0]?.products);

                    // set product's item in localstorage to emty array
                    setProductLocal([]);
                    // delete local storage
                    localStorage.removeItem('cartItems');
                }
            } else {
                // if there's no item in localstorage
                setCartItems(userDetails[0]?.products);
            }
        }
    }, [isGuest, productLocal, userDetails, userProducts, cartItems, setProductLocal]);

    // caculate price and quantity
    useEffect(() => {
        setTotalPrice(cartItems?.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
        setTotalProduct(cartItems?.reduce((total, item) => total + Number(item.quantity), 0));
    }, [cartItems]);

    // user click on purchase btn
    const handlePurchase = async () => {
        // ref user to login page if hasnt login
        if (isGuest) {
            alert('You need to login first');
            navigate('/login');
        } else {
            // user login and has selected product and add to cart
            if (cartItems.length) {
                // add the order to firestorage and ref user to purchase page
                const orderId = await addDocument('orders', {
                    customer: userDetails[0]?.displayName,
                    customerId: userDetails[0]?.uid,
                    products: userDetails[0]?.products,
                    status: 'pending',
                });
                navigate(`/cart/${orderId.id}`);
            } else {
                // user login but doesn't sellect anything
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

                {!cartItems?.length ? (
                    <div className="cart__list" style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src="https://tranhnamdinh.vn/templates/default/images/cart-empty.png" alt="" />
                    </div>
                ) : (
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
                )}
            </div>
        </Helmet>
    );
}

export default Cart;
