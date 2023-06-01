import { Children, createContext, useContext, useState } from "react";

const Context = createContext();

export const useAppContext = () => {
	return useContext(Context);
}

export const AppContext = () => {

const [loading, setLoading] = useState(false);
const showLoading = () => setLoading(true);
const hideLoading = () => setLoading(false);

  return (
	<Context.Provider value={{showLoading, hideLoading, loading}}>
		{ Children.map((el,i) => 
			<>
				el
			</>
		) }
	</Context.Provider>
  )
}
