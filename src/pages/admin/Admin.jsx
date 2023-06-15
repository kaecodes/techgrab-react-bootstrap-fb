import { Routes, Route } from "react-router-dom";
import Home from "../../components/admin/home/Home";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Orders from "../../components/admin/orders/Orders";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";
import Navbar from "../../components/admin/navbar/Navbar";

const Admin = () => {
  return (
    <section className="d-flex flex-column flex-md-row">
      <div className="w-md-25">
        <Navbar />
      </div>
      <div className="w-md-75">
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
