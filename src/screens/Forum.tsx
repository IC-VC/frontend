import { Grid, Sheet, Stack } from '@mui/joy'
import React from 'react'

const SNS_FORUMS = [
  {
    id: 'ICVC',
    logo: 'https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io/v1/sns/root/nuywj-oaaaa-aaaaq-aadta-cai/logo.png',
    channels: [{ title: 'Channel 1', id: '' }],
  },
  {
    id: 'ICVC1',
    logo: 'https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io/v1/sns/root/nuywj-oaaaa-aaaaq-aadta-cai/logo.png',
    channels: [{ title: 'Channel 1', id: '' }],
  },
  {
    id: 'ICVC2',
    logo: 'https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io/v1/sns/root/nuywj-oaaaa-aaaaq-aadta-cai/logo.png',
    channels: [{ title: 'Channel 1', id: '' }],
  },
  {
    id: 'ICVC3',
    logo: 'https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io/v1/sns/root/nuywj-oaaaa-aaaaq-aadta-cai/logo.png',
    channels: [{ title: 'Channel 1', id: '' }],
  },
]

const Forum = () => {
  return (
    <Stack>
      <Grid
        container
        borderBottom={2}
        color={(theme) => theme.palette.border.primary}
        mb={3}
        pl={5}
        pr={5}
      >
        <Grid
          xs={0.5}
          borderRight={2}
          color={(theme) => theme.palette.border.primary}
        >
          <Stack spacing={2}>
            {SNS_FORUMS.map((forum) => (
              <Stack>
                <img src={forum.logo} width={30} height={30} />
              </Stack>
            ))}
          </Stack>
        </Grid>
        <Grid></Grid>
      </Grid>
    </Stack>
  )
}

export default Forum
