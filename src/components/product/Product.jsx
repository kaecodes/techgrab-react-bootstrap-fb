import React, { useEffect } from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  // Get data from products collection in database
  const { data, isLoading } = useFetchCollection("products");
  // Get products from redux store
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  // Get products collection from database using data from custom hook
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  return (
    <section className="container d-flex gap-4 flex-column flex-md-row">
      <aside className="w-100 w-md-25">
        <ProductFilter />
      </aside>
      <div className="w-100 w-md-75">
        <ProductList products={products} />
      </div>
    </section>
  );
};

export default Product;
