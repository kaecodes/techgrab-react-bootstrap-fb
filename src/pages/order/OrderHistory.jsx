import { useEffect } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_ORDERS,
  selectOrderHistory,
} from "../../redux/features/orderSlice";
import { selectUserID } from "../../redux/features/authSlice";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory); // Get all the orders from redux
  const userID = useSelector(selectUserID); // Get user ID from redux

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  // Filter orders based on userID
  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className="container-md d-flex flex-column">
        <h2 className="text-center text-primary pt-3 pb-2">
          Your Order History
        </h2>
        <p className="text-center">
          Click open an order to leave a <strong>Product Review</strong>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div>
            {filteredOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <table className="table table-info table-striped">
                <thead>
                  <tr className="text-center align-middle">
                    <th>Serial No.</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr
                        key={id}
                        onClick={() => handleClick(id)}
                        className="text-center align-middle"
                      >
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>{`$${orderAmount}`}</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? "text-warning my-auto"
                                : "text-success my-auto"
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
