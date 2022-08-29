import React from 'react';

import { Link } from 'react-router-dom';

import './footer.scss';
import Grid from '../grid';

import logo from '../../assets/images/Logo-2.png';

const footerLinks = [
    {
        display: 'About',
        path: '/about',
    },
    {
        display: 'Contact',
        path: '/about',
    },
    {
        display: 'Career',
        path: '/about',
    },
    {
        display: 'News',
        path: '/about',
    },
    {
        display: 'Shop systems',
        path: '/about',
    },
];

const footerCustomerLinks = [
    {
        display: 'Replacement policy',
        path: '/about',
    },
    {
        display: 'Warranty policy',
        path: '/about',
    },
    {
        display: 'Rebill policy',
        path: '/about',
    },
];

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <Grid col={4} mdCol={2} smCol={1} gap={10}>
                    <div>
                        <h1 className="footer__title">Assistant</h1>
                        <div className="footer__content">
                            <p>
                                Contact to order: <strong>079 403 6849</strong>
                            </p>
                            <p>
                                Order problems: <strong>079 403 6849</strong>
                            </p>
                            <p>
                                Feedback & complain: <strong>079 403 6849</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h1 className="footer__title">Get to Know Us</h1>
                        <div className="footer__content">
                            {footerLinks.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h1 className="footer__title">Make Money</h1>
                        <div className="footer__content">
                            {footerCustomerLinks.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>

                        <p>
                            When you have a gift and then you work hard, you’re really going to leverage that gift. When
                            you do that well, it will lead to your success
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    );
}

export default Footer;
