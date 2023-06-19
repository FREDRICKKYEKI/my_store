import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCartItems } from "../frontend/localStorage";

const Context = createContext();

export const useAppContext = () => {
  return useContext(Context);
};

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState();

  /**
   * Shows screen loader
   * @returns sets the loading setter to true
   */
  const showLoading = () => setLoading(true);
  /**
   * Hides screen loader
   * @returns sets the loading setter to false
   */
  const hideLoading = () => setLoading(false);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);
  return (
    <Context.Provider
      value={{ showLoading, hideLoading, loading, cartItems, setCartItems }}
    >
      <AuthContext>{children}</AuthContext>
    </Context.Provider>
  );
};
