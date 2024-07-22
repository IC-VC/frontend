import { FC, PropsWithChildren } from 'react'
import useSession from '../hooks/useSession'
import { ROUTES } from '../utils/routes'
import Login from '@/screens/Login'

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { identity } = useSession()

  if (!identity) {
    return <Login />
  }

  return children
}

export default ProtectedRoute
