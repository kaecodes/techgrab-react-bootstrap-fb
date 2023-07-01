import React, { useEffect } from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import spinnerImg from "../../assets/images/spinner.jpg";

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
      <aside className="d-none d-lg-block w-md-25">
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className="w-100 w-lg-75">
        {isLoading ? (
          <img
            src={spinnerImg}
            alt="Loading..."
            style={{ width: "100px" }}
            className="position-fixed top-50 start-50 translate-middle"
          />
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </section>
  );
};

export default Product;
