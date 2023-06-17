import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/features/productSlice";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  // Get all products from database
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
        setIsLoading(false);
        setProducts(allProducts);

        // Get all products from firebase and saving them to redux
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "Are you sure you want to delete the selected product?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Cancelled");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
        plainText: true,
      }
    );
  };

  // Delete a product (data and image)
  const deleteProduct = async (id, imageURL) => {
    try {
      // Delete a document from collection
      await deleteDoc(doc(db, "products", id));
      // Delete image from storage - Create a reference to the file to delete
      const storageRef = ref(storage, imageURL);
      // Delete the file
      await deleteObject(storageRef);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="container w-md-80">
        <h2 className="py-1 my-3 text-center text-success fw-bold">
          All Products
        </h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table className="table table-success table-striped">
            <thead>
              <tr className="text-center">
                <th>Serial No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, imageURL, category, price } = product;
                return (
                  <tr key={id} className="text-center align-middle">
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px", height: "110px" }}
                        className="object-fit-contain"
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td>
                      <Link to="/admin/add-product">
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        role="button"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
