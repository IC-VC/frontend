import { useEffect, useState } from 'react'
import ProjectDetailsCard from '@/components/ProjectDetailsCard'
import ProjectSidebarForum from '@/components/ProjectSidebarForum'
import ProposalVoteCard from '@/components/ProposalVoteCard'
import useBackend from '@/hooks/useBackend'
import useProject from '@/hooks/useProject'
import { Grid, Stack, Typography } from '@mui/joy'
import { useParams } from 'react-router-dom'
import ProjectSection from '@/components/ProjectSection'
import EvaluationResultTable from '@/components/EvaluationResultTable'

const ProjectCompletion = () => {
  const { projectId } = useParams()

  const [proposalId, setProposalId] = useState<number>()
  const { backendActor } = useBackend()

  const { project, logo, amountRaising, projectStatus, evaluationStepResults } =
    useProject(projectId || '')

  useEffect(() => {
    backendActor
      .getAllProposalsByStepPhase(BigInt(projectId || ''), BigInt(2))
      .then((result) => {
        if ('Ok' in result) {
          setProposalId(Number(result.Ok[0]?.proposal_id))
        }
      })
      .catch(console.log)
  }, [backendActor])

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
        <ProposalVoteCard proposalId={proposalId} phaseId={2} />

        <ProjectSidebarForum />
      </Grid>
      <Grid xs={12} md={8}>
        <Stack mb={2}>
          <ProjectSection>
            <Typography level="title-lg" mb={1}>
              Project Due Diligence Phase Closed
            </Typography>
            <Typography level="body-md" fontWeight="lg">
              The community has completed the evaluation process, awarding this
              project an investment grade of{' '}
              {evaluationStepResults?.avg_result?.toFixed(2) || 0}/10.
            </Typography>
          </ProjectSection>
        </Stack>
        <ProjectSection>
          <Typography level="body-lg" fontWeight="lg">
            Due Diligence Phase Results
          </Typography>
          <EvaluationResultTable gradeResult={evaluationStepResults} />
        </ProjectSection>
      </Grid>
    </Grid>
  )
}

export default ProjectCompletion
