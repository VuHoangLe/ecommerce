import { Link } from 'react-router-dom';

import Button from '../../../../components/button';

function SliderItem(props) {
    return (
        <div className={`slider__item ${props.active ? 'active' : ''}`}>
            <div className="slider__item__info">
                <div className={`slider__item__info__title color-${props.item.color}`}>
                    <span>{props.item.title}</span>
                </div>
                <div className="slider__item__info__description">
                    <span>{props.item.description}</span>
                </div>
                <div className="slider__item__info__btn">
                    <Link to={props.item.path}>
                        <Button backgroundColor={props.item.color} icon="bx bx-cart" animate>
                            See details
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="slider__item__image">
                <div className={`shape bg-${props.item.color}`}></div>
                <img src={props.item.img} alt="" />
            </div>
        </div>
    );
}

export default SliderItem;
