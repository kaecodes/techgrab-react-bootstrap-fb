import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

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
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <div>ProductDetails</div>;
};

export default ProductDetails;
