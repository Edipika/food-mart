import Layout from "../common/user/Layout";
import ProductCard from "../components/ProductCard";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useGetCategoryQuery } from '../features/category/categoryApi';
import { useGetProductsByCategoryQuery } from '../features/products/productApi';
import { BASE_URL } from "../app/api/apiSlice";

const ExploreCategories = () => {
    const { categoryId } = useParams();
    const [selectedCategory, setSelectedCategory] = useState()
    const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
    const { data: products, isLoading: productsLoading } = useGetProductsByCategoryQuery(selectedCategory);

    useEffect(() => {
        if (categories && categories.length > 0) {
            const filteredCategories = categories.filter(category => category.parent_id === Number(categoryId));
            if (filteredCategories.length > 0) {
                setSelectedCategory(filteredCategories[0].id);
            }
        }
    }, [categories, categoryId]);


    if (productsLoading) return <p>Loading...</p>;
    // console.log("products fetched", products);
    return (
        <Layout>
            <div className="flex flex-col lg:flex-row w-[90%] mx-auto">

                {/* Sidebar for Subcategories */}
                <div className="lg:w-1/5 w-full flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto border-r lg:border-l-white gap-4 lg:gap-0 py-4 lg:h-screen">
                    {categories?.filter(category => category.parent_id === Number(categoryId))?.map((category, index) => (
                        <div key={index} className="flex items-center lg:mb-2 px-3 cursor-pointer min-w-fit lg:min-w-0" onClick={() => setSelectedCategory(category.id)}>
                            <img
                                className="rounded-full w-12 h-12"
                                src={`${BASE_URL}${category.image_path}`}
                                alt={category.name}
                            />
                            <div className="font-semibold text-base lg:text-lg ml-3">{category.name}</div>
                        </div>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="w-full lg:w-4/5 py-4">
                    <h2 className="text-2xl font-semibold mb-6 px-4">Subcategory</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 px-4">
                        {productsLoading ? (
                            <p>Loading products...</p>
                        ) : products?.length > 0 ? (
                            products.map((item) => (
                                <ProductCard key={item.id} item={item} />
                            ))
                        ) : (
                            <p>No products found for this subcategory.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default ExploreCategories;