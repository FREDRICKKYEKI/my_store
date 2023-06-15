import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCartItems } from "../frontend/localStorage";

const Context = createContext();

export const useAppContext = () => {
	return useContext(Context);
}

export const AppContext = ({children}) => {

const [loading, setLoading] = useState(false);
const showLoading = () => setLoading(true);
const hideLoading = () => setLoading(false);
const [cartItems, setCartItems] = useState();

useEffect(() => {
	setCartItems(getCartItems());
}, [])
  return (
    <Context.Provider
      value={{ showLoading, hideLoading, loading, cartItems, setCartItems }}
    >
      <AuthContext>{children}</AuthContext>
    </Context.Provider>
  );
}
