import React from 'react';
import { useState } from 'react';
import Layout from '../../admin/common/Layout';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { useAddProductMutation } from './productApi';

const Product = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [existingProduct, setExistingProduct] = useState(null);

  const onAddProduct = () => {
    setExistingProduct(null); 
    setIsSuccess(false); 
    setSuccessMessage(""); 
    setIsEditing(true); 
  };

  const onEditProduct = (product) => {
    setExistingProduct(product); 
    setIsSuccess(false); 
    setSuccessMessage(""); 
    setIsEditing(true); 
    // console.log(existingProduct);
  };


  const [addProduct, { isLoading, isError, error, }] = useAddProductMutation();
  const handleSaveProduct = async (productData) => {
    try {
      await addProduct(productData).unwrap();
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const onSuccess = () => {
    setIsEditing(false); 
    setIsSuccess(true); 
    setSuccessMessage("Product saved successfully!");
  };

  const handleCancelEdit = () => {
    setIsEditing(false); 
    setExistingProduct(null); 
  };

  const successCancel = () => {
    setIsSuccess(false); 
    setSuccessMessage("");
  };

  return (
    <div>
      <Layout> 
      {isEditing ? (
        <ProductForm
          existingProduct={existingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancelEdit}
          isError={isError}
          error={error}
          onSuccess={onSuccess}
        />
      ) : (
        <>
          {isSuccess && (
            <div className="bg-green-700 text-white p-2 rounded mb-4">
              {successMessage}
              <button className="ml-4" onClick={successCancel}>
                X
              </button>
            </div>
          )}
          <ProductList
            addProduct={onAddProduct}
            editProduct={onEditProduct}
            isEditing={isEditing}
          />
        </>
      )} 
         </Layout>
    </div>
  );
};

export default Product;
