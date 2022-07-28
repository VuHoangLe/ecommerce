import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Helmet from '../components/Helmet';
import { Section, SectionBody, SectionTitle } from '../components/section/Wrap';
import Grid from '../components/grid/Grid';
import ProductCard from '../components/product/ProductCard';
import ProductView from '../components/product/ProductView';

import productData from '../assets/fake-data/products';

const Product = (props) => {
    let params = useParams();
    const product = productData.getProductBySlug(params.slug);
    const relatedProduct = productData.getProducts(8);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product} />
                </SectionBody>
            </Section>

            <Section>
                <SectionTitle>Discover more</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {relatedProduct.map((item, index) => (
                            <ProductCard
                                item={item}
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
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
