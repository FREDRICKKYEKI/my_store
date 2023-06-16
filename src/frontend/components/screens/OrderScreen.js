// import { parseRequestUrl } from "../utils";
import { useParams } from "react-router-dom";
import { getOrder } from "../../../api";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";

export const OrderScreen = () => {
  const { id } = useParams();
  const { showLoading, hideLoading } = useAppContext();
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
                  <div className="fw" id="paypal-button"></div>
                </li>
                {/* <li> */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//     const addPaypalSdk = async (totalPrice) => {
//   const clientId = await getPaypalClientId();
//   showLoading();
//   if (!window.paypal) {
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://www.paypalobjects.com/api/checkout.js';
//     script.async = true;
//     script.onload = () => handlePayment(clientId, totalPrice);
//     document.body.appendChild(script);
//   } else {
//     handlePayment(clientId, totalPrice);
//   }
// };
// const handlePayment = (clientId, totalPrice) => {
//   window.paypal.Button.render(
//     {
//       env: 'sandbox',
//       client: {
//         sandbox: clientId,
//         production: '',
//       },
//       locale: 'en_US',
//       style: {
//         size: 'responsive',
//         color: 'gold',
//         shape: 'pill',
//       },

//       commit: true,
//       payment(data, actions) {
//         return actions.payment.create({
//           transactions: [
//             {
//               amount: {
//                 total: totalPrice,
//                 currency: 'USD',
//               },
//             },
//           ],
//         });
//       },
//       onAuthorize(data, actions) {
//         return actions.payment.execute().then(async () => {
//           showLoading();
//           await payOrder(parseRequestUrl().id, {
//             orderID: data.orderID,
//             payerID: data.payerID,
//             paymentID: data.paymentID,
//           });
//           hideLoading();
//           showMessage('Payment was successfull.', () => {
//             rerender(OrderScreen);
//           });
//         });
//       },
//     },
//     '#paypal-button'
//   ).then(() => {
//     hideLoading();
//   });
// };
// if (!isPaid) {
//   addPaypalSdk(totalPrice);
// }
