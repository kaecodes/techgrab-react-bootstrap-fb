import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetchDocument = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);
  // Get a single document from firebase
  const getDocument = async () => {
    // Get the reference to the doc
    const docRef = doc(db, collectionName, documentID);
    // Get the doc based on doc reference
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Create an id for the fetched document
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };
      setDocument(obj);
    } else {
      toast.error("Document not found.");
    }
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { document };
};

export default useFetchDocument;
