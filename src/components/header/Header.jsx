import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/images/Logo-2.png';

import './header.scss';

const mainNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Catalog',
        path: '/catalog',
    },
    {
        display: 'Accessory',
        path: '/accessories',
    },
    {
        display: 'Contact',
        path: '/contact',
    },
];

function Header() {
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex((e) => e.path === pathname);

    const headerRef = useRef(null);
    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle('active');

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        };
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>

                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className="bx bx-menu"></i>
                    </div>
                    {/* Menu left */}
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left-close" onClick={menuToggle}>
                            <i className="bx bx-chevron-left"></i>
                        </div>

                        {mainNav.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${
                                        index === activeNav ? 'active' : ''
                                    }`}
                                    onClick={menuToggle}>
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Menu right */}
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-search"></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-cart"></i>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bxs-user"></i>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
