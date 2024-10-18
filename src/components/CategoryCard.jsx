import fruits from '../assets/category/category1/AFruits.webp';
import atta from '../assets/category/category1/BAtta-Rice-Dal.webp';
import { Link } from 'react-router-dom';
const images = require.context('../assets/category', false, /\.(webp|png|jpe?g|svg)$/);


function CategoryCard() {
    const imagePaths = images.keys().map((image) => images(image));
    return (
        <>
            <div className="w-4/5 mx-auto m-11">
                <h1 className="text-x font-bold">Explore By Categories</h1>
            </div>
            <div className="w-4/5 mx-auto">
                <div className="grid grid-cols-8 grid-rows-5 place-items-center gap-y-3 gap-x-2">
                    <div className="col-span-2">
                        <Link to="/search">
                            <img src={fruits} alt="Fruits" />
                        </Link>
                    </div>
                    <div className="col-span-2">
                        <img src={atta} alt="" />
                    </div>
                    {imagePaths.map((src, index) => (
                        <div key={index}>
                            <img src={src} alt={`Category ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryCard;




