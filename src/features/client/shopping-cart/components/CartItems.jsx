import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { arrayRemove } from 'firebase/firestore';
import { removeItem, updateItem } from '../../../../redux/shopping-cart/cartItemSlice';
import { getDocumentById, updateField } from '../../../../firebase/services';

const CartItems = ({ cartItems, userDetails, data, isGuest }) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState(cartItems);
    const [quantity, setQuantity] = useState(0);
    const [productDetail, setProductDetail] = useState([]);
    const docId = cartItems.docId;

    console.log(data);
    console.log(cartItems);

    // get product's details by document id
    useEffect(() => {
        getDocumentById('products', docId).then((data) => {
            setProductDetail(data);
        });
    }, [docId, cartItems]);

    useEffect(() => {
        setItem(cartItems);
        setQuantity(cartItems.quantity);
    }, [cartItems]);

    // handle quantity update
    const updateQuantity = (type) => {
        if (type === '+') {
            if (isGuest) {
                // spread prev state and update quantity
                dispatch(updateItem({ ...item, quantity: quantity + 1 }));
            } else {
                // get all products that user select, compare the document id then update quantity
                let update = data.map((elmt) => {
                    if (elmt.docId === item.docId) {
                        elmt.quantity += 1;
                    }
                    return elmt;
                });

                // update products field
                updateField('users', userDetails.docId, {
                    products: [...update],
                });
            }
        }
        if (type === '-') {
            if (isGuest) {
                // spread prev state and update quantity
                dispatch(updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 }));
            } else {
                // get all products that user select, compare the document id then update quantity
                let update = data.map((elmt) => {
                    if (elmt.docId === item.docId) {
                        elmt.quantity = quantity - 1 === 0 ? 1 : quantity - 1;
                    }
                    return elmt;
                });
                // update products field
                updateField('users', userDetails.docId, {
                    products: [...update],
                });
            }
        }
    };

    // remove the product that user select
    const removeCartItem = () => {
        if (isGuest) {
            // remove product in local storage
            dispatch(removeItem(item));
        } else {
            // delete product user select in database
            updateField('users', userDetails?.docId, {
                products: arrayRemove(item),
            });
        }
    };

    return (
        <div className="cart__item">
            <div className="cart__item__image">
                <img src={productDetail?.image01} alt="" />
            </div>

            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link
                        to={`/catalog/${productDetail?.slug}`}>{`${productDetail?.name} - ${item.color} - ${item.size}`}</Link>
                </div>
                <div className="cart__item__info__price">{productDetail?.price}</div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__description__quantity">
                        <div className="product__info__description__quantity__btn" onClick={() => updateQuantity('-')}>
                            <i className="bx bx-minus"></i>
                        </div>

                        <div className="product__info__description__quantity__import">{quantity}</div>
                        <div className="product__info__description__quantity__btn" onClick={() => updateQuantity('+')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="cart__item__info__del" onClick={() => removeCartItem()}>
                    <i className="bx bx-trash"></i>
                </div>
            </div>
        </div>
    );
};

CartItems.propTypes = {
    item: PropTypes.object,
};

export default CartItems;
