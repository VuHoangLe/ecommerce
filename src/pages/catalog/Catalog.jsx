import React, { useCallback, useEffect, useState } from 'react';

import './catalog.scss';

import Helmet from '../../components/Helmet';
import Grid from '../../components/grid/Grid';
import ProductCard from '../../components/product/Product';
import CatalogFilterWidget from './CatalogFilterWidget';
import Button from '../../components/button/Button';

import producData from '../../assets/fake-data/products';
import categoryData from '../../assets/fake-data/category';
import productColor from '../../assets/fake-data/product-color';
import productSize from '../../assets/fake-data/product-size';

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
                return check !== undefined;
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

    return (
        <Helmet title="Catalog">
            <div className="catalog">
                <div className="catalog__filter">
                    <CatalogFilterWidget title="CATEGORY" data={categoryData} filterCheck={filterCheck} />
                    <CatalogFilterWidget title="COLOR" data={productColor} filterCheck={filterCheck} />
                    <CatalogFilterWidget title="SIZE" data={productSize} filterCheck={filterCheck} />

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>
                                Remove filter
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__content">
                    <Grid col={3} mdCol={2} smCol={1} gap={20}>
                        {products.map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                slug={item.slug}
                                price={item.price}
                            />
                        ))}
                    </Grid>
                </div>
            </div>
        </Helmet>
    );
}

export default Catalog;
