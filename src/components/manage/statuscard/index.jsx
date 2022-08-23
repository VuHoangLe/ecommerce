import React from 'react';
import './statuscard.scss';
function StatusCard({ icon, count, title }) {
    return (
        <div className="statuscard">
            <div className="statuscard__icon">
                <i className={icon}></i>
            </div>

            <div className="statuscard__detail">
                <h4>{count}</h4>
                <span>{title}</span>
            </div>
        </div>
    );
}

export default StatusCard;
