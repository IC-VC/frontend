import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { idlFactory } from '@/idls/governance.did'
import type { _SERVICE as GovernanceActor } from '@/idls/governance.did'

interface VoteResults {
  yes: number
  no: number
  totalVotingPower: number
}

const useProposal = (proposalId?: number) => {
  const [results, setResults] = useState<VoteResults>()

  const [governanceActor, setGovernanceActor] =
    useState<ActorSubclass<GovernanceActor>>()

  const createGovernanceActor = useCallback(async () => {
    const agent = new HttpAgent({
      host: import.meta.env.VITE_IC_HOST,
    })

    if (import.meta.env.VITE_IC_HOST !== 'https://icp0.io') {
      await agent.fetchRootKey()
    }

    return Actor.createActor(idlFactory, {
      agent,
      canisterId: import.meta.env.VITE_GOVERNANCE_CANISTER_ID,
    }) as ActorSubclass<GovernanceActor>
  }, [])

  useEffect(() => {
    createGovernanceActor().then(setGovernanceActor).catch(console.log)
  }, [createGovernanceActor])

  useEffect(() => {
    if (!proposalId || !governanceActor) return

    governanceActor
      .get_proposal({ proposal_id: [{ id: BigInt(proposalId) }] })
      .then((res) => {
        const proposal = res.result[0]
        if (!proposal) return

        if ('Proposal' in proposal) {
          const latestTally = proposal.Proposal.latest_tally[0]
          if (latestTally) {
            const { no, yes, total } = latestTally

            setResults({
              yes: Number(yes),
              no: Number(no),
              totalVotingPower: Number(total),
            })
          }
        }
      })
      .catch(console.log)
  }, [proposalId, governanceActor])

  return {
    results,
  }
}

export default useProposal
