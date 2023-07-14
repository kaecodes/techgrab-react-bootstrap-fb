import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

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

  const handleShipping = () => {};

  const handleBilling = () => {};

  const handleSubmit = () => {};

  return (
    <section className="mb-5 pb-5">
      <div className="container">
        <h3 className="text-center text-primary py-3">Checkout Details</h3>
        <form onSubmit={handleSubmit}>
          {/* Shipping Address */}
          <div className="card p-3 mb-3 shadow">
            <h4>Shipping Address</h4>
            <label className="py-1">Recipient Name:</label>
            <input
              type="text"
              placeholder="Recipient Name"
              className="mb-2"
              required
              name="name"
              value={shippingAddress.name}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">Address Line 1:</label>
            <input
              type="text"
              placeholder="Address Line 1"
              className="mb-2"
              required
              name="line1"
              value={shippingAddress.line1}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">Address Line 2:</label>
            <input
              type="text"
              placeholder="Address Line 2"
              className="mb-2"
              name="line2"
              value={shippingAddress.line2}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">City:</label>
            <input
              type="text"
              placeholder="City"
              className="mb-2"
              required
              name="city"
              value={shippingAddress.city}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">State:</label>
            <input
              type="text"
              placeholder="State"
              className="mb-2"
              required
              name="state"
              value={shippingAddress.state}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">Postal Code:</label>
            <input
              type="text"
              placeholder="Postal Code"
              className="mb-2"
              required
              name="postal_code"
              value={shippingAddress.postal_code}
              onChange={(e) => handleShipping(e)}
            />
            <label className="py-1">Country:</label>
            <CountryDropdown
              valueType="short"
              className="mb-2 p-1"
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
              className="mb-2"
              required
              name="phone"
              value={shippingAddress.phone}
              onChange={(e) => handleShipping(e)}
            />
          </div>
          {/* Billing Addres */}
          <div className="card p-3 shadow">
            <h4>Billing Address</h4>
            <label className="py-1">Name:</label>
            <input
              type="text"
              placeholder="Name"
              className="mb-2"
              required
              name="name"
              value={billingAddress.name}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">Address Line 1:</label>
            <input
              type="text"
              placeholder="Address Line 1"
              className="mb-2"
              required
              name="line1"
              value={billingAddress.line1}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">Address Line 2:</label>
            <input
              type="text"
              placeholder="Address Line 2"
              className="mb-2"
              name="line2"
              value={billingAddress.line2}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">City:</label>
            <input
              type="text"
              placeholder="City"
              className="mb-2"
              required
              name="city"
              value={billingAddress.city}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">State:</label>
            <input
              type="text"
              placeholder="State"
              className="mb-2"
              required
              name="state"
              value={billingAddress.state}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">Postal Code:</label>
            <input
              type="text"
              placeholder="Postal Code"
              className="mb-2"
              required
              name="postal_code"
              value={billingAddress.postal_code}
              onChange={(e) => handleBilling(e)}
            />
            <label className="py-1">Country:</label>
            <CountryDropdown
              valueType="short"
              className="mb-2 p-1"
              value={billingAddress.country}
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
              className="mb-2"
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
      </div>
    </section>
  );
};

export default CheckoutDetails;
