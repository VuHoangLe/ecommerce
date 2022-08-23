import React from 'react';
import Grid from '../../components/grid/Grid';
import StatusCard from '../../components/manage/statuscard';
import Table from '../../components/manage/table';

const statusCard = [
    {
        icon: 'bx bx-shopping-bag',
        count: '1,995',
        title: 'Total sales',
    },
    {
        icon: 'bx bx-cart',
        count: '2,001',
        title: 'Daily visits',
    },
    {
        icon: 'bx bx-dollar-circle',
        count: '$2,632',
        title: 'Total income',
    },
    {
        icon: 'bx bx-receipt',
        count: '1,711',
        title: 'Total orders',
    },
];

const topCustomers = {
    head: ['user', 'total orders', 'total spending'],
    body: [
        {
            username: 'john doe',
            order: '490',
            price: '$15,870',
        },
        {
            username: 'frank iva',
            order: '250',
            price: '$12,251',
        },
        {
            username: 'anthony baker',
            order: '120',
            price: '$10,840',
        },
    ],
};

const renderCustomerHead = (item, index) => <th key={index}>{item}</th>;
const renderCustomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
);

const latestOrders = {
    head: ['order id', 'user', 'total price', 'date', 'status'],
    body: [
        {
            id: '#OD1711',
            user: 'john doe',
            date: '17 Jun 2021',
            price: '$900',
            status: 'shipping',
        },
        {
            id: '#OD1712',
            user: 'frank iva',
            date: '1 Jun 2021',
            price: '$400',
            status: 'paid',
        },
        {
            id: '#OD1713',
            user: 'anthony baker',
            date: '27 Jun 2021',
            price: '$200',
            status: 'pending',
        },
    ],
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            <span>{item.status}</span>
        </td>
    </tr>
);

function Dashboard() {
    return (
        <>
            <h2 className="pageheader">Dashboard</h2>
            <Grid col={2} mdCol={1} gap={30}>
                {statusCard.map((item, index) => (
                    <StatusCard key={index} icon={item.icon} count={item.count} title={item.title} />
                ))}
            </Grid>
            <Grid col={2} gap={30}>
                <div className="card">
                    <div className="card__header">
                        <h3>Top Customers</h3>
                    </div>
                    <div className="card__body">
                        <Table
                            headData={topCustomers.head}
                            renderHead={(item, index) => renderCustomerHead(item, index)}
                            bodyData={topCustomers.body}
                            renderBody={(item, index) => renderCustomerBody(item, index)}
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="card__header">
                        <h3>Latest orders</h3>
                    </div>
                    <div className="card__body">
                        <Table
                            headData={latestOrders.head}
                            renderHead={(item, index) => renderOrderHead(item, index)}
                            bodyData={latestOrders.body}
                            renderBody={(item, index) => renderOrderBody(item, index)}
                        />
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Dashboard;
