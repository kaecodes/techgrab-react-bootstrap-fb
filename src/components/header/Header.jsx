import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/techgrablogo.png";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary d-lg-flex gap-lg-5">
        <div>
          <Link to="/" className="navbar-brand mx-4">
            <img src={logoImg} alt="Tech Grab logo" width="170px" />
          </Link>
        </div>
        <button
          className="navbar-toggler border-0 text-light shadow-none me-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNav"
          aria-controls="offcanvasNav"
          aria-label="Toggle navigation"
        >
          <span>
            <AiOutlineMenu className="fs-3" />
          </span>
        </button>
        <div
          className="offcanvas offcanvas-start bg-primary"
          id="offcanvasNav"
          tabindex="-1"
        >
          <div className="offcanvas-header">
            <img
              src={logoImg}
              className="offcanvas-title"
              alt="Tech Grab logo"
              width="140px"
            />
            <button
              type="button"
              className="text-light bg-transparent fs-4 shadow-none border-0"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="offcanvas-body d-flex justify-content-between mt-4 mt-lg-0">
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
              </ul>
            </div>
            <div>
              <ul className="navbar-nav fs-lg-5 fs-4">
                <li className="nav-item d-flex justify-content-end">
                  <Link
                    to="/login"
                    className="nav-link text-light d-flex align-items-center"
                  >
                    <FaUserCircle />
                    &nbsp;Login
                  </Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                  <Link to="/order-history" className="nav-link text-light">
                    My Orders
                  </Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                  <Link to="/" className="nav-link text-light">
                    Logout
                  </Link>
                </li>
                <li className="nav-item d-flex justify-content-end">
                  <Link to="/cart" className="nav-link text-light pe-0 me-lg-4">
                    <FaShoppingCart className="d-inline" />
                    <p className="d-inline">
                      <sup>10</sup>
                    </p>
                  </Link>
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
