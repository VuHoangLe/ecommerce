import { useState, useEffect, useMemo, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import useFireStore from '../../hooks/useFirestore';

import { AppContext } from '../../context/AppProvider';

import { addDocument, deleteDocument, getDocumentById, updateField } from '../../firebase/services';

import Button from '../../components/button';

import PurchaseItem from '../../features/client/purchaseItem/components';

import '../../features/client/purchaseItem/components/purchase.scss';

function Purchase() {
    const navigate = useNavigate();

    const { id: purchaseId } = useParams();
    const { userDetails } = useContext(AppContext);

    const [purchaseOrder, setPurchaseOrder] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [inputVocher, setInputVocher] = useState('');
    const [total, setTotal] = useState(0);

    // get the order
    useEffect(() => {
        async function fetchData() {
            const response = await getDocumentById('orders', purchaseId);
            setPurchaseOrder(response);
        }
        fetchData();
    }, [purchaseId]);

    // check voucher
    const discountCondition = useMemo(() => {
        return {
            fieldName: 'code',
            operator: '==',
            compareValue: inputVocher,
        };
    }, [inputVocher]);

    const totalDiscount = useFireStore('vouchers', discountCondition);

    // user purchase event
    const handlePurchase = () => {
        // check address and phone number
        if (!userDetails[0].address && !userDetails[0].phone) {
            alert('You have to update your address and phone');
            navigate(`/profile/${userDetails[0].uid}`);
        } else {
            // reset products of user
            updateField('users', userDetails[0]?.docId, {
                products: [],
            });

            // save order infomation in turnovers collection
            addDocument('turnovers', {
                orderId: purchaseId,
                customerName: userDetails[0]?.displayName,
                customerId: userDetails[0]?.uid,
                totalSpending: total,
            });

            // update order status
            updateField('orders', purchaseId, {
                status: 'shipping',
            });
            alert('thanks for buying');
            navigate('/cart');
        }
    };

    useEffect(() => {
        setTotal(totalDiscount[0] ? subTotal - subTotal * totalDiscount[0]?.discount : subTotal);
        setSubTotal(
            purchaseOrder.products?.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0)
        );
    }, [subTotal, totalDiscount, purchaseOrder]);

    // user add voucher
    const handleInputVocher = (e) => {
        setInputVocher(e.target.value);
    };

    return (
        <div className="purchase">
            <div className="purchase__delivery">
                <h1 className="purchase__delivery__title color-red">Delivery address</h1>
                <div className="purchase__delivery__customer">
                    <h3 className="purchase__delivery__customer__name">
                        {purchaseOrder.customer} - {userDetails[0]?.address} - {userDetails[0]?.phone}
                    </h3>
                </div>
            </div>
            <div className="purchase__content">
                <div className="purchase__info">
                    <div className="purchase__info__title">
                        <h1>Products Ordered</h1>
                    </div>
                    <div className="purchase__info__detail">
                        <h5>Unit price</h5>
                        <h5>Amount</h5>
                        <h5>Subtotal</h5>
                    </div>
                </div>
                {purchaseOrder.products?.map((item) => (
                    <PurchaseItem key={item.docId} product={item} />
                ))}
            </div>
            <div className="purchase__vocher">
                <h2 className="purchase__vocher__title">Yolo Voucher</h2>
                <div className="purchase__vocher__input">
                    <input
                        type="text"
                        value={inputVocher}
                        onChange={(e) => handleInputVocher(e)}
                        placeholder="(Optional) Enter a voucher to get a discount"
                    />
                </div>
            </div>

            <div className="purchase__subtotal">
                <div className="purchase__subtotal__content">
                    <div className="purchase__subtotal__content__title">
                        <span>Merchandise Subtotal:</span>
                        <span>{subTotal}$</span>
                    </div>
                    <div className="purchase__subtotal__content__title">
                        <span>Discount total:</span>
                        <span>{totalDiscount[0] ? totalDiscount[0]?.discount * 100 : 0}%</span>
                    </div>
                    <div className="purchase__subtotal__content__title">
                        <span>Total payment:</span>
                        <span>{total}$</span>
                    </div>
                    {/* <PayPalScriptProvider
                        options={{
                            'client-id':
                                'AYUQmgiwMdGLEE5gTV2E3Gd8A4osyG_Qfp3rdgJKEk67K9Cr1BLTWHBqkLgtc5BdhAwu4qkTTEw9vTuE',
                        }}>
                        <PayPalButtons
                            createOrder={(actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: total,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then(function () {
                                    alert('Paid');
                                });
                            }}
                        />
                    </PayPalScriptProvider> */}
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <Button
                            onClick={() => {
                                navigate(-1);
                                deleteDocument('orders', purchaseId);
                            }}>
                            Cancle
                        </Button>

                        <Button onClick={() => handlePurchase()}>Place order</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Purchase;
