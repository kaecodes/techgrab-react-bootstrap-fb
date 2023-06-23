import { Routes, Route } from "react-router-dom";
import Home from "../components/admin/Home";
import ViewProducts from "../components/admin/ViewProducts";
import AddProduct from "../components/admin/AddProduct";
import Orders from "../components/admin/Orders";
import OrderDetails from "../components/admin/OrderDetails";
import Navbar from "../components/admin/Navbar";

const Admin = () => {
  return (
    <section className="d-flex flex-column flex-md-row">
      <div className="w-md-25 border-end">
        <Navbar />
      </div>
      <div className="w-md-75 min-vh-md-100">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </section>
  );
};

export default Admin;
