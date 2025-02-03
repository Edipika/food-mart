import React from 'react';
import { IoClose } from "react-icons/io5";
import Sweets  from '../../assets/category/Sweets.webp'

function CartPanel({ isOpen, setIsOpen }) {
    if (!isOpen) return null;

    // Static cart items
    const cartItems = [
        { id: 1, name: "Capsicum Green", price: 90, quantity: 5, originalPrice: 375, weight: "500 g", image: Sweets },
        { id: 2, name: "Cabbage", price: 20, quantity: 2, originalPrice: 92, weight: "1 pc (Approx. 450g - 650g)", image: Sweets },
        { id: 3, name: "Carrot Red Halwa", price: 69, quantity: 1, originalPrice: 90, weight: "1 kg", image: Sweets },
        { id: 4, name: "Mushroom Button", price: 69, quantity: 1, originalPrice: 90, weight: "200 g", image: Sweets }
    ];

    const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-4 transition-transform transform translate-x-0">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <IoClose className="cursor-pointer" size={24} onClick={() => setIsOpen(false)} />
            </div>
            <div className="mt-4">
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between border-b py-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                                <div className="flex-1 ml-4">
                                    <h3 className="font-medium text-sm">{item.name}</h3>
                                    <p className="text-gray-500 text-xs">{item.weight}</p>
                                    <div className="flex items-center mt-2">
                                        <button className="px-2 py-1 text-sm bg-gray-200 rounded">-</button>
                                        <span className="px-3 text-sm">{item.quantity}</span>
                                        <button className="px-2 py-1 text-sm bg-gray-200 rounded">+</button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-sm">₹{item.price * item.quantity}</p>
                                    <p className="text-xs line-through text-gray-400">₹{item.originalPrice}</p>
                                </div>
                            </div>
                        ))}
                        <div className="font-semibold mt-4 text-right text-lg">
                            Total: ₹{totalSum.toFixed(2)}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600">Your cart is currently empty.</p>
                )}
            </div>
        </div>
    );
}

export default CartPanel;
