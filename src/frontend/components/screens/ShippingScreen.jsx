import { getUserInfo, getShipping, setShipping } from '../../localStorage';
import { CheckoutSteps } from '../CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export const ShippingScreen = () => {
	const navigate = useNavigate();
	const { name } = getUserInfo();
	const addressRef = useRef();
	const cityRef = useRef();
	const postalCodesRef = useRef();
	const countryRef = useRef();

	const handleShippingFormSubmit = async (e) => {
	  e.preventDefault();
	  setShipping({
		address: addressRef.current.value,
		city: cityRef.current.value,
		postalCode: postalCodesRef.current.value,
		country: countryRef.current.value,
	  });
	  navigate("/");
	};
	
	  if (!name) {
		navigate("/");
	  }
	  const { address, city, postalCode, country } = getShipping();
	 
    return (
      <>
        <CheckoutSteps step1= {true} step2= {true} />
        <div className="form-container">
          <form onSubmit={(e) => handleShippingFormSubmit(e)} id="shipping-form">
            <ul className="form-items">
              <li>
                <h1>Shipping</h1>
              </li>
              <li>
                <label htmlFor="address">Adress</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value="${address}"
                />
              </li>
              <li>
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" value="${city}" />
              </li>
              <li>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value="${postalCode}"
                />
              </li>
              <li>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value="${country}"
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
