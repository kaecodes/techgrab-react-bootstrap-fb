import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../redux/features/authSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Increase quantity in cart
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  // Decrease quantity in cart
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  // Remove item from cart
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  // Clear cart
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  // Calculate total
  useEffect(() => {
    dispatch(CALCULATE_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  // Get the url of current page
  const url = window.location.href;

  // Redirect to login page if user not logged in tries to check out
  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section className="mb-5 pb-5">
      <div className="container-lg overflow-x-auto">
        <h3 className="text-center text-primary py-3">Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <>
            <p className="text-center">Your cart is currently empty.</p>
            <br />
            <div className="text-center">
              <Link to="/shop">&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table className="table table-secondary table-striped">
              <thead>
                <tr>
                  <th className="text-center">Serial No.</th>
                  <th className="text-center">Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={index}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="text-center align-middle">
                        <p>
                          <strong>{name}</strong>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td className="text-center align-middle">{`$${price}`}</td>
                      <td className="text-center align-middle">
                        <div className="d-flex">
                          <button
                            className="btn bg-light px-3 py-1"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p className="px-3 my-auto">
                            <strong>{cartQuantity}</strong>
                          </p>
                          <button
                            className="btn bg-light px-3 py-1"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center align-middle">{`$${(
                        price * cartQuantity
                      ).toFixed(2)}`}</td>
                      <td className="text-center align-middle">
                        <FaTrashAlt
                          size={18}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <div className="w-50">
                <button
                  className="btn btn-warning text-light"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </button>
              </div>
              <div>
                <div className="mb-3">
                  <Link to="/shop">&larr; Continue Shopping</Link>
                </div>
                <div className="card shadow p-3">
                  <h6>{`Cart items(s): ${cartTotalQuantity}`}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Total: </h5>
                    <h3 className="text-warning fw-bold">{`$${cartTotalAmount.toFixed(
                      2
                    )}`}</h3>
                  </div>
                  <p>
                    Taxes and shipping have already been calculated and
                    included.
                  </p>
                  <button className="btn btn-primary" onClick={checkout}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
