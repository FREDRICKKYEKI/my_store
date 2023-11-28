import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { getStoreData } from "../utils/api";
import { apiEndpoints } from "../utils/constants";
import { Order } from "../utils/types";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { showLoading, hideLoading } = useAppContext();

  useEffect(() => {
    showLoading();
    getStoreData(apiEndpoints.myOrders)
      .then((res: unknown) => {
        setOrders(res as Order[]);
        hideLoading();
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  }, []);
  console.log(orders, orders[0]);
  return (
    <>
      {orders.length === 0 ? (
        <div>No orders yet</div>
      ) : (
        <div className="profile-orders">
          <h2>Order History</h2>
          <table>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td>No Order Found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.paidAt || "No"}</td>
                    <td>{order.deliveredAt || "No"}</td>
                    <td style={{ textDecoration: "underline" }}>
                      <Link to={`/order/${order._id}`}>DETAILS</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
