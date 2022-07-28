import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set } from '../../redux/product-modal/productModalSlice';

import Button from '../button/Button';

import './product.scss';

const ProductCard = ({ img01, img02, name, price, slug, oldPrice }) => {
    const dispatch = useDispatch();
    const setSlug = () => {
        dispatch(set(slug));
    };

    return (
        <div className="product-card">
            <Link to={`/catalog/${slug}`}>
                <div className="product-card__image">
                    <img src={img01} alt="" />
                    <img src={img02} alt="" />
                </div>
                <h3 className="product-card__name">{name}</h3>
                <div className="product-card__price">
                    {price}$
                    <span className="product-card__price__old">
                        <del>{oldPrice}$</del>
                    </span>
                </div>
            </Link>

            <div className="product-card__btn">
                <Button size="sm" icon="bx bx-cart" animate onClick={setSlug}>
                    Add to cart
                </Button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    oldPrice: PropTypes.number.isRequired,
};

export default ProductCard;
