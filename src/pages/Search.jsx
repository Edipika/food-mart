import Layout from "../components/common/Layout";
import fruits from '../assets/search_category/fruits-vegtable.webp';
import products from '../assets/products/coconut.webp';

const SearchPage = () => {
  return (
    <div>
      <Layout>
        <div className="flex w-[85%] m-auto">
          {/* category section */}
          <div className="w-1/6 flex flex-col border-r border-l-white">

            {[...Array(15)].map((_, index) => (
              <div key={index} className="flex mb-2 px-3">
                <img className="rounded-full" src={fruits} alt="Fruits" />
                <div className="font-semibold text-lg mt-5 ml-3">All</div>
              </div>
            ))}
          </div>

          {/* item section */}
          <div className="w-full h-screen overflow-y-auto ">
            <div className="text-3xl font-semibold m-8">All </div>
            {/* item card */}
            <div className="grid grid-cols-6 gap-y-6 gap-x-2 m-5 p-3">

              {/* Repeat for your item cards */}
              {[...Array(15)].map((_, index) => (
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
              ))}

            </div>


          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SearchPage;