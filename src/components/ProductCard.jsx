import products from '../assets/products/coconut.webp';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../app/api/axios";

function ProductCard({ item }) {// product card elemets that is there in explore categories page
    return (
        <>
            <Link to={`/productDetails/${item.product.id}`}>
                <div>
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={`${BASE_URL}/${item.metaData.image_path}`}
                            alt={item.product.name}
                            className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    <h5 className="font-subtitle line-clamp-2 text-lg font-semibold tracking-wide h-8 mt-1">
                        {item.product.name}
                    </h5>
                    <h4 className="font-heading tracking-wide line-clamp-1 !text-sm !font-light !mt-0.5 px-1">
                        {item.product.description}
                    </h4>
                    <h4 className="font-heading text-lg tracking-wide line-clamp-1 !font-semibold !text-md !m-0">
                        Rs.{item.product.price}
                    </h4>
                    <button className="text-red-600 font-semibold border border-red-600 p-2 w-full rounded-md mt-2">
                        Add to Cart
                    </button>
                </div>
            </Link>

        </>
    );
}

export default ProductCard;