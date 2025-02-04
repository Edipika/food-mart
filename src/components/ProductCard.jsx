import products from '../assets/products/coconut.webp';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../app/api/axios";
import { useState } from 'react';
import { addToCart } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

function ProductCard({ item }) {// product card elemets that is there in explore categories page
    const dispatch = useDispatch();
    const productId=item.id;
    // const [quantity, setQuantity] = useState(0);
    // const increment = () => setQuantity(quantity + 1);
    // const decrement = () => {
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //     } else {
    //         setQuantity(0); // Reset to "Add to Cart"
    //     }
    // };
    return (
        <>
         <div>
            <Link to={`/productDetails/${item.id}`}>
               
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={`${BASE_URL}/${item.image_path}`}
                            alt={item.name}
                            className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    <h5 className="font-subtitle line-clamp-2 text-lg font-semibold tracking-wide h-8 mt-1">
                        {item.name}
                    </h5>
                    <h4 className="font-heading tracking-wide line-clamp-1 !text-sm !font-light !mt-0.5 px-1">
                        {item.description}
                    </h4>
                    <h4 className="font-heading text-lg tracking-wide line-clamp-1 !font-semibold !text-md !m-0">
                        Rs.{item.price}
                    </h4>
            </Link>
            {quantity === 0 ? (
                <button
                    // onClick={() => setQuantity(1)}
                    className="text-red-600 font-semibold border border-red-600 p-2 w-full rounded-md"
                >
                    Add to Cart
                </button>
            ) : (
                <div className="flex items-center border border-red-600 rounded-md">
                    <button
                        // onClick={decrement}
                        className="text-red-600 font-bold px-4 py-2  rounded-l-md"
                    >
                        −
                    </button>
                    <span className="text-red-600 font-semibold px-6">{quantity}</span>
                    <button
                        onClick={ dispatch(addToCart({ productId, quantity: 1 }))}
                        className="text-red-600 font-bold px-4 py-2  rounded-r-md"
                    >
                        +
                    </button>
                </div>
            )}
        </div >
           
        </>
    );
}

export default ProductCard;