import EvaluationTab from '@/components/EvaluationTab'
import ProjectDetailsCard from '@/components/ProjectDetailsCard'
import ProjectSidebarForum from '@/components/ProjectSidebarForum'
import StepSubmission from '@/components/StepSubmission'
import StepVoteCard from '@/components/StepVoteCard'
import useBackend from '@/hooks/useBackend'
import useProject from '@/hooks/useProject'
import { Step } from '@/idls/backend.did'
import { EVALUATION_SECTIONS } from '@/utils/formConfig'
import { Grid, Stack } from '@mui/joy'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProjectEvaluation = () => {
  const { projectId } = useParams()

  const [currentStep, setCurrentStep] = useState(0)
  const { backendActor } = useBackend()
  const [step, setStep] = useState<Step>()

  const { project, logo, amountRaising, projectStatus, projectStepPhases } =
    useProject(projectId)

  useEffect(() => {
    backendActor
      .getStepById(BigInt(projectId || ''), BigInt(1), BigInt(currentStep))
      .then((stepResult) => {
        if ('Ok' in stepResult) setStep(stepResult.Ok)
      })
      .catch(console.log)
  }, [backendActor, projectId, currentStep])

  return (
    <Grid container spacing={2} ml={5} mr={5}>
      <Grid xs={12} md={4}>
        <Stack spacing={2}>
          <ProjectDetailsCard
            title={project?.title}
            moto={project?.moto}
            logo={logo}
            amountRaising={amountRaising}
            projectStatus={projectStatus}
          />
          <StepVoteCard
            currentStep={currentStep}
            endDate={projectStepPhases?.[1]?.evaluationEndDate}
          />
        </Stack>
        <ProjectSidebarForum />
      </Grid>
      <Grid xs={12} md={8}>
        <EvaluationTab
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        {step && (
          <StepSubmission
            step={step}
            fields={EVALUATION_SECTIONS[currentStep].questions}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default ProjectEvaluation
