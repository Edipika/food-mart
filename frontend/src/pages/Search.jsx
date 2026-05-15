import Layout from "../common/user/Layout";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useGetSearchProductsQuery } from "../features/products/productApi";

const SearchPage = () => {
  const { query } = useParams();
  const {
    data: products,
    isLoading,
  } = useGetSearchProductsQuery(query);

  return (
    <Layout>
      <div className="w-[90%] mx-auto py-6">
        <h2 className="text-2xl font-semibold mb-6">Search Results for: <span className="text-green-600">{query}</span></h2>

        {isLoading ? (
          <p>Loading products...</p>
        ) : products && products.products?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">No products found</p>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
