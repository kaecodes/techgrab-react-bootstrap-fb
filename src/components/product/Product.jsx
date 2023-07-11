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
import logoImg from "../../assets/images/techgrablogoblue.png";

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
        className="offcanvas-lg offcanvas-start w-50 w-lg-25 mt-lg-5"
        // className={
        //   showFilters
        //     ? "offcanvas offcanvas-start bg-success"
        //     : // ? "position-absolute start-0 top-0 w-50 h-100 bg-success z-3 p-4"
        //       "offcanvas-lg w-lg-25 mt-lg-5"
        // }
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <img
              src={logoImg}
              alt="Tech Grab logo"
              style={{ width: "150px" }}
            />
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {isLoading ? null : <ProductFilter />}
        </div>
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
      <div className="d-flex d-lg-none position-absolute end-5 mt-4">
        <div
          className="d-flex gap-1 align-items-center"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          onClick={toggleFilters}
        >
          <FaCogs size={18} className="text-warning" />
          <strong className="text-primary">Filters</strong>
        </div>
      </div>
    </section>
  );
};

export default Product;
