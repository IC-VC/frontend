import { FC, PropsWithChildren, createContext, useMemo } from 'react'
import useSession from '@/hooks/useSession'

import { idlFactory as backendIdl } from '@/idls/backend.did'
import type { _SERVICE as BackendActor } from '@/idls/backend.did'

import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent'

interface BackendContextType {
  backendActor: ActorSubclass<BackendActor>
}

export const BackendContext = createContext<BackendContextType>(null as any)

const BackendProvider: FC<PropsWithChildren> = ({ children }) => {
  const { identity } = useSession()

  const backendActor = useMemo(() => {
    const agent = new HttpAgent({
      host: import.meta.env.VITE_IC_HOST,
      identity,
    })

    if (import.meta.env.VITE_IC_HOST !== 'https://icp0.io') {
      agent.fetchRootKey().catch(console.log)
    }

    return Actor.createActor(backendIdl, {
      agent,
      canisterId: import.meta.env.VITE_BACKEND_CANISTER_ID,
    }) as ActorSubclass<BackendActor>
  }, [identity])

  return (
    <BackendContext.Provider value={{ backendActor }}>
      {children}
    </BackendContext.Provider>
  )
}

export default BackendProvider
