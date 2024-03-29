import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/features/cartSlice";

const ProductItem = ({ product, grid, id, name, imageURL, price, desc }) => {
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const gridImage = {
    width: "180px",
    height: "180px",
    objectFit: "contain",
  };

  const listImage = {
    width: "200px",
    height: "200px",
    objectFit: "contain",
  };

  // Add product to cart
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY()); // Update cart count from shop page
  };

  return (
    <div
      className={grid ? "card p-2 shadow" : "card p-3 shadow d-flex flex-row"}
    >
      <div className="d-flex justify-content-center align-items-center">
        <Link to={`/product-details/${id}`}>
          <img src={imageURL} alt={name} style={grid ? gridImage : listImage} />
        </Link>
      </div>
      <div
        className={
          grid
            ? "d-flex flex-column justify-content-center align-items-center p-2 h-40"
            : "justify-content-start ms-4 p-2"
        }
      >
        <div className="">
          {(grid && <h5 className="my-1">{shortenText(name, 18)}</h5>) ||
            (!grid && <h5 className="my-1">{name}</h5>)}
        </div>
        <div className="">
          <p className="fs-4 fw-bold text-warning mb-1">{`$${price}`}</p>
          {!grid ? <p>{shortenText(desc, 200)}</p> : null}
        </div>
        <button
          className={!grid ? "btn btn-primary" : "btn btn-primary w-100"}
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
