import StepSubmission from '@/components/StepSubmission'
import useProject from '@/hooks/useProject'
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import { useParams } from 'react-router-dom'
import useProposal from '@/hooks/useProposal'
import { useCallback, useEffect, useMemo } from 'react'
import { SNS_FORUMS } from '@/utils/forumConfig'
import ProjectSidebarForum from '@/components/ProjectSidebarForum'
import ProjectDetailsCard from '@/components/ProjectDetailsCard'

const FIELDS = [
  'ICVC_QUESTION_0_0_0',
  'ICVC_QUESTION_0_0_1',
  'ICVC_QUESTION_0_0_2',
  'ICVC_QUESTION_0_0_3',
  'ICVC_QUESTION_0_0_4',
]

const ProjectApplication = () => {
  const { projectId } = useParams()

  const {
    project,
    logo,
    amountRaising,
    projectDetails,
    step0ProposalId,
    projectStatus,
  } = useProject(projectId || '')
  const { results } = useProposal(step0ProposalId)

  const progress = useMemo(() => {
    if (!results) return 0

    return (results.yes / results.totalVotingPower) * 100
  }, [results])

  const onVoteClick = useCallback(() => {
    window.open(
      `https://nns.ic0.app/proposal/?u=nuywj-oaaaa-aaaaq-aadta-cai&proposal=${step0ProposalId}`,
      '_blank'
    )
  }, [step0ProposalId])

  return (
    <Grid container spacing={2} ml={5} mr={5}>
      <Grid xs={12} md={4}>
        <ProjectDetailsCard
          title={project?.title}
          moto={project?.moto}
          logo={logo}
          amountRaising={amountRaising}
          projectStatus={projectStatus}
        />
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
            <Typography level="h3">Round 1 Vote</Typography>
            <Typography>SNS Vote</Typography>
          </Box>

          <Typography fontSize={18}>
            This is an vote to move this project to Due Dilligence phase or
            reject the invesment opportunity
          </Typography>
          <LinearProgress
            determinate
            size="lg"
            value={progress}
            color="success"
          />
          <Button onClick={onVoteClick}>Participate in SNS vote</Button>
        </Stack>

        <ProjectSidebarForum />
      </Grid>
      <Grid xs={12} md={8}>
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
