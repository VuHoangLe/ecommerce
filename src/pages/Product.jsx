import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Helmet from '../components/Helmet';
import { Section, SectionBody, SectionTitle } from '../components/section/Wrap';
import Grid from '../components/grid/Grid';
import ProductCard from '../components/product/ProductCard';
import ProductView from '../components/product/ProductView';

import useFireStore from '../hooks/useFirestore';
import { useMemo } from 'react';
import { useContext } from 'react';
import { AppContext } from '../components/context/AppProvider';

const Product = () => {
    let params = useParams();
    const { randomProducts } = useContext(AppContext);
    const [moreProducts, setMoreProducts] = useState([]);
    useEffect(() => {
        setMoreProducts(randomProducts(8));
    }, [randomProducts]);

    const condition = useMemo(() => {
        return {
            fieldName: 'slug',
            operator: '==',
            compareValue: params.slug,
        };
    }, [params.slug]);
    const productBySlug = useFireStore('products', condition);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productBySlug]);

    return (
        <Helmet title={productBySlug.map((item) => item.name)}>
            <Section>
                <SectionBody>
                    <ProductView product={productBySlug[0]} />
                </SectionBody>
            </Section>

            <Section>
                <SectionTitle>Discover more</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {moreProducts.map((item, index) => (
                            <ProductCard
                                item={item}
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.name}
                                slug={item.slug}
                                price={item.price}
                                oldPrice={item.oldPrice}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Product;
