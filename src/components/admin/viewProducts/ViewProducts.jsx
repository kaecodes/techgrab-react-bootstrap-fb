import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);

    try {
      // Get a reference of all the products
      const productsRef = collection(db, "products");
      // Query how data will be fetched from database
      const q = query(productsRef, orderBy("createdAt", "desc"));
      // Snapshot handler will receive a new query snapshot every time the query results change
      onSnapshot(q, (querySnapshot) => {
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return <div>ViewProducts</div>;
};

export default ViewProducts;
