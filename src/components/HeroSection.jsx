import Veggies from '../assets/common/Veggies.png';
import Smothie from '../assets/common/Smothie.png';
import Bakery from '../assets/common/Bakery.png';

const Card = ({ title, subtitle, imageUrl }) => {
    return (
        <div className="flex relative rounded-lg overflow-hidden w-full h-full">
            <div className="p-5 flex flex-col justify-center space-y-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <span className="text-sm text-gray-500">SALE</span>
                <h4 className="text-2xl font-bold">{subtitle}</h4>
                <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 self-start">
                    Shop Collection →
                </button>
            </div>
            <div className="absolute bottom-0 right-0">
                <img
                    className="w-full h-full"
                    src={imageUrl}
                    alt={title}
                />
            </div>
        </div>
    );
};

function HeroSection() {
    return (
        <>
            <div className="grid grid-cols-5 grid-rows-2  w-4/5 h-[80vh] mx-auto my-9 gap-5 place-items-center ">
                <div className="row-span-2 col-span-3 bg-blue-100 rounded-lg h-full w-full">

                    <div className="flex relative rounded-lg w-full h-full">
                        <div className="flex flex-col p-10  justify-center space-y-4">
                            <h3 className="text-3xl font-semibold text-yellow-500 mb-20">100% Natural</h3>

                            <h4 className="text-5xl font-bold text-gray-800 mt-0 font-nunito">Fresh Smoothie & </h4>
                            <h4 className="text-5xl font-bold text-gray-800 mt-0 font-nunito">Summer Juices</h4>

                            <div className="flex flex-col m-0 p-0">
                                <span className="text-sm text-gray-500 m-0 p-0">Fresh Smoothie & Summer Juices Lorem Ipsum Lorem Ipsum.</span>
                                <span className="text-sm text-gray-500 mt-2 p-0">Fresh Smoothie & Summer Juices</span>
                            </div>

                            <button className="mt-4 text-gray-700 border border-gray-400 py-2 px-4 rounded-md self-start">
                                SHOP NOW
                            </button>
                        </div>

                        <div className="absolute right-0 bottom-0 flex-shrink-0 w-1/2 h-auto ">
                            <img
                                 className="object-contain w-full h-full"
                                src={Smothie}
                                alt="Juices"
                            />
                        </div>
                    </div>

                </div>
                <div className="col-span-2 bg-green-100 rounded-lg h-full w-full">
                    <Card title="20% Off" subtitle="Fruits & Vegetables" imageUrl={Veggies} />
                </div>
                <div className="col-span-2 bg-yellow-100 rounded-lg h-full w-full ">
                    <Card title="15% Off" subtitle="Baked Products" imageUrl={Bakery} />
                </div>
            </div>
        </>
    );
}

export default HeroSection;

