import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import spinnerImg from "../../assets/images/spinner.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <section>
      <div className="container mb-8">
        <h2>Product Details</h2>
        <Link to="/shop">
          <button className="btn btn-primary">&larr; Back to Shop</button>
        </Link>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "100px" }} />
        ) : (
          <>
            <div>
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div>
              <h3>{product.name}</h3>
              <p>{`$${product.price}`}</p>
              <p>{product.desc}</p>
              <p>
                <strong>SKU: </strong>
                {product.id}
              </p>
              <p>
                <strong>Brand: </strong>
                {product.brand}
              </p>
              <div>
                <button className="btn">-</button>
                <p>
                  <strong>1</strong>
                </p>
                <button className="btn">+</button>
              </div>
              <button className="btn btn-warning text-light">
                Add To Cart
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
