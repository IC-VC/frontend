import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent'

import { idlFactory as idlFactoryRegistry } from '@/idls/defiAggregator.did'
import type {
  Frame,
  _SERVICE as DefiAggregator,
} from '@/idls/defiAggregator.did'

const DEFI_AGGREGATOR_CANISTER_ID = 'u45jl-liaaa-aaaam-abppa-cai'

export interface PriceQuote {
  timestamp: number
  price: number
}

export enum TimeFrame {
  FIVE_MINUTES,
  ONE_HOUR,
  ONE_DAY,
}

interface DefiToken {
  id: number
  symbol: string
}

export interface DefiPair {
  id: number
  deleted: boolean
  tokens: number[]
}

export interface DefiConfig {
  tokens: DefiToken[]
  pairs: DefiPair[]
}

interface LatestExtended {
  volume: number
  symbol: string
}

class DefiClient {
  private defiActor: ActorSubclass<DefiAggregator>
  private defiConfig: DefiConfig | undefined

  constructor(agent: HttpAgent, defiConfig?: DefiConfig) {
    this.defiActor = Actor.createActor(idlFactoryRegistry, {
      canisterId: DEFI_AGGREGATOR_CANISTER_ID,
      agent,
    }) as ActorSubclass<DefiAggregator>
    this.defiConfig = defiConfig
  }

  private getFrame(timeFrame: TimeFrame): { frame: Frame; minutes: number } {
    switch (timeFrame) {
      case TimeFrame.FIVE_MINUTES:
        return { frame: { t5m: null }, minutes: 5 }
      case TimeFrame.ONE_HOUR:
        return { frame: { t1h: null }, minutes: 60 }
      case TimeFrame.ONE_DAY:
        return { frame: { t1d: null }, minutes: 60 * 24 }
    }
  }

  private async fetchPairQuotes(
    pairs: number[],
    startDate: Date,
    endDate: Date,
    frame: Frame,
    tickDurationMinutes: number,
    inverse: boolean
  ): Promise<PriceQuote[]> {
    const pairInfo = await this.defiActor.get_pairs(
      frame,
      pairs.map((id) => BigInt(id)),
      [BigInt(startDate.getTime() * 1000000)],
      [BigInt(endDate.getTime() * 1000000)]
    )

    const startMillis = startDate.getTime()

    if ('ok' in pairInfo) {
      const quotes: PriceQuote[] = pairInfo.ok.data.map((tick, index) => {
        return {
          timestamp: startMillis + index * tickDurationMinutes * 60 * 1000,
          price: tick.reduce((acc, next) => {
            const nextValue = next[0]?.[0]

            if (acc === 0 && nextValue) {
              return inverse ? 1 / nextValue : nextValue
            }

            return acc * (nextValue || 1)
          }, 0),
        }
      })

      return quotes
    }

    return []
  }

  getQuotePair(tokenSymbol: string) {
    const defiToken = this.defiConfig?.tokens.find((defiToken) => {
      if (tokenSymbol === 'ckBTC') return defiToken.symbol === 'BTC'
      return tokenSymbol === defiToken.symbol
    })

    if (!defiToken) return null

    const defiPairs = this.defiConfig?.pairs.filter(
      (pair) => pair.tokens.includes(defiToken.id) && !pair.deleted
    )
    const usdPair = defiPairs?.find((pair) => pair.tokens.includes(0))

    if (usdPair) {
      return { ids: [usdPair.id], inverse: false }
    }

    const icpPair = defiPairs?.find((pair) => pair.tokens.includes(3))
    const icpToUsdPair = this.defiConfig?.pairs.find(
      (pair) => pair.tokens.includes(0) && pair.tokens.includes(3)
    )

    if (icpPair && icpToUsdPair) {
      return {
        ids: [icpPair.id, icpToUsdPair.id],
        inverse: icpPair.tokens.indexOf(3) === 0,
      }
    }
  }

  async fetchQuotes(
    tokenSymbol: string,
    startDate: Date,
    endDate: Date,
    timeFrame: TimeFrame
  ) {
    const pairs = this.getQuotePair(tokenSymbol)

    if (!pairs) {
      return Promise.resolve([])
    }

    const { frame, minutes } = this.getFrame(timeFrame)

    return this.fetchPairQuotes(
      pairs.ids,
      startDate,
      endDate,
      frame,
      minutes,
      pairs.inverse
    )
  }

  async getConfig() {
    const config = await this.defiActor.get_config()

    const tokens = config.tokens.map((token, index) => {
      return { symbol: token.symbol, id: index }
    })

    const pairs: DefiPair[] = config.pairs.map((pair, index) => {
      return {
        id: index,
        tokens: pair.tokens.map((t) => Number(t)),
        deleted: pair.deleted,
      }
    })

    return { tokens, pairs }
  }

  async getLatest() {
    const data = await this.defiActor.get_latest_extended()

    const parsedData: LatestExtended[] = data
      .map((d) => {
        const volume = d.rates.find((rate) => rate.to_token === 0n)?.volume
        return {
          volume: volume || 0,
          symbol: d.config.symbol,
        }
      })
      .filter(Boolean)

    return parsedData
  }
}

export default DefiClient
