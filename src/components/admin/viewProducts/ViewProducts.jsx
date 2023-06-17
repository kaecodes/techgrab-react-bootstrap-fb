import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
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
        setIsLoading(false);
        setProducts(allProducts);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="container">
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
                      <FaTrashAlt size={18} color="red" />
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
