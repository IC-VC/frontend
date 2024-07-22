import StepSubmission from '@/components/StepSubmission'
import useProject from '@/hooks/useProject'
import {
  Grid,
  LinearProgress,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from '@mui/joy'
import { useParams } from 'react-router-dom'

import VoteDown from '@/assets/vote-down.svg'
import VoteFor from '@/assets/vote-for.svg'

const FIELDS = [
  'ICVC_QUESTION_0_0_0',
  'ICVC_QUESTION_0_0_1',
  'ICVC_QUESTION_0_0_2',
  'ICVC_QUESTION_0_0_3',
  'ICVC_QUESTION_0_0_4',
]

const ProjectApplication = () => {
  const { projectId } = useParams()
  const { palette } = useTheme()

  const { project, projectDetails, submissionStepResults, amountRaising } =
    useProject(projectId || '')

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
          <LinearProgress determinate size="lg" value={55} color="success" />
          <Stack direction="row" justifyContent="space-between">
            <img src={VoteFor} height={50} width={50} />
            <img src={VoteDown} height={50} width={50} />
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={8}>
        {projectDetails && (
          <StepSubmission step={projectDetails} fields={FIELDS} />
        )}
      </Grid>
    </Grid>
  )
}

export default ProjectApplication
