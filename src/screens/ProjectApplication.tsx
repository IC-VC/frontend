import StepSubmission from '@/components/StepSubmission'
import useProject from '@/hooks/useProject'
import { Grid, LinearProgress, Sheet, Stack, Typography } from '@mui/joy'
import { useParams } from 'react-router-dom'

import VoteDown from '@/assets/vote-down.svg'
import VoteFor from '@/assets/vote-for.svg'
import useProposal from '@/hooks/useProposal'
import { useCallback, useMemo } from 'react'

const FIELDS = [
  'ICVC_QUESTION_0_0_0',
  'ICVC_QUESTION_0_0_1',
  'ICVC_QUESTION_0_0_2',
  'ICVC_QUESTION_0_0_3',
  'ICVC_QUESTION_0_0_4',
]

const ProjectApplication = () => {
  const { projectId } = useParams()

  const { projectDetails, step0ProposalId } = useProject(projectId || '')
  const { results } = useProposal(step0ProposalId)

  const progress = useMemo(() => {
    if (!results) return 0

    return (results.yes / (results.yes + results.no)) * 100
  }, [results])

  const onVoteClick = useCallback(() => {
    window.open(
      `https://nns.ic0.app/proposal/?u=nuywj-oaaaa-aaaaq-aadta-cai&proposal=${step0ProposalId}`,
      '_blank'
    )
  }, [step0ProposalId])

  return (
    <Grid container spacing={2} ml={5} mr={5}>
      <Grid xs={4}>
        <Stack
          component={Sheet}
          variant="outlined"
          boxShadow="lg"
          borderRadius={10}
          p={2}
          spacing={3}
        >
          <Typography level="h4">Round 1 Vote</Typography>
          <Typography>
            This is an SNS vote to move this project to Due Dilligence phase or
            reject the invesment opportunity
          </Typography>
          <LinearProgress
            determinate
            size="lg"
            value={progress}
            color="success"
          />
          <Stack direction="row" justifyContent="space-between">
            <img src={VoteFor} height={50} width={50} onClick={onVoteClick} />
            <img src={VoteDown} height={50} width={50} onClick={onVoteClick} />
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={8}>
        {projectDetails && (
          <StepSubmission
            step={projectDetails}
            fields={FIELDS.map((f) => ({ id: f }))}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default ProjectApplication
