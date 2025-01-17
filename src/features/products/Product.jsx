import React from 'react';
import { useState } from 'react';
import Layout from '../../admin/common/Layout';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { useAddProductMutation } from './productApi';

function Product() {
  const [isEditing, setIsEditing] = useState(false);
  const [exisitingProduct, setExisitingProduct] = useState(null);

  const onAddProduct = () => {
    setExisitingProduct(null);
    setIsEditing(true);
  }
  const onEditProduct = (product) => {
    setExisitingProduct(product);
    setIsEditing(true);
  }
  const handleCancelEdit = () => {
    setExisitingProduct(null);
    setIsEditing(false);
  };

  const [addProduct, { isLoading, isError, error, isSuccess }] = useAddProductMutation();
  const handleSaveProduct = async (productData) => {
    try {
      await addProduct(productData).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Layout>
        {isEditing ? (
          <ProductForm
            exisitingProduct={exisitingProduct}
            onSave={handleSaveProduct}
            isError={isError}
            error={error}
            isSuccess={isSuccess}
            onCancel={handleCancelEdit}
          />) : (
          <ProductList
            addProduct={onAddProduct}
            editProduct={onEditProduct}
          />
        )}
      </Layout>
    </>
  )
}

export default Product;