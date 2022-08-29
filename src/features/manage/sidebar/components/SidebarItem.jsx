import React from 'react';

function SidebarItem({ active, name }) {
    return (
        <div className="sidebar__list">
            <div className={`sidebar__list__item ${active ? 'active' : ''}`}>
                <span>{name}</span>
            </div>
        </div>
    );
}

export default SidebarItem;
