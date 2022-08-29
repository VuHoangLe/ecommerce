import { useRef } from 'react';
import PropTypes from 'prop-types';

import './customcheck.scss';

function Checkbox({ checked, onChange, label }) {
    const inputRef = useRef(null);
    const onInputChange = () => {
        if (onChange) {
            onChange(inputRef.current);
        }
    };

    return (
        <label className="customCheck">
            <input type="checkbox" ref={inputRef} onChange={onInputChange} checked={checked} />
            <span className="customCheck__checkmark">
                <i className="bx bx-check"></i>
            </span>
            {label}
        </label>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
};

export default Checkbox;
