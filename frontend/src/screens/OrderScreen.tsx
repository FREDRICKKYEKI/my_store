// import { parseRequestUrl } from "../utils";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStoreData, mutateStoreData } from '../utils/api';
import { apiEndpoints } from '../utils/constants';
import { Order } from '../utils/types';
import { useAppContext } from '../contexts/AppContext';
import { MessageModal } from '../components/modals/MessageModal';
import { PayPalButton } from '../components/buttons/PayPalButton';
import { useAuth } from '../contexts/AuthContext';

export const OrderScreen = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useAppContext();
  const [message, setMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>({} as Order);

  useEffect(() => {
    showLoading();

    getStoreData(apiEndpoints.order(id))
      .then((res) => {
        setOrder(res as Order);
        hideLoading();
      })
      .catch((err) => {
        console.log(err);
        hideLoading();
      });
  }, []);

  const handleDelivery = () => {
    showLoading();
    mutateStoreData(apiEndpoints.delivery(id), {}, 'PUT')
      .then((res) => {
        setOrder(res as Order);
        setShowModal(true);
        setMessage('Order Delivered');
        hideLoading();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setShowModal(true);
        setMessage('Order not Delivered');
        hideLoading();
      });
  };
  if (!order?._id) return <></>;
  return (
    <>
      <div style={{ padding: '1rem' }}>
        <h1>Order {order._id}</h1>
        <div className='order'>
          <div className='order-info'>
            <div>
              <h2>Shipping</h2>
              <div>
                {order?.shipping?.address}, {order?.shipping?.city},{' '}
                {order?.shipping?.postalCode},{order?.shipping?.country}
              </div>
              {order?.isDelivered ? (
                <div className='success'>
                  Delivered at{' '}
                  {new Date(order?.deliveredAt as string).toLocaleString()}
                </div>
              ) : (
                <div className='error'>Not Delivered</div>
              )}
            </div>
            <div>
              <h2>Payment</h2>
              <div>Payment Method : {order?.payment?.paymentMethod}</div>
              {order?.isPaid ? (
                <div className='success'>
                  Paid at {new Date(order?.paidAt as string).toLocaleString()}
                </div>
              ) : (
                <div className='error'>Not Paid</div>
              )}
            </div>
            <div>
              <ul className='cart-list-container'>
                <li>
                  <h2>Shopping Cart</h2>
                  <div>Price</div>
                </li>
                {order &&
                  order?.orderItems?.map((item) => (
                    <li key={item._id}>
                      <div className='cart-image'>
                        <img src={`${item.image}`} alt={`${item.name}`} />
                      </div>
                      <div className='cart-name'>
                        <div>
                          <a href={`/product/${item.product}`}>{item.name} </a>
                        </div>
                        <div> Qty: {item.qty} </div>
                      </div>
                      <div className='cart-price'> ${item.price}</div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className='order-action'>
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div>Items</div>
                <div>${order?.itemsPrice}</div>
              </li>
              <li>
                <div>Shipping</div>
                <div>${order?.shippingPrice}</div>
              </li>
              <li>
                <div>Tax</div>
                <div>${order?.taxPrice}</div>
              </li>
              <li className='total'>
                <div>Order Total</div>
                <div>${order?.totalPrice}</div>
              </li>
              <li>
                {!order?.isPaid && (
                  <PayPalButton
                    setShow={setShowModal}
                    setMessage={setMessage}
                    totalPrice={order?.totalPrice}
                    setOrder={setOrder}
                  />
                )}
              </li>
              <li>
                {order?.isPaid && !order?.isDelivered && user?.isAdmin ? (
                  <button
                    onClick={() => handleDelivery()}
                    id='deliver-order-button'
                    className='primary fw'
                  >
                    Deliver Order
                  </button>
                ) : (
                  <></>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <MessageModal show={showModal} message={message} setShow={setShowModal} />
    </>
  );
};
