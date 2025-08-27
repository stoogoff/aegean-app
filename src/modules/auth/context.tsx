
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, GuestUser } from './models'

interface Props {
	children: ReactNode;
}

export const AuthContext = createContext(null)

export const useAuthContext = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }: Props) => {
	const guestUser = new GuestUser()
	const [user, setUser] = useState<User>(guestUser)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
