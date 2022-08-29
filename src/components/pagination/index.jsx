import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Grid from '../grid';

import { ProductCard } from '../../features/client/products';

import './pagination.scss';

function Pagination({ data, limit }) {
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        setProductData(limit ? data.slice(0, limit) : data);
    }, [data, limit]);

    // current page
    const [currPage, setCurrPage] = useState(0);

    let pages = 1;
    let range = [];

    if (limit !== undefined) {
        let page = Math.floor(data.length / limit);
        pages = data.length % limit === 0 ? page : page + 1;
        range = [...Array(pages).keys()];
    }

    const selectPage = (page) => {
        const start = limit * page;
        const end = start + limit;
        setProductData(data.slice(start, end));
        setCurrPage(page);
    };

    return (
        <>
            <Grid col={3} mdCol={2} smCol={1} gap={20}>
                {productData.map((item, index) => (
                    <ProductCard
                        key={index}
                        img01={item.image01}
                        img02={item.image02}
                        name={item.name}
                        price={item.price}
                        slug={item.slug}
                        oldPrice={item.oldPrice}
                    />
                ))}
            </Grid>
            {pages > 1 ? (
                <div className="pagination">
                    {range.map((item, index) => (
                        <div
                            key={index}
                            className={`pagination-item ${currPage === index ? 'active' : ''}`}
                            onClick={() => {
                                selectPage(index);
                                window.scrollTo(0, 0);
                            }}>
                            {item + 1}
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
}

Pagination.propTypes = {
    data: PropTypes.array.isRequired,
    limit: PropTypes.number,
};

export default Pagination;
