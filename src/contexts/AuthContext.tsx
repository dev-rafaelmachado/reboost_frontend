'use client'
import { usePathname, useRouter } from 'next/navigation'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

import { apiClient } from '@/services/apiClient'

import { fetchUserById } from '@/modules/User/fetchUserById'

import { User } from '@/types/common/User'

type AuthContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
})

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || ''),
  )

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('user', JSON.stringify(user))
    }

    const IUser = localStorage.getItem('user')
    if (IUser === null && pathname !== '/login' && pathname !== '/register') {
      router.push('/login')
    } else if (IUser !== null && !pathname.includes('/dashboard')) {
      console.log('push')
      router.push('/dashboard/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const login = async (email: string, password: string) => {
    const resLogin = await apiClient.post(
      '/Users/Login',
      {},
      {
        params: {
          email,
          password,
        },
      },
    )

    const user = await fetchUserById(resLogin.data.token.fkUserId)
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }
  return context
}

export { AuthContextProvider, useAuth }
