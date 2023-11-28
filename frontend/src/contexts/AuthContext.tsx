import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../utils/localStorage";
import { AuthContextType, userInfo } from "../utils/types";

const Context = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => {
  return useContext(Context);
};

export const AuthContext = ({ children }: any) => {
  const [user, setUser] = useState<userInfo | null>(null);

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <Context.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </Context.Provider>
  );
};
