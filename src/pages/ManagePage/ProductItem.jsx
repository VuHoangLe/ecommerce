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

const INPUTS = [
    {
        name: 'name',
        type: 'text',
    },

    {
        name: 'oldPrice',
        type: 'text',
    },
    {
        name: 'price',
        type: 'text',
    },
    {
        name: 'total',
        type: 'text',
    },
    {
        name: 'description',
        type: 'text',
    },

    // {
    //     name: 'size',
    //     type: 'text',
    // },
    // {
    //     name: 'image01',
    //     type: 'file'
    // }
    // ,{
    //     name: 'image02',
    //     type: 'file'
    // }
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

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        oldPrice: yup.number().typeError('Must be a number').required('Old price is required'),
        price: yup.number().typeError('Must be a number').required('Price is required'),
        description: yup.string().required('Description is required'),
        total: yup.number().typeError('Must be a number').required('Total is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        updateField('products', detailProduct.docId, data);
    };
    return (
        <Grid col={2}>
            <form className="edit__form" action="" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Typography variant="h3" className="edit__form__title">
                    Edit product
                </Typography>
                {INPUTS.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                margin: '30px 0',
                            }}>
                            <TextField
                                fullWidth
                                {...register(`${item.name}`)}
                                type={item.type}
                                value={(detailProduct && detailProduct[item.name]) || ''}
                                onChange={(e) => handleInputChange(e)}
                                label={item.name}
                            />
                            <span className="authen__error">{errors[item.name]?.message}</span>
                        </Box>
                    );
                })}
                {/* <TextField fullWidth {...register('image01')} type="file" accept="true" />
                <TextField fullWidth {...register('image02')} type="file" accept="true" /> */}

                <Button fullWidth variant="contained" type="submit">
                    Save
                </Button>
            </form>
        </Grid>
    );
}

export default ProductItem;
