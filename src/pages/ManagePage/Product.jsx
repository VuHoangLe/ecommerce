import { useNavigate } from 'react-router-dom';

import Grid from '../../components/grid';
import Button from '../../components/button';

import { deleteDocument } from '../../firebase/services';
import Table from '../../components/table';
import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

const PRODUCT_TABLE_HEADER = ['Id', 'name', 'Old price', 'New price', 'Control'];

function Product() {
    const navigate = useNavigate();

    const renderHead = (item, index) => {
        return <th key={index}>{item}</th>;
    };
    const renderBody = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.oldPrice}</td>
                <td>{item.price}</td>
                <td
                    style={{
                        display: 'flex',
                        gap: '20px',
                        fontSize: '1.75rem',
                        cursor: 'pointer',
                    }}>
                    <i className="bx bxs-edit" onClick={() => navigate(`/manage/product/${item.id}`)}></i>
                    <i className="bx bx-x" onClick={() => deleteDocument('products', item.docId)}></i>
                </td>
            </tr>
        );
    };
    const { listProducts } = useContext(AppContext);

    return (
        <>
            <h2 className="pageheader">Products</h2>
            <div style={{ marginBottom: '30px' }}>
                <Button onClick={() => navigate(`/manage/product/create`)}>Add products</Button>
            </div>
            <Grid col={1}>
                <div className="card">
                    <div className="card__body">
                        <Table
                            headData={PRODUCT_TABLE_HEADER}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={listProducts}
                            renderBody={(item, index) => renderBody(item, index)}
                            limit={10}
                        />
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Product;
