import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { HttpAgent } from '@dfinity/agent'

interface SessionContextType {
  agent?: HttpAgent
  login: () => Promise<void>
  logout: () => Promise<void>
  authInProgress: boolean
  isLoggedIn: boolean
}

const ICVC_LEDGER = 'm6xut-mqaaa-aaaaq-aadua-cai'

export const SessionContext = createContext<SessionContextType>(null as any)

const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [agent, setAgent] = useState<HttpAgent>()
  const [authInProgress, setAuthInProgress] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuth = useCallback(async () => {
    if (!window.ic?.plug) return

    const isConnected = await window.ic.plug.isConnected()
    setIsLoggedIn(isConnected)

    if (isConnected) {
      setAgent(window.ic.plug.agent)
    } else {
      const agent = new HttpAgent({ host: import.meta.env.VITE_IC_HOST })
      setAgent(agent)
    }
  }, [])

  useEffect(() => {
    setAuthInProgress(true)
    checkAuth()
      .catch(console.log)
      .finally(() => setAuthInProgress(false))
  }, [])

  const login = useCallback(async () => {
    if (!window.ic?.plug) {
      alert('Plug Wallet not installed!')
      return
    }
    await window.ic.plug.requestConnect({ whitelist: [import.meta.env.VITE_BACKEND_CANISTER_ID, ICVC_LEDGER] })
    setIsLoggedIn(true)
    setAgent(window.ic.plug.agent)
  }, [setAgent])

  const logout = useCallback(async () => {
    await window.ic.plug.disconnect()
    setIsLoggedIn(false)
    setAgent(new HttpAgent({ host: import.meta.env.VITE_IC_HOST }))
  }, [])

  const value = useMemo(() => {
    return { agent, login, logout, authInProgress, isLoggedIn }
  }, [agent, login, logout, authInProgress, isLoggedIn])

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export default SessionProvider
