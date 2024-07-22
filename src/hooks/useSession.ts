import { useContext } from 'react'
import { SessionContext } from '../providers/SessionProvider'

export default function useSession() {
  return useContext(SessionContext)
}
