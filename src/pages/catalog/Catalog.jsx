import React, { useCallback, useEffect, useState } from 'react';

import './catalog.scss';

import Helmet from '../../components/Helmet';
import CatalogFilterWidget, { CatalogFilterButton } from './CatalogFilterWidget';
import InfinityList from '../../components/InfinityList';

import producData from '../../assets/fake-data/products';
import categoryData from '../../assets/fake-data/category';
import productColor from '../../assets/fake-data/product-color';
import productSize from '../../assets/fake-data/product-size';
import { useRef } from 'react';
import Button from '../../components/button/Button';

function Catalog() {
    const initFilter = {
        category: [],
        color: [],
        size: [],
    };

    const productList = producData.getAllProducts();

    const [filter, setFilter] = useState(initFilter);
    const [products, setProducts] = useState(productList);

    const filterCheck = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.color] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
                    setFilter(...filter);
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'COLOR':
                    const newColor = filter.color.filter((e) => e !== item.color);
                    setFilter({ ...filter, color: newColor });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
                    setFilter(...filter);
            }
        }
    };

    const renderProduct = useCallback(() => {
        let temp = productList;
        if (filter.category.length) {
            temp = temp.filter((e) => filter.category.includes(e.categorySlug));
        }
        if (filter.color.length) {
            temp = temp.filter((e) => {
                const check = e.colors.find((color) => {
                    return filter.color.includes(color);
                });
                return check;
            });
        }

        if (filter.size.length) {
            temp = temp.filter((e) => {
                const check = e.size.find((size) => filter.size.includes(size));
                return check;
            });
        }
        setProducts(temp);
    }, [filter, setProducts, productList]);

    useEffect(() => {
        renderProduct();
    }, [renderProduct]);

    const clearFilter = () => {
        setFilter(initFilter);
    };

    const filterRef = useRef(null);
    const controlFilter = () => {
        filterRef.current.classList.toggle('active');
    };

    return (
        <Helmet title="Catalog">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={controlFilter}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <CatalogFilterWidget
                        title="CATEGORY"
                        data={categoryData}
                        filterCheck={filterCheck}
                        filter={filter.category}
                    />
                    <CatalogFilterWidget
                        title="COLOR"
                        data={productColor}
                        filterCheck={filterCheck}
                        filter={filter.color}
                    />
                    <CatalogFilterWidget
                        title="SIZE"
                        data={productSize}
                        filterCheck={filterCheck}
                        filter={filter.size}
                    />

                    <CatalogFilterButton size="sm" clearFilter={clearFilter} />
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={controlFilter}>
                        Filter
                    </Button>
                </div>
                <div className="catalog__content">
                    <InfinityList data={products} perload={6} />
                </div>
            </div>
        </Helmet>
    );
}

export default Catalog;
