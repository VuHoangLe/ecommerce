import React from 'react';
import { Sidebar } from '../../features/manage/sidebar';
import TopNav from '../../features/manage/topnav/components';
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
