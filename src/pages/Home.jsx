import React from 'react';
import { Link } from 'react-router-dom';

import Helmet from '../components/Helmet';
import Slider from '../components/slider/Slider';
import { Section, SectionBody, SectionTitle } from '../components/section/Wrap';
import Policy from '../components/policy/Policy';
import ProductCard from '../components/product/ProductCard';
import Grid from '../components/grid/Grid';

import SliderData from '../assets/fake-data/slider';
import PolicyData from '../assets/fake-data/policy';
import productData from '../assets/fake-data/products';
import banner from '../assets/images/banner.png';

function Home() {
    return (
        <Helmet title="Home">
            {/* Slider */}
            <Slider data={SliderData} control auto></Slider>

            {/*Section Policy */}
            <Section>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {PolicyData.map((item, index) => (
                            <Link to="/policy" key={index}>
                                <Policy name={item.name} description={item.description} icon={item.icon} />
                            </Link>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>

            {/* Section best seller product */}
            <Section>
                <SectionTitle>Best seller of the week</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(4).map((item, index) => (
                            <ProductCard
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

            {/* Section new releases product */}
            <Section>
                <SectionTitle>New releases</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(8).map((item, index) => (
                            <ProductCard
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

            {/* Banner */}
            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="" />
                    </Link>
                </SectionBody>
            </Section>

            {/* Section popular product */}
            <Section>
                <SectionTitle>Popular/Recommended Products</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(12).map((item, index) => (
                            <ProductCard
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
}

export default Home;
