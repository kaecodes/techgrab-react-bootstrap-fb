import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const cart = (
  <Link to="/cart" className="nav-link text-light pe-0 ps-1 me-lg-4">
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
    className="nav-link text-light d-flex align-items-center justify-content-center p-2"
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
        <div className="d-flex d-lg-none">
          <div className="fs-3">{login}</div>
          <div className="fs-3">{cart}</div>
          <button
            className="navbar-toggler border-0 text-light shadow-none me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNav"
            aria-controls="offcanvasNav"
          >
            <AiOutlineMenu className="fs-3" />
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
                className="text-light bg-transparent fs-4 shadow-none border-0"
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
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contact"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/shop"
                    className="nav-link text-secondary text-decoration-none"
                  >
                    Shop
                  </Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link to="/order-history" className="nav-link text-light">
                    My Orders
                  </Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link
                    to="/"
                    className="nav-link text-light"
                    onClick={() => logoutUser()}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <div className="d-lg-flex justify-content-center align-items-center">
              <ul className="navbar-nav fs-5">
                <li className="nav-item d-none d-lg-flex justify-content-end align-items-center">
                  {login}
                  <a href="#" className="text-light text-decoration-none">
                    <FaUserCircle size={20} />
                    &nbsp;Hi, {displayName}
                  </a>
                </li>
                <li className="nav-item d-none d-lg-flex justify-content-end">
                  <Link to="/order-history" className="nav-link text-light">
                    My Orders
                  </Link>
                </li>
                <li className="nav-item d-none d-lg-flex justify-content-end">
                  <Link
                    to="/"
                    className="nav-link text-light"
                    onClick={() => logoutUser()}
                  >
                    Logout
                  </Link>
                </li>
                <li className="nav-item d-none d-lg-flex justify-content-end">
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
