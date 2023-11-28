import { createContext, useContext, useEffect, useState } from "react";
import { getCartItems } from "../utils/localStorage";
import { AppContextType, cartItem } from "../utils/types";

const Context = createContext<AppContextType>({
  showLoading: () => {},
  hideLoading: () => {},
  loading: false,
  cartItems: [],
  setCartItems: () => {},
});

export const useAppContext = () => {
  return useContext(Context);
};

export const AppContext = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<cartItem[]>();
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
      {children}
    </Context.Provider>
  );
};
