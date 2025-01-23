import fruits from '../assets/category/category1/AFruits.webp';
import atta from '../assets/category/category1/BAtta-Rice-Dal.webp';
import { Link } from 'react-router-dom';
import { useGetCategoryQuery } from '../features/category/categoryApi';
import { BASE_URL } from '../../src/app/api/axios';
// const images = require.context('../assets/category', false, /\.(webp|png|jpe?g|svg)$/);


function CategoryCard() {
    // const imagePaths = images.keys().map((image) => images(image));
    const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
    return (
        <>
            <div className="w-4/5 mx-auto m-11">
                <h1 className="text-x font-bold">Explore By Categories</h1>
            </div>
            <div className="w-4/5 mx-auto">
                <div className="grid grid-cols-8 grid-rows-5 place-items-center gap-y-3 gap-x-2">
                    {/* for wider images */}
                    <div className="col-span-2">
                        <Link to="/search">
                            {/* <img src={fruits} alt="Fruits" /> */}
                        </Link>
                    </div>

                    {categories && categories.length > 0 ? (
                        categories.map((category, index) => (
                            category.parent_id === 1 ? (
                                <div key={index} className="col-span-2">
                                    <img src={`${BASE_URL}${category.image_path}`} alt={`Category ${index + 1}`} />
                                </div>
                            ) : null

                        ))
                    ) : (
                        <div>No categories available.</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CategoryCard;
// function CategoryCard() {
//     const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();

//     return (
//         <>
//             <div className="w-4/5 mx-auto m-11">
//                 <h1 className="text-xl font-bold">Grocery & Kitchen</h1>
//             </div>
//             <div className="w-4/5 mx-auto">
//                 <div className="grid grid-cols-8 grid-rows-5 place-items-center gap-y-3 gap-x-2">
//                     {categories && categories.length > 0 ? (
//                         categories.map((category, index) =>
//                             category.parent_id === 1 ? (
//                                 // For larger images
//                                 <div key={index}  className={index === 0 ? "col-span-2" : ""}>
//                                     <img
//                                         src={`${BASE_URL}${category.image_path}`}
//                                         alt={`Category ${index + 1}`}
//                                     />
//                                 </div>
//                             ) : null
//                         )
//                     ) : (
//                         <div>No categories available.</div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CategoryCard;










