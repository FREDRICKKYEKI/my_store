import React, { useEffect, useState } from "react";
import { getMyOrders } from "../../api";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      return await getMyOrders();
    };
    fetchOrders()
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => console.log(err));
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
                      <a href={`/order/${order._id}`}>DETAILS</a>
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
