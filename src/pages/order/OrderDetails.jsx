import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/images/spinner.jpg";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section className="mb-8">
      <div className="container-md d-flex flex-column">
        <h2 className="text-center text-primary pt-3 pb-2">Order Details</h2>
        <div className="text-center">
          <Link to="/order-history">&larr; Back to Order History</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div>
              <p className="mb-0">
                <strong>Order ID:</strong> {order.id}
              </p>
              <p className="mb-0">
                <strong>Order Amount:</strong> {`$${order.orderAmount}`}
              </p>
              <p className="mb-0">
                <strong>Order Status:</strong> {order.orderStatus}
              </p>
            </div>
            <br />
            <table className="table table-secondary table-striped">
              <thead>
                <tr className="text-center align-middle">
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id} className="text-center align-middle">
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>
                        <p>
                          <strong>{name}</strong>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{`$${price}`}</td>
                      <td>{cartQuantity}</td>
                      <td>{`$${(price * cartQuantity).toFixed(2)}`}</td>
                      <td>
                        <Link to={`/review-product/${id}`}>
                          <button className="btn btn-primary">
                            Review Product
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
