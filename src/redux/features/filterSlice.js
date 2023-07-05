import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Filter Products by Search
    FILTER_BY_SEARCH: (state, action) => {
      const { search, products } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProducts;
    },
    // Sort Products based on Criteria
    SORT_PRODUCTS: (state, action) => {
      const { sort, products } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products;
      }
      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = tempProducts;
    },
    // Filter Products based on Category
    FILTER_BY_CATEGORY: (state, action) => {
      const { category, products } = action.payload;
      let tempProducts = [];
      if (category === "All Categories") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProducts;
    },
    // Filter Products based on Brand
    FILTER_BY_BRAND: (state, action) => {
      const { brand, products } = action.payload;
      let tempProducts = [];
      if (brand === "All Brands") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
