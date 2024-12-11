import { FC, PropsWithChildren } from 'react'
import Login from '@/screens/Login'
import { useAuth } from '@nfid/identitykit/react'

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return children
}

export default ProtectedRoute
