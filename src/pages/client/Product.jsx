import { useEffect, useState, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { AppContext } from '../../context/AppProvider';

import useFireStore from '../../hooks/useFirestore';

import Helmet from '../../components/Helmet';
import Grid from '../../components/grid';

import { Section, SectionBody, SectionTitle } from '../../features/client/section';
import { ProductCard, ProductView } from '../../features/client/products';

const Product = () => {
    let params = useParams();
    const { randomProducts } = useContext(AppContext);
    const [moreProducts, setMoreProducts] = useState([]);
    useEffect(() => {
        setMoreProducts(randomProducts(8));
    }, [randomProducts]);

    // Get product by slug
    const condition = useMemo(() => {
        return {
            fieldName: 'slug',
            operator: '==',
            compareValue: params.slug,
        };
    }, [params.slug]);
    const productBySlug = useFireStore('products', condition);

    console.log(productBySlug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productBySlug]);

    return (
        <Helmet title={productBySlug[0]?.name}>
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
