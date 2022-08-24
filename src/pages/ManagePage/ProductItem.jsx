import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '../../components/grid/Grid';
import useFireStore from '../../hooks/useFirestore';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { updateField } from '../../firebase/services';
import { red } from '@mui/material/colors';
import { display } from '@mui/system';

const INPUTS = [
    {
        name: 'name',
        type: 'text',
        required: true,
    },

    {
        name: 'oldPrice',
        type: 'text',
        pattern: '^[0-9]+$',
        required: true,
    },
    {
        name: 'price',
        type: 'text',
        pattern: '^[0-9]+$',
        required: true,
    },
    {
        name: 'total',
        type: 'text',
        pattern: '^[0-9]*$',
        required: true,
    },
    {
        name: 'description',
        type: 'text',
        required: true,
    },

    {
        name: 'size',
        type: 'text',
    },
    {
        name: 'colors',
        type: 'text',
    },
];
function ProductItem() {
    const productId = useParams().id;
    const [detailProduct, setDetailProduct] = useState({
        categoryId: '',
        colors: [],
        description: '',
        image01: '',
        image02: '',
        name: '',
        oldPrice: '',
        price: '',
        size: [],
        total: '',
    });

    const condition = useMemo(() => {
        return {
            fieldName: 'id',
            operator: '==',
            compareValue: productId,
        };
    }, [productId]);

    const productByid = useFireStore('products', condition);
    useEffect(() => {
        setDetailProduct(productByid[0]);
    }, [productByid]);

    const handleInputChange = (e) => {
        setDetailProduct((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        INPUTS.forEach((elmt) => {
            if (!elmt.pattern || isValid === false) {
                return;
            } else {
                let regex = new RegExp(elmt.pattern);
                if (!regex.test(detailProduct[elmt.name])) {
                    isValid = false;
                }
            }
        });
        if (isValid) {
            console.log('ok');
            let sizes = Array.isArray(detailProduct.size) ? detailProduct.size : detailProduct.size.split(',');
            let colors = Array.isArray(detailProduct.colors) ? detailProduct.colors : detailProduct.colors.split(',');
            updateField('products', detailProduct.docId, { ...detailProduct, size: sizes, colors: colors });
        } else {
            console.log('not ok');
        }
    };
    return (
        <Grid col={2} gap={20}>
            <form className="edit__form" action="" autoComplete="off">
                <Typography variant="h3" className="edit__form__title">
                    Edit product
                </Typography>
                {INPUTS.map((item, index) => {
                    return (
                        <div className="form__wrapper" key={index}>
                            <label htmlFor="">{item.name.toUpperCase()}</label>
                            <div className="input__wrapper">
                                <input
                                    name={item.name}
                                    type={item.type}
                                    value={(detailProduct && detailProduct[item.name]) || ''}
                                    onChange={(e) => handleInputChange(e)}
                                    pattern={item.pattern}
                                    required={item.required}
                                />
                                <span>ERROR</span>
                            </div>
                        </div>
                    );
                })}

                <Button fullWidth variant="contained" type="submit" onClick={(e) => onSubmit(e)}>
                    Save
                </Button>
            </form>

            <div className="product__image">
                <img style={{ height: '300px', width: '300px' }} src={detailProduct?.image01} alt="" />
            </div>
        </Grid>
    );
}

export default ProductItem;
