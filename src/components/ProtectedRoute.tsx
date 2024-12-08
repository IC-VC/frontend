import { FC, PropsWithChildren } from 'react'
import useSession from '../hooks/useSession'
import Login from '@/screens/Login'

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useSession()

  if (!isLoggedIn) {
    return <Login />
  }

  return children
}

export default ProtectedRoute
