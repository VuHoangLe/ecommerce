import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductView from './ProductView';
import productData from '../../assets/fake-data/products';
import Button from '../button/Button';
import { remove } from '../../redux/product-modal/productModalSlice';

import './product.scss';

const ProductModal = () => {
    const dispatch = useDispatch();
    const productSlug = useSelector((state) => state.productModal.value);
    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        setProduct(productData.getProductBySlug(productSlug));
    }, [productSlug]);

    return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={product} />
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"
                        onClick={() => {
                            dispatch(remove());
                        }}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
