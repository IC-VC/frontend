import PageTitleBar from '@/components/PageTitleBar'
import ProjectCreatorStepper from '@/components/ProjectCreatorStepper'
import ProjectStageCard from '@/components/ProjectStageCard'
import useProject from '@/hooks/useProject'
import { StepStatus } from '@/interfaces/project'
import { ROUTES } from '@/utils/routes'
import { Grid, Stack, Typography } from '@mui/joy'
import { Outlet, useParams } from 'react-router-dom'

const ProjectManager = () => {
  const { projectId } = useParams()

  const { getStepState } = useProject(projectId)

  return (
    <Stack>
      <PageTitleBar
        title={projectId ? 'Manage Your Project' : 'Add New Project'}
        subtitle="Begin your project funding application"
      />
      <Grid container>
        <Grid xs={3} />
        <Grid xs={8}>
          <Stack direction="row" spacing={2} pt={3} pb={3}>
            <ProjectStageCard
              stageName="Project Creation"
              subtitle="Get started by registering a project"
              path={
                projectId
                  ? ROUTES.PROJECTS_EDIT(projectId)
                  : ROUTES.PROJECTS_NEW
              }
            />
            <ProjectStageCard
              stageName="Application"
              subtitle="Submit a project overview"
              path={ROUTES.PROJECTS_PHASE_SECTION_FORM(projectId, '0', '0')}
              disabled={!projectId || getStepState(1) === StepStatus.NotStarted}
            />
            <ProjectStageCard
              stageName="Due Diligence"
              subtitle="Provide full project details for due diligence and final voting"
              path={ROUTES.PROJECTS_PHASE_SECTION_FORM(projectId, '1', '0')}
              disabled={!projectId || getStepState(2) === StepStatus.NotStarted}
            />
            <ProjectStageCard
              stageName="Completion Phase"
              subtitle="Access legal documentation and receive funds"
              disabled={!projectId || getStepState(3) === StepStatus.NotStarted}
            />
          </Stack>
        </Grid>
      </Grid>

      <Outlet />
    </Stack>
  )
}

export default ProjectManager
