import EvaluationResultTable from '@/components/EvaluationResultTable'
import LinksView from '@/components/LinksView'
import ProjectDetailsCard from '@/components/ProjectDetailsCard'
import ProjectSection from '@/components/ProjectSection'
import ProjectSidebarForum from '@/components/ProjectSidebarForum'
import SnsVoteGrid from '@/components/SnsVoteGrid'
import TeamMemberCard from '@/components/TeamMemberCard'
import useProject from '@/hooks/useProject'
import useProposal from '@/hooks/useProposal'
import { Divider, Grid, Stack, Typography } from '@mui/joy'
import { useParams } from 'react-router-dom'

const ProjectDashboard = () => {
  const { projectId } = useParams()

  const {
    project,
    amountRaising,
    projectStatus,
    evaluationStepResults,
    logo,
    step0ProposalId,
    userGrades,
  } = useProject(projectId || '')

  const { results } = useProposal(step0ProposalId)

  return (
    <Grid container spacing={2} ml={5} mr={5}>
      <Grid xs={12} md={4}>
        <ProjectDetailsCard
          logo={logo}
          title={project?.title}
          moto={project?.moto}
          amountRaising={amountRaising}
          projectStatus={projectStatus}
        />
        <ProjectSidebarForum />
      </Grid>
      <Grid xs={12} md={8}>
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

            <Stack mt={1} spacing={1}>
              <Typography level="title-md" fontWeight="lg">
                Connect with {project?.title}
              </Typography>
              <LinksView links={project?.links || []} />
            </Stack>

            <Stack mt={3} spacing={1}>
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
            <SnsVoteGrid
              totalVotes={results?.totalVotingPower || 0}
              forVotes={results?.yes || 0}
              againstVotes={results?.no || 0}
            />
          </ProjectSection>
          <ProjectSection>
            <Typography level="body-lg" fontWeight="lg">
              Evaluation
            </Typography>
            <EvaluationResultTable
              gradeResult={evaluationStepResults}
              userGrades={userGrades}
            />
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
