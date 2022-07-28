import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addItem } from '../../redux/shopping-cart/cartItemSlice';
import Button from '../../components/button/Button';
import './product.scss';

const ProductView = ({ product }) => {
    const dispatch = useDispatch();

    const Navigate = useNavigate();

    if (product === undefined) {
        product = {
            title: '',
            price: '',
            image01: null,
            image02: null,
            categorySlug: '',
            colors: [],
            slug: '',
            size: [],
            description: '',
        };
    }

    const [previewImg, setPreviewImg] = useState(product.image01);
    const [expand, setExpand] = useState(false);
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);

    function handleExpand() {
        setExpand(!expand);
    }

    const handleQuantity = (type) => {
        switch (type) {
            case 'plus':
                setQuantity((prev) => prev + 1);
                break;
            case 'minus':
                setQuantity((prev) => (prev - 1 < 1 ? 1 : prev - 1));
                break;
            default:
                setQuantity(quantity);
                break;
        }
    };

    useEffect(() => {
        setColor(undefined);
        setSize(undefined);
        setQuantity(1);
        setExpand(false);
        setPreviewImg(product.image01);
    }, [product]);

    const check = () => {
        if (color === undefined) {
            alert('Please choose a color');
            return false;
        }
        if (size === undefined) {
            alert('Please choose a size');
            return false;
        }
        return true;
    };

    const addToCart = () => {
        if (check()) {
            dispatch(
                addItem({
                    name: product.title,
                    color: color,
                    size: size,
                    quantity: quantity,
                    slug: product.slug,
                    price: product.price,
                })
            );
            alert('SuccessFul');
        }
    };

    const goToCart = () => {
        if (check()) {
            dispatch(
                addItem({
                    name: product.title,
                    color: color,
                    size: size,
                    quantity: quantity,
                    slug: product.slug,
                    price: product.price,
                })
            );
            Navigate('/cart');
        }
    };

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image01)}>
                        <img src={product.image01} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image02)}>
                        <img src={product.image02} alt="" />
                    </div>
                </div>

                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>

                <div className={`product-description ${expand ? 'expand' : ''}`}>
                    <h1 className="product-description__title">Product details</h1>
                    <p
                        className="product-description__content"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={handleExpand}>
                            {expand ? 'Load less' : ' Load more'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.title}</h1>
                <div className="product__info__description">
                    <div className="product__info__description__price">{product.price}</div>
                </div>
                <div className="product__info__description">
                    <div className="product__info__description__title">Colors</div>
                    <div className="product__info__description__list">
                        {product.colors.map((item, index) => (
                            <div
                                key={index}
                                className={`product__info__description__list__item ${color === item ? 'active' : ''}`}
                                onClick={() => setColor(item)}>
                                <div className={`circle bg-${item}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="product__info__description">
                    <div className="product__info__description__title">Size</div>
                    <div className="product__info__description__list">
                        {product.size.map((item, index) => (
                            <div
                                key={index}
                                className={`product__info__description__list__item ${size === item ? 'active' : ''}`}
                                onClick={() => setSize(item)}>
                                <span className="product__info__description__list__item__size">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="product__info__description">
                    <div className="product__info__description__title">Quantity</div>
                    <div className="product__info__description__quantity">
                        <div
                            className="product__info__description__quantity__btn"
                            onClick={() => handleQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>

                        <div className="product__info__description__quantity__import">{quantity}</div>
                        <div
                            className="product__info__description__quantity__btn"
                            onClick={() => handleQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>

                <div className="product__info__description">
                    <Button size="sm" onClick={addToCart}>
                        Add to cart
                    </Button>
                    <Button size="sm" onClick={goToCart}>
                        Buy now
                    </Button>
                </div>

                {/* description */}
                <div className={`product-description mobile ${expand ? 'expand' : ''}`}>
                    <h1 className="product-description__title">Product details</h1>
                    <p
                        className="product-description__content"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={handleExpand}>
                            {expand ? 'Load less' : ' Load more'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductView.propTypes = {
    product: PropTypes.object,
};

export default ProductView;
