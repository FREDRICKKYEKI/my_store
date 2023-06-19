// import { parseRequestUrl } from "../utils";
import { useParams } from "react-router-dom";
import { getOrder, getPaypalClientId, payOrder } from "../../../api";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { MessageModal } from "../modals/MessageModal";
import { PayPalButton } from "../buttons/PayPalButton";

export const OrderScreen = () => {
  const { id } = useParams();
  const { showLoading, hideLoading } = useAppContext();
  const [message, setMessage] = useState("");
  const [showMessage, setShow] = useState(false);
  const [
    {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    },
    setOrder,
  ] = useState({});

  useEffect(() => {
    showLoading();
    const fetchOrderDetails = async () => {
      return await getOrder(id);
    };

    fetchOrderDetails()
      .then((res) => {
        setOrder(res);
        hideLoading();
      })
      .catch((err) => {
        console.log(err);
        hideLoading();
      });
  }, []);

  return (
    <>
      {_id && (
        <div style={{ padding: "1rem" }}>
          <h1>Order {_id}</h1>
          <div className="order">
            <div className="order-info">
              <div>
                <h2>Shipping</h2>
                <div>
                  {shipping.address}, {shipping.city}, {shipping.postalCode},
                  {shipping.country}
                </div>
                {isDelivered ? (
                  <div className="success">Delivered at {deliveredAt}</div>
                ) : (
                  <div className="error">Not Delivered</div>
                )}
              </div>
              <div>
                <h2>Payment</h2>
                <div>Payment Method : {payment.paymentMethod}</div>
                {isPaid ? (
                  <div className="success">Paid at {paidAt}</div>
                ) : (
                  <div className="error">Not Paid</div>
                )}
              </div>
              <div>
                <ul className="cart-list-container">
                  <li>
                    <h2>Shopping Cart</h2>
                    <div>Price</div>
                  </li>
                  {orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={`${item.image}`} alt={`${item.name}`} />
                      </div>
                      <div className="cart-name">
                        <div>
                          <a href={`/product/${item.product}`}>{item.name} </a>
                        </div>
                        <div> Qty: ${item.qty} </div>
                      </div>
                      <div className="cart-price"> ${item.price}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-action">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </li>
                <li>
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </li>
                <li className="total">
                  <div>Order Total</div>
                  <div>${totalPrice}</div>
                </li>
                <li>
                  {!isPaid && (
                    <PayPalButton
                      setShow={setShow}
                      setMessage={setMessage}
                      totalPrice={totalPrice}
                      setOrder={setOrder}
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <MessageModal show={showMessage} message={message} setShow={setShow} />
    </>
  );
};
