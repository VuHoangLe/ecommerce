import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../../dropdown/components';
import './topnav.scss';

const NOTIFICATION = [
    {
        icon: 'bx bx-error',
        content: 'Error',
    },
    {
        icon: 'bx bx-package',
        content: 'Package',
    },
    {
        icon: 'bx bx-cart',
        content: 'Cart',
    },
];

const USER_MENU = [
    {
        icon: 'bx bx-user',
        content: 'Profile',
    },
    {
        icon: 'bx bx-log-out-circle bx-rotate-180',
        content: 'Logout',
    },
];

const CURRENT_USER = {
    displayName: 'Admin',
    photoURL: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png',
};

const userInfo = (user) => (
    <div className="topnav__right__user">
        <div className="topnav__right__user__image">
            <img src={user.photoURL} alt="" />
        </div>
        <div className="topnav__right__user__name">{user.displayName}</div>
    </div>
);

function TopNav() {
    return (
        <div className="topnav">
            <div className="topnav__search">
                <input type="text" placeholder="Search..." />
                <i className="bx bx-search"></i>
            </div>

            <div className="topnav__right">
                <div className="topnav__right__item">
                    <Dropdown renderUserInfo={userInfo(CURRENT_USER)} content={USER_MENU} />
                </div>
                <div className="topnav__right__item">
                    <Dropdown
                        icon="bx bx-bell"
                        badge="5"
                        content={NOTIFICATION}
                        renderFooter={() => <Link to="/manage">View All</Link>}
                    />
                </div>
                <div className="topnav__right__item">
                    <Dropdown />
                </div>
            </div>
        </div>
    );
}

export default TopNav;
