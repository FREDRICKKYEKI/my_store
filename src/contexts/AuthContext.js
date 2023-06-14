import React, { createContext } from 'react'

const Context = createContext();

export const useAuth = () => {
	return Context;
}

export const AuthContext = ({children}) => {

	
  return (
	<Context.Provider>
		{children}
	</Context.Provider>
  )
}
