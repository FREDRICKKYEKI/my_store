import { getCartItems, getShipping, getPayment } from "../../localStorage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutSteps } from "../CheckoutSteps";

export const PlaceOrderScreen = () => {
  const [orderDetails, setDetails] = useState();
  const navigate = useNavigate();

  const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
      navigate("/cart");
    }
    const shipping = getShipping();
    if (!shipping.address) {
      navigate("/shipping");
    }
    const payment = getPayment();
    if (!payment.paymentMethod) {
      navigate("/payment");
    }
    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  };
  useEffect(() => {
    setDetails(convertCartToOrder());
	console.log(convertCartToOrder())
}, []);
  return (
    <div>
      {orderDetails && (
        <>
          <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
          <div className="order">
            <div className="order-info">
              <div>
                <h2>Shipping</h2>
                <div>
                  {orderDetails.shipping.address}, {orderDetails.shipping.city}, {orderDetails.shipping.postalCode}, {orderDetails.shipping.country}
                </div>
              </div>
              <div>
                <h2>Payment</h2>
                <div>Payment Method : {orderDetails.payment.paymentMethod}</div>
              </div>
              <div>
                <ul className="cart-list-container">
                  <li>
                    <h2>Shopping Cart</h2>
                    <div>Price</div>
                  </li>
                  {orderDetails.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={`${item.image}`} alt={`${item.name}`} />
                      </div>
                      <div className="cart-name">
                        <div>
                          <a href="/#/product/${item.product}">{item.name} </a>
                        </div>
                        <div> Qty: {item.qty} </div>
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
                  <div>${orderDetails.itemsPrice}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>${orderDetails.shippingPrice}</div>
                </li>
                <li>
                  <div>Tax</div>
                  <div>${orderDetails.taxPrice}</div>
                </li>
                <li className="total">
                  <div>Order Total</div>
                  <div>${orderDetails.totalPrice}</div>
                </li>
                <li>
                  <button className="primary fw">Place Order</button>
                </li>
              </ul>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};
