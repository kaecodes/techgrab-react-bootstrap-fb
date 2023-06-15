import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/features/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className="navbar p-0 d-flex flex-column flex-md-row">
      <div className="w-100 min-vh-15 d-flex flex-column justify-content-center align-items-center gap-2 bg-info fs-3 text-primary">
        <FaUserCircle />
        <h3>{userName}</h3>
      </div>
      <nav className="w-100 min-vh-md-100 border-end">
        <ul className="navbar-nav">
          <li className="nav-item text-center py-2">
            <NavLink to="/admin/home" className="text-decoration-none">
              Home
            </NavLink>
          </li>
          <hr />
          <li className="nav-item text-center py-2">
            <NavLink to="/admin/view-products" className="text-decoration-none">
              View Products
            </NavLink>
          </li>
          <hr />
          <li className="nav-item text-center py-2">
            <NavLink to="/admin/add-product" className="text-decoration-none">
              Add Product
            </NavLink>
          </li>
          <hr />
          <li className="nav-item text-center py-2">
            <NavLink to="/admin/orders" className="text-decoration-none">
              Orders
            </NavLink>
          </li>
          <hr />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
