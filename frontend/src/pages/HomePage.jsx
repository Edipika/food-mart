import Layout from "../common/user/Layout";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Layout>
                <HeroSection />
                <CategoryCard />
            </Layout>
        </div>
    );
};

export default HomePage;