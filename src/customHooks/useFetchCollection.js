import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get collection from database
  const getCollection = () => {
    setIsLoading(true);

    try {
      // Get a reference of all the docs
      const docRef = collection(db, collectionName);
      // Query how data will be fetched from database
      const q = query(docRef, orderBy("createdAt", "desc"));
      // Snapshot handler will receive a new query snapshot every time the query results change
      onSnapshot(q, (querySnapshot) => {
        const allData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIsLoading(false);
        setData(allData);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, isLoading };
};

export default useFetchCollection;
