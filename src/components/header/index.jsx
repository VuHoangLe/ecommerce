import { useContext, useEffect, useRef } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/Logo-2.png';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthenProvider';
import { auth } from '../../firebase/config';

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
    const navigate = useNavigate();

    //get current user's data
    const { hasUser } = useContext(AuthContext);
    const { userDetails } = useContext(AppContext);

    // Active page
    const { pathname } = useLocation();

    const activeNav = mainNav.findIndex((e) => e.path === pathname);

    const menuToggle = () => menuLeft.current.classList.toggle('active');

    // get the number of product in the local storage
    const totalItems = JSON.parse(localStorage.getItem('cartItems'));

    // handle event scroll

    const headerRef = useRef(null);
    const menuLeft = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current?.classList.add('shrink');
            } else {
                headerRef.current?.classList.remove('shrink');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            handleScroll();
        };
    }, []);

    // show use's interaction

    const toggleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        function handleNotification(e) {
            if (toggleRef.current && toggleRef.current.contains(e.target)) {
                contentRef.current.classList.toggle('active');
            } else if (contentRef.current && !contentRef.current.contains(e.target)) {
                contentRef.current.classList.remove('active');
            }
        }
        document.addEventListener('mousedown', handleNotification);
        return () => {
            document.removeEventListener('mousedown', handleNotification);
        };
    }, [toggleRef, contentRef]);

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
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left-close" onClick={menuToggle}>
                            <i className="bx bx-chevron-left"></i>
                        </div>

                        {/* Render nav */}
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
                            <div className="header__menu_item__cart">
                                <Link to="/cart">
                                    <i className="bx bx-cart"></i>
                                </Link>
                                <div className="cart__quantity">
                                    {!hasUser
                                        ? totalItems?.length
                                            ? totalItems?.length
                                            : 0
                                        : userDetails[0]?.products?.length
                                        ? userDetails[0]?.products?.length
                                        : 0}
                                </div>
                            </div>
                        </div>

                        {/*  show user's infomation if guest login */}
                        {!hasUser ? (
                            <div className="header__menu__item header__menu__right__item">
                                <div className="dropdown">
                                    <button className="dropdown__toggle" ref={toggleRef}>
                                        <i className="bx bxs-user"></i>
                                    </button>

                                    <div
                                        className="dropdown__content"
                                        style={{ top: 'calc(100% + 20px)' }}
                                        ref={contentRef}>
                                        <div
                                            className="notification-item"
                                            style={{ padding: '20px' }}
                                            onClick={() => {
                                                navigate('/login');
                                            }}>
                                            <i className="bx bx-log-in"></i>
                                            <span>Log in</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="header__menu__item header__menu__right__item">
                                <div className="dropdown">
                                    <button className="dropdown__toggle" ref={toggleRef}>
                                        <div className="topnav__right__user">
                                            <div className="topnav__right__user__image">
                                                <img
                                                    src={
                                                        userDetails[0]?.photoURL
                                                            ? userDetails[0]?.photoURL
                                                            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="topnav__right__user__name">
                                                {userDetails[0]?.displayName}
                                            </div>
                                        </div>
                                    </button>

                                    {/* user control */}
                                    <div className="dropdown__content" ref={contentRef}>
                                        <div
                                            className="notification-item"
                                            onClick={() => {
                                                navigate(`/profile/${userDetails[0]?.uid}`);
                                            }}>
                                            <i className="bx bxs-user-account"></i>
                                            <span>ProFile</span>
                                        </div>
                                        <div
                                            className="notification-item"
                                            onClick={() => {
                                                auth.signOut();
                                            }}>
                                            <i className="bx bx-log-out"></i>
                                            <span>Log out</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
