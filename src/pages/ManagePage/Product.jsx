import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '../../components/grid/Grid';
import { deleteDocument, getDocuments } from '../../firebase/services';

const PRODUCT_TABLE_HEADER = ['Id', 'name', 'Old price', 'New price', 'Control'];

function Product() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getDocuments('products').then((data) => {
            setProducts(data);
        });
    },[products]);

    return (
        <>
            <h2 className="pageheader">Products</h2>
            <Grid col={1}>
                <div className="card">
                    <div className="card__body">
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        {PRODUCT_TABLE_HEADER.map((item, index) => {
                                            return <th key={index}>{item}</th>;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.oldPrice}</td>
                                                <td>{item.price}</td>
                                                <td style={{display: 'flex', gap: '20px', fontSize: '1.75rem', cursor: 'pointer'}}>
                                                    <i
                                                        className="bx bxs-edit"
                                                        onClick={() => navigate(`/manage/product/${item.id}`)}></i>
                                                         <i className='bx bx-x' onClick={() => deleteDocument('products',item.docId)}></i>
                                                </td>

                                               
                                                
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Product;
