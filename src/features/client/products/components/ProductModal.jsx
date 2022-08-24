import { useMemo } from 'react';

import ProductView from './ProductView';
import Button from '../../../../components/button';

import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../../../redux/product-modal/productModalSlice';

import useFireStore from '../../../../hooks/useFirestore';

const ProductModal = () => {
    const dispatch = useDispatch();
    const productSlug = useSelector((state) => state.productModal.value);

    const productCondition = useMemo(() => {
        return {
            fieldName: 'slug',
            operator: '==',
            compareValue: productSlug,
        };
    }, [productSlug]);

    const getProductBySlug = useFireStore('products', productCondition)[0];

    return (
        <div className={`product-view__modal ${getProductBySlug === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={getProductBySlug} />
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
