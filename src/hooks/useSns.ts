import DefiClient, { DefiConfig, TimeFrame } from '@/services/DefiClient'
import SnsAggreator, { SNS } from '@/services/SnsAggregator'
import { HttpAgent } from '@dfinity/agent'
import { addHours } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface TokenPrice {
  symbol: string
  price: number
}

interface TokenPriceChange {
  symbol: string
  priceChange: number
}

const useSns = () => {
  const [sns, setSns] = useState<SNS[]>()
  const [token24hChanges, setToken24hChanges] = useState<TokenPriceChange[]>([])
  const [tokenPrices, setTokenPrices] = useState<TokenPrice[]>([])
  const [defiConfig, setDefiConfig] = useState<DefiConfig>()

  const downloadSnsRecursively = useCallback(async () => {
    const aggregator = new SnsAggreator()

    let hasNextPage = true
    let page = 0
    let sns: SNS[] = []

    while (hasNextPage) {
      try {
        const response = await aggregator.getSnsList(page)
        sns = [...sns, ...response]
        page += 1
      } catch {
        hasNextPage = false
      }
    }

    return sns
  }, [])

  useEffect(() => {
    downloadSnsRecursively()
      .then((sns) => {
        const snsItems = sns.filter((sns) => sns.lifecycle.lifecycle === 3)
        setSns(snsItems)
      })
      .catch(console.log)
  }, [setSns])

  const agent = useMemo(() => {
    return new HttpAgent({ host: import.meta.env.VITE_IC_HOST })
  }, [])

  useEffect(() => {
    const defiClient = new DefiClient(agent)

    defiClient.getConfig().then(setDefiConfig).catch(console.log)
  }, [agent])

  useEffect(() => {
    const defiClient = new DefiClient(agent, defiConfig)

    const now = new Date()

    const pricePromises =
      defiConfig?.tokens?.map(async (token) => {
        const priceNowResponse = await defiClient.fetchQuotes(
          token.symbol,
          now,
          now,
          TimeFrame.ONE_HOUR
        )

        const priceNow = priceNowResponse[0]?.price

        if (!priceNow) return {}

        return { symbol: token.symbol, price: priceNow }
      }) || []

    Promise.all(pricePromises)
      .then((prices) => {
        if (prices.length > 0) setTokenPrices(prices)
      })
      .catch(console.log)
  }, [defiConfig, agent])

  useEffect(() => {
    if (tokenPrices.length < 0 || !defiConfig) return
    const defiClient = new DefiClient(agent, defiConfig)

    const dayAgo = addHours(Date.now(), -24)

    const promises = tokenPrices.map(async (price) => {
      const priceDayAgoResponse = await defiClient.fetchQuotes(
        price.symbol,
        dayAgo,
        dayAgo,
        TimeFrame.FIVE_MINUTES
      )

      const priceDayAgo = priceDayAgoResponse[0]?.price

      if (!priceDayAgo) return {}

      const priceChange =
        (((price.price as number) - priceDayAgo) / priceDayAgo) * 100

      return { symbol: price.symbol, priceChange }
    })

    Promise.all(promises).then(setToken24hChanges).catch(console.log)
  }, [tokenPrices, defiConfig])

  return { sns, token24hChanges, tokenPrices }
}

export default useSns
