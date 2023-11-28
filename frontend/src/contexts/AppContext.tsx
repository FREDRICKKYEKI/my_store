import { createContext, useContext, useEffect, useState } from 'react';
import { getCartItems } from '../utils/localStorage';
import { AppContextType, cartItem, product } from '../utils/types';
import { useSearchParams } from 'react-router-dom';

const Context = createContext<AppContextType>({
  showLoading: () => {},
  hideLoading: () => {},
  loading: false,
  cartItems: [],
  setCartItems: () => {},
  params: undefined,
  setParams: () => {},
  products: [],
  setProducts: () => {},
});

export const useAppContext = () => {
  return useContext(Context);
};

export const AppContext = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<cartItem[]>();
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<product[]>();
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
      value={{
        showLoading,
        hideLoading,
        loading,
        cartItems,
        setCartItems,
        params,
        setParams,
        products,
        setProducts,
      }}
    >
      {children}
    </Context.Provider>
  );
};
