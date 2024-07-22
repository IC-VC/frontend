import EvaluationResultTable from '@/components/EvaluationResultTable'
import SnsVoteGrid from '@/components/SnsVoteGrid'
import TeamMemberCard from '@/components/TeamMemberCard'
import useProject from '@/hooks/useProject'
import { Avatar, Chip, Divider, Grid, Sheet, Stack, Typography } from '@mui/joy'
import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ProjectSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      component={Sheet}
      variant="outlined"
      borderRadius={10}
      bgcolor={(theme) => theme.palette.background.body}
      boxShadow="lg"
      p={2}
    >
      {children}
    </Stack>
  )
}

const ProjectDashboard = () => {
  const { projectId } = useParams()

  const { t } = useTranslation()

  const { project, amountRaising, projectStatus, evaluationStepResults, logo } =
    useProject(projectId || '')

  return (
    <Grid container spacing={2} ml={5} mr={5}>
      <Grid xs={4}>
        <Stack
          bgcolor={(theme) => theme.palette.background.body}
          component={Sheet}
          variant="outlined"
          boxShadow="lg"
          borderRadius={10}
          p={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={logo} />
            <Stack>
              <Typography level="h4">{project?.title}</Typography>
              <Typography level="body-md">{project?.moto}</Typography>
            </Stack>
          </Stack>
          <Stack
            mt={5}
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <Stack>
              <Typography level="body-sm">Size of Round</Typography>
              <Typography level="h4" fontWeight="lg">
                {amountRaising?.toLocaleString()} ICP
              </Typography>
            </Stack>
            <Stack>
              <Chip>{t(`projectStatuses.${projectStatus}`)}</Chip>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={8}>
        <Stack spacing={2}>
          <ProjectSection>
            <Typography level="h4">Project Profile</Typography>
            <Divider />
            <Stack mt={2} spacing={1}>
              <Typography level="title-lg" fontWeight="lg">
                Project Description
              </Typography>
              <Typography>{project?.description}</Typography>
            </Stack>
            <Stack mt={2} spacing={1}>
              <Typography level="title-lg" fontWeight="lg">
                Meet the Team
              </Typography>
              <Grid container spacing={1}>
                {project?.team_members.map((tm) => (
                  <Grid xs={6}>
                    <TeamMemberCard teamMember={tm} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </ProjectSection>
          <ProjectSection>
            <Typography level="body-lg" mb={2} fontWeight="lg">
              Application
            </Typography>
            <SnsVoteGrid totalVotes={0} forVotes={0} againstVotes={0} />
          </ProjectSection>
          <ProjectSection>
            <Typography level="body-lg" fontWeight="lg">
              Evaluation
            </Typography>
            <EvaluationResultTable gradeResult={evaluationStepResults} />
          </ProjectSection>
          <ProjectSection>
            <Typography level="body-lg" fontWeight="lg" mb={2}>
              Completion
            </Typography>
            <SnsVoteGrid totalVotes={0} forVotes={0} againstVotes={0} />
          </ProjectSection>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ProjectDashboard
