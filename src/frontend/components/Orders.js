import React, { useEffect, useState } from "react";
import { getMyOrders } from "../../api";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { showLoading, hideLoading } = useAppContext();
  useEffect(() => {
    const fetchOrders = async () => {
      return await getMyOrders();
    };
    showLoading();
    fetchOrders()
      .then((res) => {
        setOrders(res);
        hideLoading();
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
    return () => fetchOrders();
  }, []);
  console.log(orders, orders[0]);
  return (
    <>
      {orders.length === 0 ? (
        <div>No orders yet</div>
      ) : (
        <div class="profile-orders">
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
                  <td colspan="6">No Order Found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.paidAt || "No"}</td>
                    <td>{order.deliveryAt || "No"}</td>
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
