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

import { userTest } from '@/shared/test/userTest'

import { User } from '@/types/common/User'

type AuthContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(userTest)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const user = localStorage.getItem('user')
    setUser(user ? JSON.parse(user) : null)
  }, [])

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('user', JSON.stringify(user))
    }

    if (user === null && pathname !== '/login' && pathname !== '/register') {
      router.push('/login')
    } else if (
      user !== null &&
      (pathname === '/login' || pathname === '/register')
    ) {
      router.push('/dashboard/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
