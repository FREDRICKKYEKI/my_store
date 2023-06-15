import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { setPayment } from "../../localStorage";
import { CheckoutSteps } from "../CheckoutSteps";

export const PaymentScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const paymentRef = useRef();

  /**
   * handles onsubmit event
   *
   * @param {Event} e event emitted on submit form
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    ).value;
    setPayment({ paymentMethod });
    navigate("/placeorder");
  };

  useEffect(() => {
      if (user&&!user.name) {
    	navigate('/');
      }
  }, []);

  return (
    <>
      <CheckoutSteps step1={true} step2={true} step3={true} />
      <div className="form-container">
        <form id="payment-form" onSubmit={(e) => handleSubmit(e)}>
          <ul className="form-items">
            <li>
              <h1>Payment</h1>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="payment-method"
                  id="paypal"
                  value="Paypal"
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="payment-method"
                  id="stripe"
                  value="Stripe"
                />
                <label htmlFor="stripe">Stripe</label>
              </div>
            </li>
            <li>
              <button type="submit" className="primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};
