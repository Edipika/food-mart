import Layout from "../common/user/Layout";
import { Link,useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useGetSearchProductsQuery } from "../features/products/productApi";

const SearchPage = () => {
  const { query } = useParams();
  console.log("query",query);
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetSearchProductsQuery(query);
  console.log("productsuseGetSearchProductsQuery",products);
  return (
    <div>
      <Layout>
        {isLoading ? (
          <p>Loading products...</p>
        ) : products && products.products?.length > 0 ? (
          products.products.map((item) => 
        
          <ProductCard key={item.id} item={item} />)
        ) : (
          <p>No products found </p>
        )}
      </Layout>
    </div>
  );
};

export default SearchPage;

