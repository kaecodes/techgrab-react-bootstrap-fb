import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Store products in redux to access anywhere in app
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload.products;
    },
    // Find min and max prices
    GET_PRICE_RANGE: (state, action) => {
      const { products } = action.payload;
      const arr = [];
      products.map((product) => {
        const price = product.price;
        return arr.push(price);
      });
      const max = Math.max(...arr);
      const min = Math.min(...arr);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
