import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import './sidebar.scss';

const SIDEBAR_ITEMS = [
    {
        name: 'Dashboard',
        route: '/manage',
    },
    {
        name: 'Customers',
        route: '/manage/customer',
    },
    {
        name: 'Products',
        route: '/manage/product',
    },
    {
        name: 'Orders',
        route: '/manage/order',
    },
    {
        name: 'Analytics',
        route: '/manage/analytic',
    },
];
function Sidebar() {
    const pathName = useLocation().pathname;
    const activeItem = SIDEBAR_ITEMS.findIndex((item) => item.route === pathName);
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img
                    src="http://static.ybox.vn/2021/8/3/1628660924669-Thi%E1%BA%BFt%20k%E1%BA%BF%20kh%C3%B4ng%20t%C3%AAn.png"
                    alt=""
                />
            </div>
            {SIDEBAR_ITEMS.map((item, index) => (
                <Link to={item.route} key={index}>
                    <SidebarItem name={item.name} active={index === activeItem} />
                </Link>
            ))}
        </div>
    );
}

export default Sidebar;
