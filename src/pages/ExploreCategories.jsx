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
 console.log("BASE_URL",BASE_URL)
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
        <div>
            <Layout>
                <div className="flex w-[85%] m-auto">
                    {/* side panel to display subcategory */}
                    <div className="w-1/6 flex flex-col border-r border-l-white h-screen overflow-y-auto scrollbar-hide">
                        {categories && categories.length > 0 ? (
                            categories
                                .filter(category => category.parent_id === Number(categoryId))
                                .map((category, index) => (
                                    <div key={index} className="flex mb-2 px-3 cursor-pointer" onClick={() => setSelectedCategory(category.id)} >
                                        <img
                                            className="rounded-full w-12 h-12"
                                            src={`${BASE_URL}${category.image_path}`}
                                            alt={category.name}
                                        />
                                        <div className="font-semibold text-lg mt-5 ml-3">
                                            {category.name}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div>No categories available.</div>
                        )}
                    </div>

                    {/* product display section */}
                    <div className="w-full h-screen overflow-y-auto scrollbar-hide ">
                        <div className="text-3xl font-semibold m-8">sub category </div>
                        {/* item card */}
                        <div className="grid grid-cols-6 gap-y-6 gap-x-2 m-5 p-3">
                            {productsLoading ? (
                                <p>Loading products...</p>
                            ) : products && products?.length > 0 ? (
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
        </div>
    );
};

export default ExploreCategories;