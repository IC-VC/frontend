import useSns from '@/hooks/useSns'
import { Avatar, Box, Stack, Typography } from '@mui/joy'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const SNSDetails = () => {
  const { snsId } = useParams()

  const { sns } = useSns()

  const currentSns = useMemo(() => {
    return sns?.find((s) => s.canister_ids.root_canister_id === snsId)
  }, [snsId])

  return (
    <Stack>
      <Box>
        <Stack>
          <Avatar src={currentSns?.meta.logo} />
          <Stack>
            <Typography>{currentSns?.meta.name}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

export default SNSDetails
