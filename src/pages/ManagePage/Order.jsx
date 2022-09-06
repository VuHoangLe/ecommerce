import React, { useContext } from 'react';
import Grid from '../../components/grid';
import Table from '../../components/table';
import Button from '../../components/button';
import { AppContext } from '../../context/AppProvider';

const TABLE_HEADER = ['Name', 'address', 'phone', 'product id - quantity - color - size', 'status', 'Control'];

function Order() {
    const { order } = useContext(AppContext);
    console.log(order.map((item) => item.products.map((elmt) => elmt.id)));
    const renderHead = (item, index) => {
        return <th key={index}>{item}</th>;
    };

    const renderBody = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.customer}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {item.products.map((elmt) => {
                        return (
                            <tr>
                                <td style={{ padding: '0', display: 'flex' }}>
                                    {elmt.id} - {elmt.quantity} - {elmt.color} - {elmt.size}
                                </td>
                            </tr>
                        );
                    })}
                </td>
                <td>{item.status}</td>

                <td
                    style={{
                        gap: '20px',
                        fontSize: '1.75rem',
                        cursor: 'pointer',
                    }}>
                    <td>
                        <i className="bx bxs-edit"></i>
                    </td>
                    <td>
                        <i className="bx bx-x"></i>
                    </td>
                </td>
            </tr>
        );
    };

    return (
        <>
            <h2 className="pageheader">Orders</h2>

            <Grid col={1}>
                <div className="card">
                    <div className="card__body">
                        <Table
                            headData={TABLE_HEADER}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={order}
                            renderBody={(item, index) => renderBody(item, index)}
                        />
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Order;
