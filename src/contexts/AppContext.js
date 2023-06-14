import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const Context = createContext();

export const useAppContext = () => {
	return useContext(Context);
}

export const AppContext = ({children}) => {

const [loading, setLoading] = useState(false);
const showLoading = () => setLoading(true);
const hideLoading = () => setLoading(false);

  return (
	<Context.Provider value={{showLoading, hideLoading, loading, }}>
		<AuthContext>
			{children}
		</AuthContext>
	</Context.Provider>
  )
}
