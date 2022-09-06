import React, { useContext } from 'react';
import Grid from '../../components/grid';
import Table from '../../components/table';
import Button from '../../components/button';
import { AppContext } from '../../context/AppProvider';

const TABLE_HEADER = ['User id', 'Name', 'address', 'phone', 'Control'];

function Customers() {
    const { order } = useContext(AppContext);
    console.log(order);
    const renderHead = (item, index) => {
        return <th key={index}>{item}</th>;
    };

    const renderBody = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.customerId}</td>
                <td>{item.customer}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td
                    style={{
                        display: 'flex',
                        gap: '20px',
                        fontSize: '1.75rem',
                        cursor: 'pointer',
                    }}>
                    <i className="bx bx-x"></i>
                    <i class="bx bx-block"></i>
                </td>
            </tr>
        );
    };

    return (
        <>
            <h2 className="pageheader">Customers</h2>
            <div style={{ marginBottom: '30px' }}>
                <Button>Add user</Button>
            </div>
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

export default Customers;
