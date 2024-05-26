'use client'

import { ReactNode } from 'react'

import { AuthContextProvider } from './AuthContext'
import ReactQueryProvider from './QueryClient'

export const ContextWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AuthContextProvider>
  )
}
