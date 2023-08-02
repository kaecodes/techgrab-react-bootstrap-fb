import { useSelector } from "react-redux";
import { selectProducts } from "../redux/features/productSlice";
import { selectUserID, selectUserName } from "../redux/features/authSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import spinnerImg from "../assets/images/spinner.jpg";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import useFetchDocument from "../customHooks/useFetchDocument";

const ReviewProduct = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  // Set state to save fetched product from firebase
  const [product, setProduct] = useState(null);

  // Fetch specific document/product based on id from firebase
  const { document } = useFetchDocument("products", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  // const products = useSelector(selectProducts); <-- error every time user refreshes
  // // Find the specific to review
  // const product = products.find((item) => item.id === id);

  const navigate = useNavigate();

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    // Review config to push to firebase
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      setRate(0);
      setReview("");
      toast.success("Review submitted successfully!");
      navigate(`/product-details/${id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="mb-8">
      <div className="container">
        <h2 className="text-center text-primary pt-3 pb-2">Review Product</h2>
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
          {product === null ? (
            <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
          ) : (
            <>
              <p className="mb-0">
                <strong>Product Name: </strong>
                {product.name}
              </p>
              <img
                src={product.imageURL}
                alt={product.name}
                style={{ width: "200px" }}
              />
            </>
          )}
          <div className="card w-75 p-4 shadow">
            <form
              onSubmit={(e) => submitReview(e)}
              className="d-flex flex-column align-items-center"
            >
              <label className="p-2">Rating:</label>
              <StarsRating
                value={rate}
                onChange={(rate) => {
                  setRate(rate);
                }}
              />
              <label className="p-2">Review:</label>
              <textarea
                className="mb-3 w-100"
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewProduct;
