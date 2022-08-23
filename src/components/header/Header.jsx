import { useContext, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/Logo-2.png';
import { auth } from '../../firebase/config';
import { AuthContext } from '../context/AuthenProvider';

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
    const navigate = useNavigate();
    const { hasUser } = useContext(AuthContext);

    const [userAvatar, setUserAvatar] = useState();

    const productQuantity = useSelector((state) => state.totalProduct.value);

    const activeNav = mainNav.findIndex((e) => e.path === pathname);

    const headerRef = useRef(null);
    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle('active');

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

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(userAvatar);
        };
    }, [userAvatar]);

    const updateAvatar = (e) => {
        setUserAvatar(URL.createObjectURL(e.target.files[0]));
    };

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
                            <div className="header__menu_item__cart">
                                <Link to="/cart">
                                    <i className="bx bx-cart"></i>
                                </Link>
                                <div className="cart__quantity">{productQuantity}</div>
                            </div>
                        </div>

                        {!hasUser ? (
                            <div className="header__menu__item header__menu__right__item">
                                <Link to="/login">
                                    <i className="bx bxs-user"></i>
                                </Link>
                            </div>
                        ) : (
                            <div className="header__menu__item header__menu__right__item">
                                <label htmlFor="updateAvatar">
                                    <img
                                        className="user__avatar"
                                        src={
                                            hasUser.photoURL
                                                ? hasUser.photoURL
                                                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                                        }
                                        alt=""
                                    />
                                </label>
                                <input
                                    type="file"
                                    name="updateAvatar"
                                    id="updateAvatar"
                                    onChange={updateAvatar}
                                    style={{ display: 'none' }}
                                />
                                <div
                                    className="user__name"
                                    onClick={() => {
                                        navigate('/login');
                                        auth.signOut();
                                    }}>
                                    {hasUser.displayName}
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
