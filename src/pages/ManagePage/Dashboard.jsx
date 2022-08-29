import { useState, useContext, useEffect } from 'react';

import { AppContext } from '../../context/AppProvider';

import Grid from '../../components/grid';
import Table from '../../components/table';

import StatusCard from '../../features/manage/statuscard/components';

const topCustomers = {
    head: ['user id', 'user', 'total spending'],
};

const renderCustomerHead = (item, index) => <th key={index}>{item}</th>;
const renderCustomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.customerId}</td>
        <td>{item.customerName}</td>
        <td>{item.totalSpending}</td>
    </tr>
);

const latestOrders = {
    head: ['order id', 'user', 'total price', 'date', 'status'],
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.docId}</td>
        <td>{item.customer}</td>
        <td>{item.products.reduce((total, item) => total + item.quantity * item.price, 0)}</td>
        <td>{item.createAt.toDate().toDateString()}</td>
        <td>
            <span>{item.status}</span>
        </td>
    </tr>
);

function Dashboard() {
    const { turnOver, order, listUsers, vouchers } = useContext(AppContext);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        setTotalIncome(
            turnOver.reduce((total, curr) => {
                return total + curr.totalSpending;
            }, 0)
        );
    }, [turnOver]);

    return (
        <>
            <h2 className="pageheader">Dashboard</h2>
            <Grid col={2} mdCol={1} gap={30}>
                <StatusCard icon="bx bx-dollar-circle" count={totalIncome} title="Total Income" />
                <StatusCard icon="bx bxl-shopify" count={order.length} title="Total Sale" />
                <StatusCard icon="bx bxs-discount" count={vouchers.length} title="Total vocher" />
                <StatusCard icon="bx bx-user" count={listUsers.length} title="Total Customer" />
            </Grid>
            <Grid col={1} gap={30}>
                <div className="card">
                    <div className="card__header">
                        <h3>Top Customers</h3>
                    </div>
                    <div className="card__body">
                        <Table
                            headData={topCustomers.head}
                            renderHead={(item, index) => renderCustomerHead(item, index)}
                            bodyData={turnOver}
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
                            bodyData={order}
                            renderBody={(item, index) => renderOrderBody(item, index)}
                        />
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Dashboard;
