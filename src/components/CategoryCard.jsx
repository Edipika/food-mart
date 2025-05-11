import { Link } from 'react-router-dom';
import { useGetCategoryQuery } from '../features/category/categoryApi';
import { BASE_URL } from '../../src/app/api/axios';
import React from 'react';

function CategoryCard() {
    const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
    return (
        <>
            <div className="w-4/5 mx-auto my-11">
                <h1 className="text-xl font-bold">Categories</h1>
            </div>
            <div className="w-4/5 mx-auto">
                <div className="space-y-8">
                    {/* Grocery & Kitchen */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Grocery & Kitchen</h2>
                        <div className="grid grid-cols-8 place-items-center gap-4">
                            {categories && categories.length > 0 ? (
                                categories
                                    .filter(category => category.parent_id === 1)
                                    .map((category, index) => (
                                        <div
                                            key={index}
                                            className={` ${index === 0 ? "col-span-2" : ""}`}
                                        >
                                            <Link to={`/explore/${category.id}`}>
                                                <img
                                                    className="w-full h-auto object-cover rounded-lg"
                                                    src={`${BASE_URL}${category.image_path}`}
                                                    alt={`Category ${index + 1}`}
                                                />
                                            </Link>
                                        </div>
                                    ))
                            ) : (
                                <div>No categories available.</div>
                            )}
                        </div>
                    </div>

                    {/* Snacks & Drinks */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Snacks & Drinks</h2>
                        <div className="grid grid-cols-8 place-items-center gap-4">
                            {categories && categories.length > 0 ? (
                                categories
                                    .filter(category => category.parent_id === 2)
                                    .map((category, index) => (
                                        <div
                                            key={index}
                                        >
                                            <Link to={`/explore/${category.id}`}>
                                                <img
                                                    className="w-full h-auto object-cover rounded-lg"
                                                    src={`${BASE_URL}${category.image_path}`}
                                                    alt={`Category ${index + 1}`}
                                                />
                                            </Link>


                                        </div>
                                    ))
                            ) : (
                                <div>No categories available.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CategoryCard;
