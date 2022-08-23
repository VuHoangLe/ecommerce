import { useState, useEffect, useMemo } from 'react';

import ProductView from './ProductView';
import Button from '../button/Button';
import './product.scss';

import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../redux/product-modal/productModalSlice';

import useFireStore from '../../hooks/useFirestore';

const ProductModal = () => {
    const dispatch = useDispatch();
    const productSlug = useSelector((state) => state.productModal.value);
    const [productDetails, setProductDetails] = useState(undefined);

    const productCondition = useMemo(() => {
        return {
            fieldName: 'slug',
            operator: '==',
            compareValue: productSlug,
        };
    }, [productSlug]);

    const getProductBySlug = useFireStore('products', productCondition)[0];

    useEffect(() => {
        setProductDetails(getProductBySlug);
    }, [getProductBySlug]);

    return (
        <div className={`product-view__modal ${productDetails === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={productDetails} />
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
