import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container-md d-flex flex-column">
        <h2 className="text-center text-primary pt-3 pb-2">
          Checkout Successful!
        </h2>
        <p className="text-center">Thank you for your purchase.</p>
        <Link to="/order-history" className="mx-auto">
          <button className="btn btn-primary">View Order History</button>
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
