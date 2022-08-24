import React from 'react';
import Sidebar from '../../components/manage/sidebar/Sidebar';
import TopNav from '../../components/manage/topnav/TopNav';
import './managelayout.scss';

function ManageLayOut({ children }) {
    return (
        <div className="layout">
            <Sidebar />
            <div className="layout__content">
                <TopNav />
                <div className="layout__content__main">{children}</div>
            </div>
        </div>
    );
}

export default ManageLayOut;
