import { FC, PropsWithChildren, createContext, useMemo } from 'react'

import { idlFactory as backendIdl } from '@/idls/backend.did'
import type { _SERVICE as BackendActor } from '@/idls/backend.did'

import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent'
import { useAgent } from '@nfid/identitykit/react'

interface BackendContextType {
  backendActor: ActorSubclass<BackendActor>
}

export const BackendContext = createContext<BackendContextType>(null as any)

const BackendProvider: FC<PropsWithChildren> = ({ children }) => {
  const agent = useAgent()

  const backendActor = useMemo(() => {
    return Actor.createActor(backendIdl, {
      agent:
        agent || HttpAgent.createSync({ host: import.meta.env.VITE_IC_HOST }),
      canisterId: import.meta.env.VITE_BACKEND_CANISTER_ID,
    }) as ActorSubclass<BackendActor>
  }, [agent])

  return (
    <BackendContext.Provider value={{ backendActor }}>
      {children}
    </BackendContext.Provider>
  )
}

export default BackendProvider
