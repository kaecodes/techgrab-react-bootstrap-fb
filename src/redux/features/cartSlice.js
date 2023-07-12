import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  // Get cart items from local storage or cart items will be an empty array
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0, // total number of items in cart
  cartTotalAmount: 0, // total cost of cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      // Find if the product exists in cartItems
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        // Item already exist in cart so increase quantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increased by one.`, {
          position: "top-left",
        });
      } else {
        // Item does not exist in cart so add to cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.info(`${action.payload.name} added to cart successfully!`, {
          position: "top-left",
        });
      }
      // Save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART: (state, action) => {
      // Find if the product exists in cartItems
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        // If product exists and quantity is greater than 1, then decrease quantity
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} decreased by one.`);
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        // If quanitty is one, remove item and create new array to show updated cart
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        // Set new state of cartItems to newCartItem
        state.cartItems = newCartItem;
        toast.info(`${action.payload.name} removed from cart!`, {
          position: "top-left",
        });
      }
      // Save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, action) => {
      // Create new cart from items not equal to selected item
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItem;
      toast.info(`${action.payload.name} removed from cart!`, {
        position: "top-left",
      });

      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state, action) => {
      state.cartItems = [];
      toast.info(`All products removed from cart!`, {
        position: "top-left",
      });

      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_TOTAL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
