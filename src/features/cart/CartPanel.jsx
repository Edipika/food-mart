import React from 'react';
import { IoClose } from "react-icons/io5";
import Sweets from '../../assets/category/Sweets.webp';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { useGetCartProductsMutation } from './cartApi';
import {useFetchListsMutation} from '../../features/cart/listApi';
import {useGetCartProductsMutation} from '../../features/cart/cartApi';

import { useState } from 'react';

function CartPanel({ isOpen, setIsOpen }) {
    const [cartItems, setcartItems] = useState(null);
    const [getCartDetails, { isError, error, isSuccess }] = useGetCartProductsMutation();
    const products = useSelector(state => state.cartSlice?.products || []); // Ensure default value
    const handleSubmit = async (e) => {
        const cart = await getCartDetails(products).unwrap();;
        setcartItems(cart);
    };
    console.log("Response from the result", cartItems);

    if (!isOpen) return null;
    return (

        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-4 transition-transform transform translate-x-0">
            {(isError) && (
                <span className="text-red-500 text-sm">
                    {error?.data?.message || 'An error occurred'}
                </span>
            )}
            <button onClick={handleSubmit}>
                Fetch Cart
            </button>
        </div>
    );
}

export default CartPanel;
