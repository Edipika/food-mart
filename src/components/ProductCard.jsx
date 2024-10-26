import products from '../assets/products/coconut.webp';
import { Link } from 'react-router-dom';

function ProductCard() {

    return (
        <>

            {/* Repeat for your item cards */}
            {[...Array(15)].map((_, index) => (
                <Link to="/productDetails">
                    <div key={index}>
                        <div className="overflow-hidden rounded-xl">
                            <img src={products} alt="Description" className="transition-transform duration-300 ease-in-out transform hover:scale-105" />
                        </div>
                        <h5 className="font-subtitle line-clamp-2 text-lg font-semibold tracking-wide h-8 mt-1">Tender Coconut</h5>
                        <h4 className="font-heading tracking-wide line-clamp-1 !text-sm !font-light !mt-0.5 px-1">1 pc (Approx. 200 - 250 ml)</h4>
                        <div className="my-2 h-7"></div>
                        <h4 className="font-heading text-lg tracking-wide line-clamp-1 !font-semibold !text-md !m-0">50 $</h4>
                        <button className="text-red-600 font-semibold border border-red-600 p-2 w-full rounded-md mt-2">Add to Cart</button>
                    </div>
                </Link>
            ))}

        </>
    );
}

export default ProductCard;