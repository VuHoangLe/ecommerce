import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '../../components/grid/Grid';
// import ProductCard from '../../features/client/products/component/ProductCard';
import { ProductCard, ProductView } from '../../features/client/products';

import useFireStore from '../../hooks/useFirestore';
import { AppContext } from '../../context/AppProvider';
import Helmet from '../../components/Helmet';
import { Section, SectionBody, SectionTitle } from '../../features/client/section';

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
