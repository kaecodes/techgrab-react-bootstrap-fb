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
import { db, storage } from "../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/features/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";

const ViewProducts = () => {
  // Get data from products collection in database
  const { data, isLoading } = useFetchCollection("products");
  // Get products from redux store
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  // Get products collection from database using data from custom hook
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  // Confirm delete product
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
                      <Link to={`/admin/add-product/${id}`}>
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
