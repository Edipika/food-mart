import Layout from "../components/common/Layout";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";

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