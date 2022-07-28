import React from 'react';
import Button from '../../components/button/Button';
import Checkbox from '../../components/checkbox/Checkbox';

function CatalogFilterWidget(props) {
    const { filter } = props;

    const checkType = (item) => {
        if (item.categorySlug) {
            return filter.includes(item.categorySlug);
        }
        if (item.color) {
            return filter.includes(item.color);
        }
        if (item.size) {
            return filter.includes(item.size);
        }
    };
    return (
        <div className="catalog__filter__widget">
            <h1 className="catalog__filter__widget__title">{props.title}</h1>
            <div className="catalog__filter__widget__content">
                {props.data.map((item, index) => (
                    <div key={index} className="catalog__filter__widget__content__item">
                        <Checkbox
                            label={item.display}
                            onChange={(input) => props.filterCheck(props.title, input.checked, item)}
                            checked={checkType(item)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function CatalogFilterButton({ size, clearFilter }) {
    return (
        <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
                <Button size={size} onClick={clearFilter}>
                    Remove filter
                </Button>
            </div>
        </div>
    );
}

export default CatalogFilterWidget;
