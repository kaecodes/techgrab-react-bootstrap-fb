import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/techgrablogo.png";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/features/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/HiddenLink";
import AdminOnlyRoute, {
  AdminOnlyLink,
} from "../adminOnlyRoute/AdminOnlyRoute";

// Reusable variables
const cart = (
  <Link to="/cart" className="nav-link text-light">
    <FaShoppingCart className="d-inline" />
    <p className="d-inline">
      <sup>
        <small>10</small>
      </sup>
    </p>
  </Link>
);

const login = (
  <Link
    to="/login"
    className="nav-link text-light d-flex align-items-center justify-content-center"
  >
    <FaUserCircle />
  </Link>
);

const Header = () => {
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Create a display name if display name is null
        if (user.displayName === null) {
          // Remove all characters from email after @ including @
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary d-lg-flex gap-lg-5">
        <div>
          <Link to="/" className="navbar-brand mx-4">
            <img src={logoImg} alt="Tech Grab logo" width="170px" />
          </Link>
        </div>
        <div className="d-flex d-lg-none justify-content-center align-items-center">
          <ShowOnLogout>
            <div className="fs-4 fs-sm-4 mx-3">{login}</div>
          </ShowOnLogout>
          <ShowOnLogin>
            <a
              href="/"
              className="d-none d-sm-flex justify-content-center align-items-center text-warning text-decoration-none fs-4 fs-sm-4 mx-2"
            >
              <FaUserCircle />
              &nbsp;Hi, {displayName}
            </a>
          </ShowOnLogin>
          <div className="fs-6 fs-sm-4">{cart}</div>
          <button
            className="navbar-toggler border-0 text-light shadow-none me-3 fs-4 fs-sm-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNav"
            aria-controls="offcanvasNav"
          >
            <AiOutlineMenu />
          </button>
        </div>
        <div
          className="offcanvas offcanvas-start offcanvas-lg bg-primary"
          id="offcanvasNav"
          tabIndex="-1"
        >
          <div className="offcanvas-header">
            <img
              src={logoImg}
              className="offcanvas-title"
              alt="Tech Grab logo"
              width="140px"
            />
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="text-light bg-transparent fs-sm-4 fs-6 shadow-none border-0"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>
          <div className="offcanvas-body d-flex flex-column flex-lg-row justify-content-between mt-4 mt-lg-0">
            <div>
              <ul className="navbar-nav fs-3">
                <AdminOnlyRoute>
                  <li className="nav-item">
                    <Link
                      to="/admin/home"
                      className="nav-link text-warning text-decoration-none"
                    >
                      ADMIN
                    </Link>
                  </li>
                </AdminOnlyRoute>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink
                    to="/about"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink
                    to="/contact"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink
                    to="/shop"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    Shop
                  </NavLink>
                </li>
                <ShowOnLogin>
                  <li className="nav-item d-lg-none">
                    <Link to="/order-history" className="nav-link text-light">
                      My Orders
                    </Link>
                  </li>
                </ShowOnLogin>
                <ShowOnLogin>
                  <li
                    className="nav-item d-lg-none"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link
                      to="/"
                      className="nav-link text-light"
                      onClick={() => logoutUser()}
                    >
                      Logout
                    </Link>
                  </li>
                </ShowOnLogin>
              </ul>
            </div>
            <div className="d-lg-flex justify-content-center align-items-center">
              <ul className="navbar-nav fs-4">
                <li className="nav-item d-none d-lg-flex justify-content-end align-items-center">
                  <ShowOnLogout>{login}</ShowOnLogout>
                  <ShowOnLogin>
                    <a
                      href="#"
                      className="d-flex align-items-center text-warning text-decoration-none"
                    >
                      <FaUserCircle />
                      &nbsp;Hi, {displayName}
                    </a>
                  </ShowOnLogin>
                </li>
                <ShowOnLogin>
                  <li className="nav-item d-none d-lg-flex justify-content-end">
                    <Link to="/order-history" className="nav-link text-light">
                      My Orders
                    </Link>
                  </li>
                </ShowOnLogin>
                <ShowOnLogin>
                  <li className="nav-item d-none d-lg-flex justify-content-end">
                    <Link
                      to="/"
                      className="nav-link text-light"
                      onClick={() => logoutUser()}
                    >
                      Logout
                    </Link>
                  </li>
                </ShowOnLogin>
                <li className="nav-item d-none d-lg-flex justify-content-end me-3">
                  {cart}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
