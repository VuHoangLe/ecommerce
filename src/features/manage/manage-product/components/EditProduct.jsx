import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useFireStore from '../../../../hooks/useFirestore';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import { updateField } from '../../../../firebase/services';

import Grid from '../../../../components/grid';
import { Box } from '@mui/system';

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
        required: true,
    },
    {
        name: 'colors',
        type: 'text',
        required: true,
    },
];
function EditProduct() {
    const productId = useParams().id;
    const navigate = useNavigate();

    const [detailProduct, setDetailProduct] = useState({
        colors: [],
        description: '',
        name: '',
        oldPrice: '',
        price: '',
        size: [],
        total: '',
    });

    // get product need to update
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
            let sizes = Array.isArray(detailProduct.size) ? detailProduct.size : detailProduct.size.split(',');
            let colors = Array.isArray(detailProduct.colors) ? detailProduct.colors : detailProduct.colors.split(',');
            updateField('products', detailProduct.docId, { ...detailProduct, size: sizes, colors: colors });
            alert('Update successfully');
        } else {
            alert('Invalid data');
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
                                <span>Can't empty</span>
                            </div>
                        </div>
                    );
                })}

                <Box
                    sx={{
                        display: 'flex',
                        width: '70%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Button variant="contained" onClick={() => navigate(-1)}>
                        Back
                    </Button>

                    <Button variant="contained" type="submit" onClick={(e) => onSubmit(e)}>
                        Save
                    </Button>
                </Box>
            </form>

            <div className="product__image">
                <img style={{ height: '300px', width: '300px' }} src={detailProduct?.image01} alt="" />
            </div>
        </Grid>
    );
}

export default EditProduct;
