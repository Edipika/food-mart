import products from '../assets/products/coconut.webp';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../app/api/axios";

function ProductCard({ product }) {
    console.log(product);
    return (
        <>

            {/* Repeat for your item cards */}

            {/* <Link to="/productDetails">
                <div >
                    <div className="overflow-hidden rounded-xl">
                        <img src={products} alt="Description" className="transition-transform duration-300 ease-in-out transform hover:scale-105" />
                    </div>
                    <h5 className="font-subtitle line-clamp-2 text-lg font-semibold tracking-wide h-8 mt-1">Tender Coconut</h5>
                    <h4 className="font-heading tracking-wide line-clamp-1 !text-sm !font-light !mt-0.5 px-1">1 pc (Approx. 200 - 250 ml)</h4>
                    <div className="my-2 h-7"></div>
                    <h4 className="font-heading text-lg tracking-wide line-clamp-1 !font-semibold !text-md !m-0">50 $</h4>
                    <button className="text-red-600 font-semibold border border-red-600 p-2 w-full rounded-md mt-2">Add to Cart</button>
                </div>
            </Link> */}
            {/* <Link to={`/productDetails/${product.id}`}>
                <div>
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={`${BASE_URL}${product.image_path}`}
                            alt={product.name}
                            className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    <h5 className="font-subtitle line-clamp-2 text-lg font-semibold tracking-wide h-8 mt-1">
                        {product.name}
                    </h5>
                    <h4 className="font-heading tracking-wide line-clamp-1 !text-sm !font-light !mt-0.5 px-1">
                        {product.description}
                    </h4>
                    <h4 className="font-heading text-lg tracking-wide line-clamp-1 !font-semibold !text-md !m-0">
                        {product.price} $
                    </h4>
                    <button className="text-red-600 font-semibold border border-red-600 p-2 w-full rounded-md mt-2">
                        Add to Cart
                    </button>
                </div>
            </Link> */}
            <div>hello</div>


        </>
    );
}

export default ProductCard;