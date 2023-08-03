import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, documentId, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import spinnerImg from "../../assets/images/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../redux/features/cartSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import useFetchCollection from "../../customHooks/useFetchCollection";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  // Get data from reviews collection
  const { data } = useFetchCollection("reviews");

  // Filter reviews to get only reviews that match specific product based on id
  const filteredReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);

  // Check to see if an item has been added to cart
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  const dispatch = useDispatch();

  // // Get a single product from firebase -- ** Move to custom hook **
  // const getProduct = async () => {
  //   // Get the reference to the doc
  //   const docRef = doc(db, "products", id);
  //   // Get the doc based on doc reference
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     // Create an id for the fetched document
  //     const obj = {
  //       id: id,
  //       ...docSnap.data(),
  //     };
  //     setProduct(obj);
  //   } else {
  //     toast.error("Product Not Found.");
  //   }
  // };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className="container mb-8">
        <h3 className="text-center text-primary pt-3 mb-0 pb-2">
          Product Details
        </h3>
        <div className="text-center mb-3">
          <Link to="/shop">&larr; Back to Shop</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "100px" }} />
        ) : (
          <div className="d-flex flex-column gap-4 flex-lg-row card shadow p-5">
            <div className="d-flex justify-content-center align-items-center px-2">
              <img
                src={product.imageURL}
                className="img-fluid"
                alt={product.name}
              />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-start px-2">
              <h3 className="py-2">{product.name}</h3>
              <p className="fs-3 text-warning fw-bold">{`$${product.price}`}</p>
              <p className="text-center text-lg-start">{product.desc}</p>
              <p>
                <strong>SKU: </strong>
                {product.id}
              </p>
              <p>
                <strong>Brand: </strong>
                {product.brand}
              </p>
              <div>
                {/* Check to see if an item has been added to cart */}
                {isCartAdded < 0 ? null : (
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <button
                      className="btn bg-light px-3 py-1"
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </button>
                    <p className="px-3 my-auto">
                      <strong>{cart.cartQuantity}</strong>
                    </p>
                    <button
                      className="btn bg-light px-3 py-1"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
              <button
                className="btn btn-warning text-light"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        )}
        <div className="card shadow mt-4 px-5 py-2">
          <h4 className="text-center text-primary pt-3 mb-0 pb-2">Reviews</h4>
          <div>
            {filteredReviews.length === 0 ? (
              <p className="text-center">
                There are no reviews for this product yet.
              </p>
            ) : (
              <>
                <hr />
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <p className="fw-medium">
                        {reviewDate} | By: {userName}
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
