import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Helmet from '../../components/Helmet';
import Button from '../../components/button/Button';
import CartItems from './CartItems';

import productData from '../../assets/fake-data/products';
import './cart.scss';

function Cart() {
    const cartItems = useSelector((state) => state.cartItems.value);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems));
        setTotalProduct(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
        setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity * item.price), 0));
    }, [cartItems]);

    return (
        <Helmet title="Cart">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__detail">
                        <p>{totalProduct > 1 ? `Total (${totalProduct} items) ` : `Total (${totalProduct} item) `}</p>
                        <div className="cart__info__detail__price">
                            <span>Subtotal:</span>
                            <span>${totalPrice}</span>
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
                    {cartProducts.map((item, index) => (
                        <CartItems key={index} item={item} />
                    ))}
                </div>
            </div>
        </Helmet>
    );
}

export default Cart;
