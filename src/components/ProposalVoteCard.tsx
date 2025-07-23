import useProposal from '@/hooks/useProposal'
import { Box, Button, LinearProgress, Sheet, Stack, Typography } from '@mui/joy'
import { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  proposalId?: number
  phaseId: number
}

const ProposalVoteCard: FC<Props> = ({ proposalId, phaseId }) => {
  const { results } = useProposal(proposalId)
  const { t } = useTranslation()

  const progress = useMemo(() => {
    if (!results) return 0

    return (results.yes / results.totalVotingPower) * 100
  }, [results])

  const onVoteClick = useCallback(() => {
    window.open(
      `https://nns.ic0.app/proposal/?u=nuywj-oaaaa-aaaaq-aadta-cai&proposal=${proposalId}`,
      '_blank'
    )
  }, [proposalId])

  return (
    <Stack
      component={Sheet}
      variant="outlined"
      boxShadow="lg"
      borderRadius={10}
      p={2}
      spacing={3}
      mt={2}
    >
      <Box>
        <Typography level="h3">Round {phaseId + 1} Vote</Typography>
        <Typography>SNS Vote</Typography>
      </Box>

      <Typography fontSize={18}>
        {t(`snsVoteCard.phases.${phaseId}`)}
      </Typography>
      <LinearProgress determinate size="lg" value={progress} color="success" />
      <Button onClick={onVoteClick}>Participate in SNS vote</Button>
    </Stack>
  )
}

export default ProposalVoteCard
