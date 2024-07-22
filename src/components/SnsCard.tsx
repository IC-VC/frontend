import { TokenPrice } from '@/hooks/useSns'
import { SNS } from '@/services/SnsAggregator'
import {
  Box,
  Card,
  Divider,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from '@mui/joy'
import { FC, useCallback, useEffect, useState } from 'react'
import { LineChart } from './LineChart'
import { HttpAgent } from '@dfinity/agent'
import DefiClient, { TimeFrame } from '@/services/DefiClient'
import { addDays } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/utils/routes'

interface Props {
  sns: SNS
  price?: TokenPrice
  priceChange?: number
}

const SnsCard: FC<Props> = ({ sns, price, priceChange }) => {
  const [chartPoints, setChartPoints] = useState([])
  const { palette } = useTheme()

  const navigate = useNavigate()

  const ticker = sns.icrc1_metadata.find(
    (meta) => meta[0] === 'icrc1:symbol'
  )?.[1]?.Text

  const getQuotes = useCallback(async () => {
    const agent = new HttpAgent({ host: import.meta.env.VITE_IC_HOST })
    const defiClient1 = new DefiClient(agent)
    const config = await defiClient1.getConfig()

    const defiClient2 = new DefiClient(agent, config)

    const quotes = await defiClient2.fetchQuotes(
      ticker,
      addDays(new Date(), -7),
      new Date(),
      TimeFrame.ONE_DAY
    )

    return quotes
  }, [])

  useEffect(() => {
    getQuotes().then(setChartPoints).catch(console.log)
  }, [ticker])

  return (
    <Stack
      component={Sheet}
      variant="outlined"
      boxShadow="lg"
      borderRadius={10}
      p={2}
      // onClick={() =>
      //   navigate(ROUTES.SNS_TERMINAL_PROJECT(sns.canister_ids.root_canister_id))
      // }
    >
      <Stack direction="row" spacing={1} mb={1}>
        <img
          src={`https://3r4gx-wqaaa-aaaaq-aaaia-cai.raw.icp0.io${sns.meta.logo}`}
          width={50}
          height={50}
          style={{ borderRadius: 25, overflow: 'hidden' }}
        />
        <Stack>
          <Typography level="h4">{sns.meta.name}</Typography>
          <Typography level="body-md">{ticker}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack pt={2} pb={2}>
        <Typography
          position="absolute"
          level="h4"
          textColor={
            priceChange > 0 ? palette.success[400] : palette.danger[400]
          }
        >
          {priceChange?.toFixed(2)}%
        </Typography>
        <Box ml={10} mt={3}>
          {chartPoints.length > 0 && (
            <LineChart
              paddingY={10}
              height={50}
              width={300}
              data={chartPoints}
              onMouseMove={console.log}
            />
          )}
        </Box>
      </Stack>
      <Divider />
      <Stack mt={1} direction="row" justifyContent="space-between">
        <Stack>
          <Typography level="body-md" fontWeight="bold">
            Price
          </Typography>
          <Typography level="body-sm">${price?.price.toFixed(5)}</Typography>
        </Stack>
        <Stack>
          <Typography level="body-md" fontWeight="bold">
            24h Volume
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SnsCard
