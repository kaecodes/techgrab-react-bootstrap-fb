import React, { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import spinnerImg from "../../assets/images/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  // Get data from products collection in database
  const { data, isLoading } = useFetchCollection("products");
  // Get products from redux store
  const products = useSelector(selectProducts);
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();

  // Get products collection from database using data from custom hook
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <section className="d-flex gap-4 flex-column flex-md-row position-relative mx-auto px-5">
      <aside
        className={
          showFilters
            ? "position-absolute start-0 top-0 w-75 h-100vh bg-success z-3"
            : "d-none d-lg-block w-md-25"
        }
      >
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
      <div className="d-flex d-lg-none position-absolute end-10 mt-4">
        <div className="" onClick={toggleFilters}>
          <FaCogs size={18} className="text-warning" />
          <strong className="text-primary">Show Filters</strong>
        </div>
      </div>
    </section>
  );
};

export default Product;
