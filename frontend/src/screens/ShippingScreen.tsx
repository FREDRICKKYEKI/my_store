import { getShipping, setShipping } from "../utils/localStorage";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { shippingDetails } from "../utils/types";

export const ShippingScreen = () => {
  const [shipping, setShippingDetails] = useState<shippingDetails>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const addressRef = useRef<any>();
  const cityRef = useRef<any>();
  const postalCodesRef = useRef<any>();
  const countryRef = useRef<any>();

  const handleShippingFormSubmit = async (e: any) => {
    e.preventDefault();
    setShipping({
      address: addressRef?.current.value,
      city: cityRef?.current.value,
      postalCode: postalCodesRef?.current.value,
      country: countryRef?.current.value,
    });
    navigate("/payment");
  };

  useEffect(() => {
    if (user && !user.name) {
      navigate("/");
    }
    setShippingDetails(getShipping());
  }, []);

  return (
    <>
      <CheckoutSteps step1={true} step2={true} />
      <div className="form-container">
        <form onSubmit={(e) => handleShippingFormSubmit(e)} id="shipping-form">
          <ul className="form-items">
            <li>
              <h1>Shipping</h1>
            </li>
            <li>
              <label htmlFor="address">Adress</label>
              <input
                ref={addressRef}
                type="text"
                name="address"
                id="address"
                defaultValue={`${shipping?.address || ""}`}
              />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                ref={cityRef}
                defaultValue={`${shipping?.city || ""}`}
              />
            </li>
            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                ref={postalCodesRef}
                type="text"
                name="postalCode"
                id="postalCode"
                defaultValue={`${shipping?.postalCode || ""}`}
              />
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                ref={countryRef}
                id="country"
                defaultValue={`${shipping?.country || ""}`}
              />
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
