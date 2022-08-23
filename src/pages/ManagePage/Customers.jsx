import React from 'react';
import Grid from '../../components/grid/Grid';
import Table from '../../components/manage/table';
function Customers() {
    return (
        <>
            <h2 className="pageheader">Customers</h2>
            <Grid col={1}>
                <div className="card">
                    <div className="card__body">
                        <Table />
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Customers;
