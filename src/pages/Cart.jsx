import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/features/cartSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();

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

  return (
    <section>
      <div className="container-lg overflow-x-auto">
        <h3>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/shop">&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table className="table">
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
                <button className="btn btn-warning text-light">
                  Clear Cart
                </button>
              </div>
              <div>
                <div className="mb-3">
                  <Link to="/shop">&larr; Continue Shopping</Link>
                </div>
                <div className="card shadow p-3">
                  <p>
                    <strong>{`Cart items(s): ${cartTotalQuantity}`}</strong>
                  </p>
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
                  <button className="btn btn-primary">Checkout</button>
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
