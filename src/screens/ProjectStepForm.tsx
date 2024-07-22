import { useCallback, useEffect, useMemo, useState } from 'react'
import FormField from '@/components/FormField'
import useBackend from '@/hooks/useBackend'
import {
  CheckBoxSubmission,
  DecimalSubmission,
  QuestionSubmission,
  UploadFile,
} from '@/idls/backend.did'
import { APPLICATION_SECTIONS, EVALUATION_SECTIONS } from '@/utils/formConfig'
import { Box, Button, Grid, Stack } from '@mui/joy'
import { Formik, FormikValues } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import EvaluationTab from '@/components/EvaluationTab'
import useProject from '@/hooks/useProject'
import PhaseEventCard from '@/components/PhaseEventCard'
import * as Yup from 'yup'
import { StepStatus } from '@/interfaces/project'

const ProjectStepForm = () => {
  const { projectId, phaseId } = useParams()
  const [initValues, setInitValues] = useState()
  const { backendActor } = useBackend()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)
  const [phaseSubmitLoading, setPhaseSubmitLoading] = useState(false)

  const navigate = useNavigate()

  const { projectStepPhases } = useProject(projectId || '')

  const currentPhase = useMemo(() => {
    const phase = parseInt(phaseId || '')
    if (projectStepPhases.length < phase + 1) return

    return projectStepPhases[phase]
  }, [projectStepPhases, phaseId])

  const canEdit = useMemo(() => {
    return [StepStatus.Open, StepStatus.NotStarted].includes(
      currentPhase?.state
    )
  }, [currentPhase])

  useEffect(() => {
    backendActor
      .getStepById(BigInt(projectId || ''), BigInt(phaseId || ''), BigInt(step))
      .then((response) => {
        let responses = {}
        if ('Ok' in response) {
          response.Ok.question_submission.forEach((submission) => {
            responses[submission.id] = submission.response[0]
          })

          response.Ok.checkbox_submission.forEach((submission) => {
            responses[submission.id] = submission.value
          })

          response.Ok.decimal_submission.forEach((submission) => {
            responses[submission.id] = submission.value
          })
        }
        setInitValues(responses)
      })
      .catch(console.log)
  }, [backendActor, phaseId, step])

  const questions = useMemo(() => {
    const config =
      parseInt(phaseId || '') == 0 ? APPLICATION_SECTIONS : EVALUATION_SECTIONS

    return config[step].questions
  }, [phaseId, step])

  const validationSchema = useMemo(() => {
    let shape = {}

    questions.forEach((question) => {
      if (question.type == 'textarea')
        shape[question.id] = Yup.string().required('Required')
      if (question.type === 'number')
        shape[question.id] = Yup.number().required()
      if (question.type === 'file')
        shape[question.id] = Yup.mixed().required('File is required')
    })

    return Yup.object().shape(shape)
  }, [questions])

  useEffect(() => {
    setInitValues(undefined)
  }, [projectId, phaseId, step])

  const submitStep = async (values: FormikValues) => {
    setLoading(true)

    let questionSubmissions: QuestionSubmission[] = []
    let checkboxSumissions: CheckBoxSubmission[] = []
    let numeric_submissions: DecimalSubmission[] = []
    let uploadFiles: UploadFile[] = []

    questions.forEach((question) => {
      if (question.type === 'textarea') {
        questionSubmissions.push({
          id: question.id,
          response: !values[question.id] ? [] : [values[question.id]],
        })
      }
      if (question.type === 'checkbox') {
        checkboxSumissions.push({
          id: question.id,
          value: values[question.id] || false,
        })
      }

      if (question.type === 'number') {
        numeric_submissions.push({
          id: question.id,
          value: parseFloat(values[question.id]),
        })
      }
    })

    const uploadQuestions = questions.filter((q) => q.type === 'file')

    const uploadResponses: File[] = uploadQuestions.map((q) => values[q.id])

    const uploadUrls = await backendActor.generateUploadUrl(
      BigInt(projectId || ''),
      BigInt(phaseId || ''),
      BigInt(step || ''),
      uploadQuestions.map((question, index) => {
        return {
          document_type: question.documentType!,
          filename: uploadResponses[index].name,
        }
      })
    )

    if ('Ok' in uploadUrls) {
      for (let i in uploadUrls.Ok) {
        await fetch(uploadUrls.Ok[i].url, {
          method: 'PUT',
          body: uploadResponses[i],
        })
      }
    }

    backendActor
      .updateStep(
        BigInt(projectId || ''),
        BigInt(phaseId || ''),
        BigInt(step || ''),
        {
          questions_submission: [questionSubmissions],
          checkbox_submission: [checkboxSumissions],
          numeric_submission: [numeric_submissions],
          upload_files: [uploadFiles],
        }
      )
      .then((result) => {
        if ('Ok' in result) {
          if (!canSubmit && phaseId === '1') setStep(step + 1)
        }
        if ('Err' in result) {
          alert(JSON.stringify(result.Err))
          return
        }
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false)
      })
  }

  const submitSection = useCallback(() => {
    setPhaseSubmitLoading(true)

    backendActor
      .submitStepPhase(BigInt(projectId || ''), BigInt(phaseId || ''))
      .then((response) => {
        console.log(response)

        if ('Ok' in response) {
          alert('Success! Now please wait for this Phase to be approved')
          window.location.reload(false)
        }

        if ('Err' in response) {
          alert(response.Err)
        }
      })
      .catch(console.log)
      .finally(() => setPhaseSubmitLoading(false))
  }, [projectId, phaseId])

  const canSubmit = useMemo(() => {
    return phaseId === '0' || step === 11
  }, [phaseId, step])

  return (
    <Grid container>
      <Grid xs={3}>
        <PhaseEventCard phase={projectStepPhases[parseInt(phaseId)]} />
      </Grid>
      <Grid xs={8}>
        <Stack mb={2}>
          {phaseId == '1' && (
            <EvaluationTab currentStep={step} setCurrentStep={setStep} />
          )}
        </Stack>
        {initValues && (
          <Formik
            initialValues={initValues}
            onSubmit={submitStep}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2} pb={10}>
                  {questions.map((question, index) => (
                    <FormField
                      name={question.id}
                      type={question.type}
                      disabled={!canEdit}
                    />
                  ))}
                </Stack>

                <Stack
                  position="fixed"
                  bottom={0}
                  left={0}
                  right={0}
                  height={70}
                  boxShadow="xl"
                  direction="row"
                  justifyContent="flex-end"
                  pr={3}
                  bgcolor={(theme) => theme.palette.background.body}
                  zIndex={1}
                >
                  <Box alignContent="center">
                    <Stack direction="row" spacing={1}>
                      {canEdit && (
                        <Button loading={loading} type="submit">
                          {!canSubmit
                            ? 'Save Section & Continue'
                            : 'Save Section'}
                        </Button>
                      )}
                      {canEdit && canSubmit && (
                        <Button
                          loading={phaseSubmitLoading}
                          variant="outlined"
                          onClick={submitSection}
                        >
                          Submit section
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </form>
            )}
          </Formik>
        )}
      </Grid>
    </Grid>
  )
}

export default ProjectStepForm
