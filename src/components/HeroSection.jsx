import Veggies from '../assets/common/Veggies.png';
import Smothie from '../assets/common/Smothie.png';
import Bakery from '../assets/common/Bakery.png';
import React from 'react';
import { BASE_URL } from '../app/api/apiSlice';

// Reusable Card Component
const Card = ({ title, subtitle, imageUrl,link  }) => {
    return (
        <div className="flex relative rounded-lg overflow-hidden w-full h-full min-w-0">
            <div className="p-5 flex flex-col justify-center space-y-2 z-10">
                <h3 className="text-xl font-semibold">{title}</h3>
                <span className="text-sm text-gray-500">SALE</span>
                <h4 className="text-2xl font-bold">{subtitle}</h4>
                <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 self-start"
               onClick={() => window.open(link, "_self")} // open in same tab
                >
                    Shop Collection → 
                </button>   
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-full hidden sm:block">
                <img
                    className="object-contain w-full h-full max-w-full"
                    src={imageUrl}
                    alt={title}
                />
            </div>
        </div>
    );
};

// Hero Section Component
function HeroSection() {
    return (
        <div className="w-11/12 mx-auto my-9 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 grid-rows-1 lg:grid-rows-2 gap-5 h-auto lg:h-[80vh]">

                {/* Large Promo Section */}
                <div className="lg:row-span-2 lg:col-span-3 bg-blue-100 rounded-lg w-full h-full flex flex-col justify-between overflow-hidden relative min-w-0">
                    <div className="flex w-full h-full min-w-0">
                        <div className="flex flex-col p-6 sm:p-8 lg:p-10 justify-center space-y-4 w-full">
                            <h3 className="text-2xl sm:text-3xl font-semibold text-yellow-500 mb-6">100% Natural</h3>

                            <h4 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 font-nunito">Fresh Smoothie &</h4>
                            <h4 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 font-nunito">Summer Juices</h4>

                            <div className="flex flex-col text-sm text-gray-500 mt-2">
                                <span>Fresh Smoothie & Summer Juices Lorem Ipsum Lorem Ipsum.</span>
                                <span className="mt-2">Fresh Smoothie & Summer Juices</span>
                            </div>

                            <button className="mt-4 text-gray-700 border border-gray-400 py-2 px-4 rounded-md self-start"
                             onClick={() => window.open("http://localhost:5173/explore/6", "_self")}
                            >
                                SHOP NOW
                            </button>
                        </div>

                        {/* Promo Image (hidden on small screens) */}
                        <div className="absolute right-0 bottom-0 w-1/2 h-2/3 hidden sm:block">
                            <img
                                className="object-contain w-full h-full max-w-full"
                                src={Smothie}
                                alt="Juices"
                            />
                        </div>
                    </div>
                </div>

                {/* Smaller Cards */}
                <div className="col-span-1 lg:col-span-2 bg-green-100 rounded-lg w-full h-64 sm:h-72 lg:h-full min-w-0">
                    <Card title="20% Off" subtitle="Fruits & Vegetables" imageUrl={Veggies}   link="http://localhost:5173/explore/3" />
                </div>

                <div className="col-span-1 lg:col-span-2 bg-yellow-100 rounded-lg w-full h-64 sm:h-72 lg:h-full min-w-0">
                    <Card title="15% Off" subtitle="Baked Products" imageUrl={Bakery}   link="http://localhost:5173/explore/4"/>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;

