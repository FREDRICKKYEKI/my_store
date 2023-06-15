import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { setPayment } from "../../localStorage";
import { CheckoutSteps } from "../CheckoutSteps";

export const PaymentScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const paymentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentMethod = paymentRef.current.value;
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
      <div class="form-container">
        <form id="payment-form" onSubmit={(e) => handleSubmit(e)}>
          <ul class="form-items">
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
				  ref={paymentRef}
                  checked
                />
                <label for="paypal">PayPal</label>
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
                <label for="stripe">Stripe</label>
              </div>
            </li>
            <li>
              <button type="submit" class="primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};
