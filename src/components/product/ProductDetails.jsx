import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
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

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart) => cart.id === id);

  // Check to see if an item has been added to cart
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  const dispatch = useDispatch();

  // Get a single product from firebase
  const getProduct = async () => {
    // Get the reference to the doc
    const docRef = doc(db, "products", id);
    // Get the doc based on doc reference
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Create an id for the fetched document
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("Product Not Found.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
        <div className="text-center mb-5">
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
      </div>
    </section>
  );
};

export default ProductDetails;
