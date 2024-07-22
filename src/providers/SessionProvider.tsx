import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { AnonymousIdentity, Identity } from '@dfinity/agent'

interface SessionContextType {
  identity?: Identity
  login: () => Promise<void>
  logout: () => Promise<void>
  authInProgress: boolean
}

export const SessionContext = createContext<SessionContextType>(null as any)

const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [identity, setIdentity] = useState<Identity>()
  const [authInProgress, setAuthInProgress] = useState(false)

  useEffect(() => {
    setAuthInProgress(true)
    AuthClient.create()
      .then((client) => {
        return client.getIdentity()
      })
      .then((identity) => {
        if (
          new AnonymousIdentity().getPrincipal().toString() !==
          identity.getPrincipal().toString()
        ) {
          setIdentity(identity)
        }
      })
      .finally(() => {
        setAuthInProgress(false)
      })
  }, [])

  const login = useCallback(async () => {
    setAuthInProgress(true)

    let authClient = await AuthClient.create()

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: import.meta.env.VITE_II_HOST,
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        onSuccess: resolve,
        onError: () => setAuthInProgress(false),
      })
    })

    const newIdentity = authClient.getIdentity()
    setIdentity(newIdentity)
  }, [setIdentity])

  const logout = useCallback(async () => {
    let authClient = await AuthClient.create()
    await authClient.logout()
    setIdentity(undefined)
    setAuthInProgress(false)
  }, [])

  const value = useMemo(() => {
    return { identity, login, logout, authInProgress }
  }, [identity, login, logout, authInProgress])

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export default SessionProvider
