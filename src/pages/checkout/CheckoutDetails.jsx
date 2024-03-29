import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/features/checkoutSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout");
  };

  return (
    <section className="mb-5 pb-5">
      <h3 className="text-center text-primary py-3">Checkout Details</h3>
      <div className="container-md d-lg-flex gap-4">
        <form onSubmit={handleSubmit} className="w-lg-50">
          {/* Shipping Address */}
          <div className="card p-3 mb-3 shadow">
            <h4 className="fw-normal">Shipping Address</h4>
            <label className="py-1">Recipient Name:</label>
            <input
              type="text"
              placeholder="Recipient Name"
              className="mb-2 p-1"
              required
              name="name"
              value={shippingAddress.name}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">Address Line 1:</label>
            <input
              type="text"
              placeholder="Address Line 1"
              className="mb-2 p-1"
              required
              name="line1"
              value={shippingAddress.line1}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">Address Line 2:</label>
            <input
              type="text"
              placeholder="Address Line 2"
              className="mb-2 p-1"
              name="line2"
              value={shippingAddress.line2}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">City:</label>
            <input
              type="text"
              placeholder="City"
              className="mb-2 p-1"
              required
              name="city"
              value={shippingAddress.city}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">State:</label>
            <input
              type="text"
              placeholder="State"
              className="mb-2 p-1"
              required
              name="state"
              value={shippingAddress.state}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">Postal Code:</label>
            <input
              type="text"
              placeholder="Postal Code"
              className="mb-2 p-1"
              required
              name="postal_code"
              value={shippingAddress.postal_code}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">Country:</label>
            <CountryDropdown
              valueType="short"
              className="mb-2 p-2"
              value={shippingAddress.country}
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
            />
            <label className="py-1">Phone:</label>
            <input
              type="text"
              placeholder="Phone"
              className="mb-2 p-1"
              required
              name="phone"
              value={shippingAddress.phone}
              onChange={(e) => handleShipping(e)}
            />
          </div>
          {/* Billing Addres */}
          <div className="card p-3 mb-3 shadow">
            <h4 className="fw-normal">Billing Address</h4>
            <label className="py-1">Name:</label>
            <input
              type="text"
              placeholder="Name"
              className="mb-2 p-1"
              required
              name="name"
              value={billingAddress.name}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">Address Line 1:</label>
            <input
              type="text"
              placeholder="Address Line 1"
              className="mb-2 p-1"
              required
              name="line1"
              value={billingAddress.line1}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">Address Line 2:</label>
            <input
              type="text"
              placeholder="Address Line 2"
              className="mb-2 p-1"
              name="line2"
              value={billingAddress.line2}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">City:</label>
            <input
              type="text"
              placeholder="City"
              className="mb-2 p-1"
              required
              name="city"
              value={billingAddress.city}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">State:</label>
            <input
              type="text"
              placeholder="State"
              className="mb-2 p-1"
              required
              name="state"
              value={billingAddress.state}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">Postal Code:</label>
            <input
              type="text"
              placeholder="Postal Code"
              className="mb-2 p-1"
              required
              name="postal_code"
              value={billingAddress.postal_code}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">Country:</label>
            <CountryDropdown
              valueType="short"
              className="mb-2 p-2"
              value={billingAddress.country}
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
            />
            <label className="py-1">Phone:</label>
            <input
              type="text"
              placeholder="Phone"
              className="mb-2 p-1"
              required
              name="phone"
              value={billingAddress.phone}
              onChange={(e) => handleBilling(e)}
            />
            <button type="submit" className="btn btn-primary mt-2 w-50">
              Proceed to Checkout
            </button>
          </div>
        </form>
        <div className="w-lg-50">
          <div className="card p-3 shadow">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutDetails;
