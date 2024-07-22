import { Sheet, Stack, Typography } from '@mui/joy'
import { FC } from 'react'

interface Props {
  totalVotes: number
  forVotes: number
  againstVotes: number
}

const SnsVoteGrid: FC<Props> = ({ totalVotes, forVotes, againstVotes }) => {
  const renderVoteCard = (title: string, voteCount: number) => (
    <Stack
      component={Sheet}
      variant="outlined"
      borderRadius={10}
      flex={1}
      bgcolor={(theme) => theme.palette.background.body}
      p={2}
    >
      <Typography level="body-lg">{title}</Typography>
      <Typography level="body-lg" fontWeight="lg">
        {voteCount}
      </Typography>
    </Stack>
  )

  return (
    <Stack direction="row" spacing={2} flex={1}>
      {renderVoteCard('Total Votes', totalVotes)}
      {renderVoteCard('"Yes" votes', forVotes)}
      {renderVoteCard('"No" votes', againstVotes)}
    </Stack>
  )
}

export default SnsVoteGrid
