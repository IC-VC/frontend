import StepSubmission from '@/components/StepSubmission'
import useProject from '@/hooks/useProject'
import { Grid } from '@mui/joy'
import { useParams } from 'react-router-dom'
import ProjectSidebarForum from '@/components/ProjectSidebarForum'
import ProjectDetailsCard from '@/components/ProjectDetailsCard'
import ProposalVoteCard from '@/components/ProposalVoteCard'

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
        <ProposalVoteCard proposalId={step0ProposalId} phaseId={0} />

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
