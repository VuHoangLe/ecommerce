import { useRef } from 'react';
import PropTypes from 'prop-types';

import './customcheck.scss';

function Checkbox(props) {
    const inputRef = useRef(null);

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current);
        }
    };

    return (
        <label className="customCheck">
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
            <span className="customCheck__checkmark">
                <i className="bx bx-check"></i>
            </span>
            {props.label}
        </label>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
};

export default Checkbox;
