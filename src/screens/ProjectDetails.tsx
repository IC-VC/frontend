import ProjectStageCard from '@/components/ProjectStageCard'
import useProject from '@/hooks/useProject'
import { ROUTES } from '@/utils/routes'
import { Breadcrumbs, Grid, Link, Stack, Typography, useTheme } from '@mui/joy'
import { ArrowLeftIcon } from 'lucide-react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

const ProjectDetails = () => {
  const { projectId } = useParams()
  const { getStepState } = useProject(projectId || '')

  const { palette } = useTheme()

  const navigate = useNavigate()

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
        <Grid xs={3}>
          <Stack justifyContent="space-between" mt={2} mb={2}>
            <Breadcrumbs>
              <Link color="neutral" href="/projects">
                Explore
              </Link>
              <Link color="neutral">Project Details</Link>
            </Breadcrumbs>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              onClick={() => navigate(ROUTES.PROJECTS_INDEX)}
              pl={1}
            >
              <ArrowLeftIcon color={palette.text.primary} size={30} />
              <Typography fontSize={18}>Back to Explore</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={9}>
          <Stack direction="row" spacing={2} pt={3} pb={3} pr={1}>
            <ProjectStageCard
              stageName="Dashboard"
              subtitle="Project Summary"
              path={ROUTES.PROJECTS_SHOW_DASHBOARD(projectId || '')}
            />
            <ProjectStageCard
              stageName="Round 1"
              subtitle="Project Submission"
              stageStatus={getStepState(1)}
              path={ROUTES.PROJECTS_SHOW_APPLICATION(projectId || '')}
            />
            <ProjectStageCard
              stageName="Round 2"
              subtitle="Grading"
              stageStatus={getStepState(2)}
              path={ROUTES.PROJECTS_SHOW_EVALUATION(projectId || '')}
            />
            <ProjectStageCard
              stageName="Round 3"
              subtitle="Completion"
              stageStatus={getStepState(3)}
            />
          </Stack>
        </Grid>
      </Grid>
      <Outlet />
    </Stack>
  )
}

export default ProjectDetails
