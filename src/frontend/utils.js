import { redirect, useNavigate } from 'react-router-dom';
import { getCartItems } from './localStorage';

/**
 * parse url
 * @returns url parameters
 */
export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

/**
 * redirectUser - redirect user if form submission is successful 
 */
export const redirectUser = () => {
	const navigate = useNavigate();
  if (getCartItems().length !== 0) {
    redirect("/shipping");
  } else {
    navigate("/");
  }
};
