import Layout from "../common/user/Layout";
import { AiOutlineRight } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import { useGetProductQuery } from '../features/products/productApi';
import { BASE_URL } from "../app/api/axios";
import { TbTruckDelivery } from "react-icons/tb";


const ProductDetails = () => {
    const { productId } = useParams();
    const { data: item, isLoading } = useGetProductQuery(productId);
    console.log(item);
    if (isLoading) return <div>Loading...</div>;

    return (
        <Layout>
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <a href="/" className="hover:underline">Home</a>
                    <AiOutlineRight size={12} />
                    <a href="/fresh-fruits" className="hover:underline">Fresh Fruits</a>
                    <AiOutlineRight size={12} />
                    <span>Tender Coconut</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
                {/* Product Image Carousel  */}
                <div className="w-full">
                    <div className="relative">
                        <img
                            className="rounded-lg w-full"
                            src={`${BASE_URL}/${item.productMetaData[0]?.image_path}`}
                            alt="Tender Coconut"
                        />
                        {/* Add your carousel controls here  */}
                    </div>
                </div>

                {/* Product Details  */}
                <div>
                    <h1 className="text-2xl font-bold">{item.product.name}</h1>
                    <p className="text-gray-600 mt-2">1 pc (Approx. 200 - 250 ml)</p>

                    {/* Pricing */}
                    <div className="flex items-center space-x-2 mt-4">
                        <span className="text-3xl font-bold text-gray-900">₹{item.product.price}</span>
                        <span className="text-lg line-through text-gray-400">₹123</span>
                        <span className="text-lg text-purple-600 font-semibold">34% Off</span>
                    </div>

                    {/* Add Button */}
                    <button className="mt-6 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600">Add</button>

                    {/* How it Works Section */}
                    <div className="mt-8">
                        <h2 className="text-lg font-bold mb-4">How it Works</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <img src="/path-to-icon-1.png" alt="App Icon" className="w-8 h-8" />
                                <div>
                                    <h3 className="font-semibold">Open the app</h3>
                                    <p className="text-sm text-gray-600">
                                        Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <img src="/path-to-icon-2.png" alt="Order Icon" className="w-8 h-8" />
                                <div>
                                    <h3 className="font-semibold">Place an order</h3>
                                    <p className="text-sm text-gray-600">
                                        Add your favorite items to the cart & avail the best offers.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                            <TbTruckDelivery />
                                {/* <img src="/path-to-icon-3.png" alt="Delivery Icon" className="w-8 h-8" /> */}
                                <div>
                                    <h3 className="font-semibold">Get free delivery</h3>
                                    <p className="text-sm text-gray-600">
                                        Experience lightning-fast speed & get all your items delivered in 10 minutes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Product Section  */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <h2 className="text-xl font-bold mb-4">About Product</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Description: {item.product.description}.</li>
                    <li>Country of Origin: India</li>
                    <li>Shelf Life: 4 days</li>
                    <li>How to Use: Tender coconut flesh can be used for ice creams.</li>
                </ul>
            </div>




        </Layout>
    );
};

export default ProductDetails;
