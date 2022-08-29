import { useEffect, useState, useRef, useCallback, useContext } from 'react';

import { CircularProgress } from '@mui/material';

import { AppContext } from '../../context/AppProvider';
import productColor from '../../assets/fake-data/product-color';
import productSize from '../../assets/fake-data/product-size';

import Helmet from '../../components/Helmet';
import Button from '../../components/button';
import Checkbox from '../../components/checkbox';

import '../../features/client/categories/components/catalog.scss';
import Pagination from '../../components/pagination';

function Catalog() {
    const { listProducts, categoryItems } = useContext(AppContext);
    const [allProducts, setAllProducts] = useState(listProducts);

    // init user's filter sellection
    const [filterCatalog, setFilterCatalog] = useState({
        category: [],
        color: [],
        size: [],
    });

    // show or hide filter bar
    const filterRef = useRef(null);

    const controlFilter = () => {
        filterRef.current.classList.toggle('active');
    };

    // remove user's filter sellection
    const clearFilter = () => {
        setFilterCatalog({ category: [], color: [], size: [] });
    };

    // save user's selection
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
            // remove un-sellect products
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

    // render products with user's filter sellection
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

    // render products every time user filter
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
                                                checked={filterCatalog.category.includes(item.id)}
                                                onChange={(elmt) => filterSelected('CATEGORY', elmt.checked, item)}
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
                                                checked={filterCatalog.color.includes(item.color)}
                                                onChange={(elmt) => filterSelected('COLOR', elmt.checked, item)}
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
                                                checked={filterCatalog.size.includes(item.size)}
                                                onChange={(elmt) => filterSelected('SIZE', elmt.checked, item)}
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

                        {!allProducts.length ? (
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <img
                                    src="https://www.dokantec.com/resources/assets/front/images/no-product-found.png"
                                    alt=""
                                />
                            </div>
                        ) : (
                            <div className="catalog__content">
                                <Pagination data={allProducts} limit={6} />
                            </div>
                        )}
                    </div>
                </Helmet>
            ) : (
                <CircularProgress color="secondary" />
            )}
        </>
    );
}

export default Catalog;
