import React from 'react';

function SidebarItem({ active, name }) {
    const activeSidebar = active ? 'active' : '';
    return (
        <div className="sidebar__list">
            <div className={`sidebar__list__item ${activeSidebar}`}>
                <span>{name}</span>
            </div>
        </div>
    );
}

export default SidebarItem;
