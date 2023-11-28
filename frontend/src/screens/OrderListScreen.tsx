import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { getStoreData, mutateStoreData } from '../utils/api';
import { apiEndpoints } from '../utils/constants';
import { Order } from '../utils/types';
import { Link, useNavigate } from 'react-router-dom';

export const OrderListScreen = () => {
  const [orders, setOrders] = useState<Order[]>();
  const { showLoading, hideLoading } = useAppContext();
  const navigate = useNavigate();

  function handleDelete(id: string): void {
    if (confirm('Are you sure to delete this order?')) {
      showLoading();
      mutateStoreData(apiEndpoints.order(id), {}, 'DELETE')
        .then((response) => {
          console.log(response);
          hideLoading();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          hideLoading();
        });
    }
  }

  function handleEdit(id: string): void {
    navigate(`/order/${id}`);
  }

  useEffect(() => {
    showLoading();
    getStoreData(apiEndpoints.orders)
      .then((prod: unknown) => {
        setOrders(prod as Order[]);
        hideLoading();
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  }, []);

  return (
    <div className='dashboard'>
      <div className='dashboard-content'>
        <h1>Orders</h1>

        <div className='order-list'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>USER</th>
                <th>PAID AT</th>
                <th>DELIVERED AT</th>
                <th className='tr-action'>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{(order.user as any).name}</td>
                  <td>{order.paidAt || 'No'}</td>
                  <td>{order.deliveredAt || 'No'}</td>
                  <td>
                    <Link to={`/order/${order._id}/edit`}>
                      <button
                        onClick={() => handleEdit(order._id)}
                        id={`${order._id}`}
                        className='edit-button'
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(order._id)}
                      id={`${order._id}`}
                      className='delete-button'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
