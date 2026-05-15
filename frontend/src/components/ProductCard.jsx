import { Link } from 'react-router-dom';
import { BASE_URL } from "../app/api/apiSlice";
import { saveTocart, } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import AddToCartButton from './AddToCartButton';

function ProductCard({ item }) {// product card elemets that is there in explore categories page


    // const dispatch = useDispatch();
    const id = item.id;

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-3 hover:shadow-lg transition-shadow">
                <Link to={`/productDetails/${id}`}>
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={`${BASE_URL}/${item.image_path}`}
                            alt={item.name}
                            className="transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover w-full h-40"
                        />
                    </div>
                    <h5 className="font-subtitle text-sm sm:text-base font-semibold mt-2 line-clamp-2 h-10">{item.name}</h5>
                    <h4 className="text-xs text-gray-600 line-clamp-1">{item.description}</h4>
                    <h4 className="text-base font-semibold text-gray-800 mt-1">Rs. {item.price}</h4>
                </Link>
                <AddToCartButton product_id={id} />
            </div>

        </>
    );
}

export default ProductCard;