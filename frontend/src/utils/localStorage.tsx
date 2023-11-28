import { cartItem, shippingInfo, userInfo } from "./types";

/**
 * gets the cart items stored in the local storage
 * @returns {Array} list of cart items
 */
export const getCartItems = (): cartItem[] => {
  const cartItems: string | null = localStorage.getItem("cartItems");
  if (cartItems) return JSON.parse(cartItems);
  return [];
};

export const storeCartItems = (cartItems: cartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  password = "",
  token = "",
  isAdmin = false,
}: userInfo) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      _id,
      name,
      email,
      password,
      token,
      isAdmin,
    })
  );
};

export const clearUser = (): void => {
  localStorage.removeItem("userInfo");
};

export const getUserInfo = (): userInfo => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return {
    _id: "",
    name: "",
    email: "",
    password: "",
    token: "",
    isAdmin: false,
  };
};

export const getShipping = (): shippingInfo => {
  const shipping = localStorage.getItem("shipping");
  if (shipping) return JSON.parse(shipping);
  return {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  };
};
export const setShipping = ({
  address = "",
  city = "",
  postalCode = "",
  country = "",
}: shippingInfo) => {
  localStorage.setItem(
    "shipping",
    JSON.stringify({ address, city, postalCode, country })
  );
};

export const getPayment = () => {
  const payment = localStorage.getItem("payment");
  if (payment) return JSON.parse(payment);
  return {
    paymentMethod: "paypal",
  };
};

export const setPayment = ({ paymentMethod = "paypal" }) => {
  localStorage.setItem("payment", JSON.stringify({ paymentMethod }));
};

export const cleanCart = () => {
  localStorage.removeItem("cartItems");
};
