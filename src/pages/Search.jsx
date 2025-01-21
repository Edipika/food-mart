import Layout from "../common/user/Layout";
import fruits from '../assets/search_category/fruits-vegtable.webp';
import products from '../assets/products/coconut.webp';
import ProductCard from "../components/ProductCard";
import { Link } from 'react-router-dom';

const SearchPage = () => {
  return (
    <div>
      <Layout>
        <div className="flex w-[85%] m-auto">
          {/* category section */}
          <div className="w-1/6 flex flex-col border-r border-l-white h-screen overflow-y-auto scrollbar-hide">

            {[...Array(15)].map((_, index) => (
              <div key={index} className="flex mb-2 px-3">
                <img className="rounded-full" src={fruits} alt="Fruits" />
                <div className="font-semibold text-lg mt-5 ml-3">All</div>
              </div>
            ))}
          </div>

          {/* item section */}
          <div className="w-full h-screen overflow-y-auto scrollbar-hide ">
            <div className="text-3xl font-semibold m-8">All </div>

            {/* item card */}
            <div className="grid grid-cols-6 gap-y-6 gap-x-2 m-5 p-3">
              <ProductCard/>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SearchPage;