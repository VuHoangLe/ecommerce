import React from 'react';
import PropTypes from 'prop-types';

import SliderItem from './SliderItem';

import './slider.scss';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';

function Slider(props) {
    const data = props.data;

    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = useCallback(() => {
        const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
        setActiveSlide(index);
    }, [activeSlide, data]);

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
        setActiveSlide(index);
    };

    const timeOut = props.timeOut ? props.timeOut : 3000;

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide();
            }, timeOut);
            return () => {
                clearInterval(slideAuto);
            };
        }
    }, [nextSlide, timeOut, props]);

    return (
        <div className="slider">
            {data.map((item, index) => (
                <SliderItem key={index} item={item} active={index === activeSlide} />
            ))}

            {props.control ? (
                <div className="slider__control">
                    <div className="slider__control__item" onClick={prevSlide}>
                        <i className="bx bx-chevron-left"></i>
                    </div>
                    <div className="slider__control__item">
                        <div className="slider__control__item__index">
                            {activeSlide + 1} / {data.length}
                        </div>
                    </div>
                    <div className="slider__control__item" onClick={nextSlide}>
                        <i className="bx bx-chevron-right"></i>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

Slider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool.isRequired,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
};

export default Slider;
