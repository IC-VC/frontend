import { Sheet, Stack, Typography } from '@mui/joy'
import { FC } from 'react'

interface Props {
  totalVotes?: number
  forVotes?: number
  againstVotes?: number
}

const SnsVoteGrid: FC<Props> = ({ totalVotes, forVotes, againstVotes }) => {
  const renderVoteCard = (title: string, voteCount: string) => (
    <Stack
      component={Sheet}
      variant="outlined"
      borderRadius={10}
      flex={1}
      bgcolor={(theme) => theme.palette.background.body}
      p={2}
    >
      <Typography level="body-lg">{title}</Typography>
      <Typography mt={1} level="h3" fontWeight="lg">
        {voteCount}
      </Typography>
    </Stack>
  )

  return (
    <Stack direction="row" spacing={2} flex={1}>
      {renderVoteCard(
        '"Yes" votes',
        forVotes ? `${((forVotes / totalVotes) * 100).toFixed(2)} %` : '-'
      )}
      {renderVoteCard(
        '"No" votes',
        againstVotes
          ? `${((againstVotes / totalVotes) * 100).toFixed(2)} %`
          : '-'
      )}
    </Stack>
  )
}

export default SnsVoteGrid
