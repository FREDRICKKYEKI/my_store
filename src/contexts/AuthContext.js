import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUserInfo } from '../frontend/localStorage';

const Context = createContext();

export const useAuth = () => {
	return useContext(Context);
}

export const AuthContext = ({children}) => {

	const [user, setUser] = useState();

	useEffect(() => {
		setUser(getUserInfo())
	}, [])

  return (
	<Context.Provider value={{user: user, setUser: setUser}}>
		{children}
	</Context.Provider>
  )
}
