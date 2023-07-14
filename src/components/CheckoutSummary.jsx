import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/features/cartSlice";
import { Link } from "react-router-dom";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div>
      <h3 className="fw-normal text-center">Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>There are no items in your cart.</p>
            <button>
              <Link to="/shop">&larr; Back to Shop</Link>
            </button>
          </>
        ) : (
          <div className="mb-2">
            <p>{`Cart item(s): ${cartTotalQuantity}`}</p>
            <div className="d-flex justify-content-between pb-3">
              <h4 className="mb-0">Total:</h4>
              <h3 className="text-warning mb-0">{`$${cartTotalAmount.toFixed(
                2
              )}`}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <div key={id} className="card border border-success mb-2 p-2">
                  <h5>Product: {name}</h5>
                  <p className="mb-0">Quantity: {cartQuantity}</p>
                  <p className="mb-0">{`Unit Price: $${price}`}</p>
                  <p className="mb-0">{`Total Price: $${
                    price * cartQuantity
                  }`}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
