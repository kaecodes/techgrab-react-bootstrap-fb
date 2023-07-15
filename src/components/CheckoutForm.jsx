import { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:5173/checkout-success",
        },
        redirect_url: "if_required",
      })
      .then((result) => {
        // ok - get paymentIntent
        // bad - get error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successful!");
          }
        }
      });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <section>
      <div className="container">
        <h3>Checkout</h3>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <CheckoutSummary />
          </div>
          <div className="card">
            <h4>Stripe Checkout</h4>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? (
                  <img
                    src={spinnerImg}
                    alt="Loading..."
                    style={{ width: "20px" }}
                  ></img>
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
