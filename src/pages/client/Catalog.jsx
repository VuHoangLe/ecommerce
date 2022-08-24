import { useEffect, useState, useRef, useCallback, useContext } from 'react';

import Helmet from '../../components/Helmet';
import Button from '../../components/button';
import Checkbox from '../../components/checkbox/Checkbox';

import productColor from '../../assets/fake-data/product-color';
import productSize from '../../assets/fake-data/product-size';

import '../../features/client/categories/components/catalog.scss';

import Grid from '../../components/grid/Grid';
import { CircularProgress } from '@mui/material';
import { AppContext } from '../../context/AppProvider';

import { ProductCard } from '../../features/client/products';

function Catalog() {
    const { listProducts, categoryItems } = useContext(AppContext);
    const [allProducts, setAllProducts] = useState(listProducts);

    const [filterCatalog, setFilterCatalog] = useState({
        category: [],
        color: [],
        size: [],
    });

    const filterRef = useRef(null);

    const controlFilter = () => {
        filterRef.current.classList.toggle('active');
    };

    const clearFilter = () => {
        setFilterCatalog({ category: [], color: [], size: [] });
    };

    useEffect(() => {
        setAllProducts(listProducts);
    }, [listProducts]);

    const filterSelected = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilterCatalog({ ...filterCatalog, category: [...filterCatalog.category, item.id] });
                    break;
                case 'COLOR':
                    setFilterCatalog({ ...filterCatalog, color: [...filterCatalog.color, item.color] });
                    break;
                case 'SIZE':
                    setFilterCatalog({ ...filterCatalog, size: [...filterCatalog.size, item.size] });
                    break;
                default:
                    setFilterCatalog({ ...filterCatalog });
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newFilterCata = filterCatalog.category.filter((elmt) => elmt !== item.id);
                    setFilterCatalog({ ...filterCatalog, category: newFilterCata });
                    break;
                case 'COLOR':
                    const newFilterColor = filterCatalog.color.filter((elmt) => elmt !== item.color);
                    setFilterCatalog({ ...filterCatalog, color: newFilterColor });
                    break;
                case 'SIZE':
                    const newFilterSize = filterCatalog.size.filter((elmt) => elmt !== item.size);
                    setFilterCatalog({ ...filterCatalog, size: newFilterSize });
                    break;
                default:
                    setFilterCatalog({ ...filterCatalog });
            }
        }
    };

    const rerenderProducts = useCallback(() => {
        let temp = listProducts;
        if (filterCatalog.category.length) {
            temp = temp.filter((elmt) => filterCatalog.category.includes(elmt.categoryId));
        }
        if (filterCatalog.color.length) {
            temp = temp.filter((elmt) => {
                const check = elmt.colors.find((color) => filterCatalog.color.includes(color));
                return check;
            });
        }
        if (filterCatalog.size.length) {
            temp = temp.filter((elmt) => {
                const check = elmt.size.find((size) => filterCatalog.size.includes(size));
                return check;
            });
        }
        setAllProducts(temp);
    }, [filterCatalog, listProducts]);

    useEffect(() => {
        rerenderProducts();
    }, [rerenderProducts]);

    return (
        <>
            {listProducts.length ? (
                <Helmet title="Catalog">
                    <div className="catalog">
                        <div className="catalog__filter" ref={filterRef}>
                            <div className="catalog__filter__close" onClick={controlFilter}>
                                <i className="bx bx-left-arrow-alt"></i>
                            </div>

                            {/* Filter by Category */}
                            <div className="catalog__filter__widget">
                                <h1 className="catalog__filter__widget__title">Category</h1>

                                <div className="catalog__filter__widget__content">
                                    {categoryItems.map((item, index) => (
                                        <div key={index} className="catalog__filter__widget__content__item">
                                            <Checkbox
                                                label={item.name}
                                                onChange={(input) => filterSelected('CATEGORY', input.checked, item)}
                                                checked={filterCatalog.category.includes(item.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Filter by Color */}
                            <div className="catalog__filter__widget">
                                <h1 className="catalog__filter__widget__title">Color</h1>

                                <div className="catalog__filter__widget__content">
                                    {productColor.map((item, index) => (
                                        <div key={index} className="catalog__filter__widget__content__item">
                                            <Checkbox
                                                label={item.name}
                                                onChange={(input) => filterSelected('COLOR', input.checked, item)}
                                                checked={filterCatalog.color.includes(item.color)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Filter by Size */}
                            <div className="catalog__filter__widget">
                                <h1 className="catalog__filter__widget__title">Size</h1>

                                <div className="catalog__filter__widget__content">
                                    {productSize.map((item, index) => (
                                        <div key={index} className="catalog__filter__widget__content__item">
                                            <Checkbox
                                                label={item.name}
                                                onChange={(input) => filterSelected('SIZE', input.checked, item)}
                                                checked={filterCatalog.size.includes(item.size)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="catalog__filter__widget">
                                <div className="catalog__filter__widget__content">
                                    <Button size="sm" onClick={clearFilter}>
                                        Remove filter
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="catalog__filter__toggle">
                            <Button size="sm" onClick={() => controlFilter()}>
                                Filter
                            </Button>
                        </div>
                        <div className="catalog__content">
                            {/* <InfinityList data={allProducts} perload={6} /> */}
                            <Grid col={3} mdCol={2} smCol={1} gap={20}>
                                {allProducts.map((item, index) => (
                                    <ProductCard
                                        key={index}
                                        img01={item.image01}
                                        img02={item.image02}
                                        name={item.name}
                                        price={Number(item.price)}
                                        slug={item.slug}
                                        oldPrice={item.oldPrice}
                                    />
                                ))}
                            </Grid>
                        </div>
                    </div>
                </Helmet>
            ) : (
                <CircularProgress color="secondary" />
            )}
        </>
    );
}

export default Catalog;
