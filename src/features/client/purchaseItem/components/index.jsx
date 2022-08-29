import React, { useEffect, useState } from 'react';
import { getDocumentById } from '../../../../firebase/services';

function PurchaseItem({ product }) {
    const [purchaseProduct, setPurchaseProduct] = useState([]);

    // get the product's details from database by document id
    useEffect(() => {
        async function fetchData() {
            const response = await getDocumentById('products', product.docId);
            setPurchaseProduct(response);
        }
        fetchData();
    }, [product]);
    return (
        <div className="purchase__item">
            <div className="purchase__item__preview">
                <div className="purchase__item__preview__image">
                    <img src={purchaseProduct.image01} alt="" />
                </div>
                <h1 className="purchase__item__preview__name">{purchaseProduct.name}</h1>
            </div>

            <div className="purchase__item__detail">
                <span className="purchase__item__detail__unit">{purchaseProduct.price}</span>
                <span className="purchase__item__detail__amount">{product.quantity}</span>
                <span className="purchase__item__detail__subtotal">{purchaseProduct.price * product.quantity}</span>
            </div>
        </div>
    );
}

export default PurchaseItem;
