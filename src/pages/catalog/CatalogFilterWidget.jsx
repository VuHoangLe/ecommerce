import React from 'react';
import Checkbox from '../../components/checkbox/Checkbox';

function CatalogFilterWidget(props) {
    return (
        <div className="catalog__filter__widget">
            <h1 className="catalog__filter__widget__title">{props.title}</h1>
            <div className="catalog__filter__widget__content">
                {props.data.map((item, index) => (
                    <div key={index} className="catalog__filter__widget__content__item">
                        <Checkbox
                            label={item.display}
                            onChange={(input) => props.filterCheck(props.title, input.checked, item)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CatalogFilterWidget;
