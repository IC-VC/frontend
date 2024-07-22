import EvaluationTab from '@/components/EvaluationTab'
import StepSubmission from '@/components/StepSubmission'
import StepVoteCard from '@/components/StepVoteCard'
import useBackend from '@/hooks/useBackend'
import { Step } from '@/idls/backend.did'
import { EVALUATION_SECTIONS } from '@/utils/formConfig'
import { Grid, Sheet, Stack, Tab, TabList, Tabs, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ProjectEvaluation = () => {
  const { projectId } = useParams()

  const [currentStep, setCurrentStep] = useState(0)
  const { backendActor } = useBackend()
  const [step, setStep] = useState<Step>()

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
      <Grid xs={4}>
        <StepVoteCard currentStep={currentStep} />
      </Grid>
      <Grid xs={8}>
        <EvaluationTab
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        {step && (
          <StepSubmission
            step={step}
            fields={EVALUATION_SECTIONS[currentStep].questions.map((q) => q.id)}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default ProjectEvaluation
