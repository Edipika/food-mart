import { saveTocart } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function AddToCartButton({ product_id }) {
  const dispatch = useDispatch();
  const productId = product_id;

  const quantity = useSelector((state) => {
    return (
      state.cartSlice?.products?.find(
        (product) => product.productId === productId
      )?.quantity || 0
    );
  });
  const increment = () => {
    dispatch(saveTocart({ productId, quantity: quantity + 1 }));
  };
  const decrement = () => {
    dispatch(saveTocart({ productId, quantity: quantity - 1 }));
  };

  return (
    <>
      {quantity <= 0 ? (
        <button
          onClick={increment}
          className="text-red-600 font-semibold border border-red-600 p-2 w-full rounded-md"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center border border-red-600 rounded-md">
          <button
            onClick={decrement}
            className="text-red-600 font-bold px-4 py-2  rounded-l-md"
          >
            −
          </button>
          <span className="text-red-600 font-semibold px-6">{quantity}</span>
          <button
            onClick={increment}
            className="text-red-600 font-bold px-4 py-2  rounded-r-md"
          >
            +
          </button>
        </div>
      )}
    </>
  );
}

export default AddToCartButton;
