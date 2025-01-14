import React, { useMemo } from 'react'
import PageTitleBar from '../components/PageTitleBar'
import useSns from '@/hooks/useSns'
import { Box, Grid, Stack, Typography } from '@mui/joy'
import { SNS } from '@/services/SnsAggregator'

import './SnsTerminal.css'
import SnsCard from '@/components/SnsCard'

const EXCLUDED_SNS = ['KINIC', 'SEER', '---']

const SnsTerminal = () => {
  const { sns, token24hChanges, tokenPrices } = useSns()

  const filteredSns = useMemo(() => {
    return sns?.filter((sns) => {
      const ticker = sns.icrc1_metadata.find(
        (meta) => meta[0] === 'icrc1:symbol'
      )?.[1]?.Text

      return !EXCLUDED_SNS.includes(ticker)
    })
  }, [sns])

  const renderSnsTokenTile = (sns: SNS) => {
    const ticker = sns.icrc1_metadata.find(
      (meta) => meta[0] === 'icrc1:symbol'
    )?.[1]?.Text
    const price = tokenPrices.find((price) => price.symbol === ticker)?.price
    const priceChange = token24hChanges.find(
      (price) => price.symbol === ticker
    )?.priceChange

    return (
      <Stack
        direction="row"
        spacing={0.5}
        alignContent="center"
        alignItems="center"
        bgcolor={(theme) => theme.palette.background.body}
        p={0.5}
        borderRadius={10}
      >
        <img
          src={`https://3r4gx-wqaaa-aaaaq-aaaia-cai.raw.icp0.io${sns.meta.logo}`}
          width={30}
          height={30}
          style={{ borderRadius: 30, overflow: 'hidden' }}
        />
        <Typography>{ticker}</Typography>
        <Typography level="body-sm">{price?.toFixed(2)}</Typography>
        <Typography level="body-sm">{priceChange?.toFixed(2)}%</Typography>
      </Stack>
    )
  }

  const renderSnsTokenCard = (sns: SNS) => {
    const ticker = sns.icrc1_metadata.find(
      (meta) => meta[0] === 'icrc1:symbol'
    )?.[1]?.Text
    const price = tokenPrices.find((price) => price.symbol === ticker)
    const priceChange = token24hChanges.find(
      (price) => price.symbol === ticker
    )?.priceChange

    return (
      <Grid xs={4}>
        <SnsCard sns={sns} price={price} priceChange={priceChange} />
      </Grid>
    )
  }

  return (
    <Stack flex={1}>
      <PageTitleBar
        title="SNS Terminal"
        subtitle="Tool on ICP for real-time data, news and analytics"
      />
      <Box
        overflow="hidden"
        bgcolor={(theme) => theme.palette.background.level1}
      >
        <Stack
          direction="row"
          spacing={2}
          pt={1}
          pb={1}
          flex={1}
          className="hmove"
        >
          {sns?.map(renderSnsTokenTile)}
        </Stack>
      </Box>
      <Grid container>
        <Grid xs={1} />
        <Grid xs={10}>
          <Box>
            <Grid container spacing={2} pr={3} mt={2}>
              {filteredSns?.map(renderSnsTokenCard)}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default SnsTerminal
