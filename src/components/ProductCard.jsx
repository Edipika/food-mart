import { Link } from 'react-router-dom';
import { BASE_URL } from "../app/api/apiSlice"; 
import { saveTocart, } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux'; 
import AddToCartButton from './AddToCartButton';

function ProductCard({ item }) {// product card elemets that is there in explore categories page
    console.log("item:", item)
    
    // const dispatch = useDispatch();
    const id = item.id;

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
                <AddToCartButton product_id={id}/>
            </div >

        </>
    );
}

export default ProductCard;