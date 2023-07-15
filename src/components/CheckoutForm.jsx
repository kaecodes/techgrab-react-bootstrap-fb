import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";
import spinnerImg from "../assets/images/spinner.jpg";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    console.log("Order saved");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:5173/checkout-success",
        },
        redirect_url: "if_required",
      })
      .then((result) => {
        // result bad - get error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        // result ok - get paymentIntent
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successful!");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <section className="mb-5 pb-5">
      <div className="container-md">
        <h2 className="text-center text-primary py-3">Checkout</h2>
        <form onSubmit={handleSubmit} className="d-lg-flex gap-3">
          <div className="card p-3 mb-3 shadow w-lg-50">
            <CheckoutSummary />
          </div>
          <div className="card p-3 mb-3 shadow w-lg-50">
            <h4 className="fw-normal text-center mb-3">Stripe Checkout</h4>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="btn btn-primary mt-3"
            >
              <span id="button-text">
                {isLoading ? (
                  <img
                    src={spinnerImg}
                    alt="Loading..."
                    style={{ width: "20px" }}
                  />
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
