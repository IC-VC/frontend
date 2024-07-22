import { useCallback, useEffect, useMemo, useState } from 'react'
import useBackend from './useBackend'
import {
  Project,
  Step,
  StepPhase,
  StepPhaseGradeResult,
  UploadFile,
} from '@/idls/backend.did'
import { StepStatus } from '@/interfaces/project'

export interface StepInternal {
  id: number
  state: StepStatus
  submissionDate: Date
  evaluationEndDate: Date
}

const useProject = (projectId: string) => {
  const { backendActor } = useBackend()
  const [project, setProject] = useState<Project>()
  const [projectStepPhases, setProjectStepPhases] = useState<StepInternal[]>([])
  const [projectDetails, setProjectDetails] = useState<Step>()
  const [evaluationStepResults, setEvaluationStepResults] =
    useState<StepPhaseGradeResult>()
  const [submissionStepResults, setSubmissionsStepResults] =
    useState<StepPhaseGradeResult>()

  const mapStepPhase = (phase: StepPhase): StepInternal => {
    const {
      id,
      status,
      start_assessment_date,
      end_open_date,
      end_assessment_date,
    } = phase

    let state = StepStatus[Object.keys(status)[0] as keyof typeof StepStatus]

    const evaluationStartDate = new Date(
      Number(start_assessment_date) / 1_000_000
    )

    const submissionDate = new Date(Number(end_open_date) / 1_000_000)

    const evaluationEndDate = new Date(Number(end_assessment_date) / 1_000_000)

    if (state === StepStatus.Submitted && new Date() >= evaluationStartDate) {
      state = StepStatus.Evaluation
    }

    return { id: Number(id), state, submissionDate, evaluationEndDate }
  }

  useEffect(() => {
    backendActor
      .getProjectById(BigInt(projectId || ''))
      .then((projectResponse) => {
        if ('Ok' in projectResponse) setProject(projectResponse.Ok)
      })
      .catch(console.log)
  }, [projectId, backendActor])

  useEffect(() => {
    backendActor
      .getAllStepPhaseByProjectId(BigInt(projectId || ''))
      .then((response) => {
        if ('Ok' in response)
          setProjectStepPhases(response.Ok.map(mapStepPhase))
      })
      .catch(console.log)
  }, [projectId, backendActor])

  useEffect(() => {
    backendActor
      .getStepById(BigInt(projectId || ''), BigInt(0), BigInt(0))
      .then((step0Result) => {
        if ('Ok' in step0Result) setProjectDetails(step0Result.Ok)
      })
      .catch(console.log)
  }, [projectStepPhases, backendActor])

  useEffect(() => {
    if (!projectId) return

    backendActor
      .getStepPhaseAssessmentResult(BigInt(projectId), BigInt(0))
      .then((result) => {
        if ('Ok' in result) {
          setSubmissionsStepResults(result.Ok)
        }
      })
      .catch(console.log)
  }, [projectId])

  useEffect(() => {
    if (!projectId) return

    backendActor
      .getStepPhaseAssessmentResult(BigInt(projectId), BigInt(1))
      .then((result) => {
        if ('Ok' in result) {
          setEvaluationStepResults(result.Ok)
        }
      })
      .catch(console.log)
  }, [projectId])

  const amountRaising = useMemo(() => {
    if (!projectDetails) return

    return Number(
      projectDetails.decimal_submission.find(
        (submission) => submission.id === 'ICVC_NUMERIC_DECIMAL_0_0_0'
      )?.value
    )
  }, [projectDetails])

  const findUploadFile = (type: string, uploadFiles: UploadFile[]) => {
    const url = uploadFiles.find(
      (file) => Object.keys(file.document_type)[0] === type
    )?.s3_key?.[0]

    return url
      ? `https://icvc-s3-uploads.s3.eu-central-1.amazonaws.com/${url}`
      : null
  }

  const coverPicture = useMemo(() => {
    return findUploadFile('CoverPhoto', projectDetails?.upload_files || [])
  }, [projectDetails, projectId])

  const logo = useMemo(() => {
    return findUploadFile('Logo', projectDetails?.upload_files || [])
  }, [projectDetails, projectId])

  const projectStatus = useMemo(() => {
    if (!project) return
    return Object.keys(project.status)[0]
  }, [project])

  const getStepState = useCallback(
    (index: number) => {
      if (projectStepPhases.length < index) return StepStatus.NotStarted

      const state = projectStepPhases[index - 1].state

      if (index == 2 && state === StepStatus.NotApproved)
        return StepStatus.Approved

      return state
    },
    [projectStepPhases]
  )

  return {
    project,
    projectStepPhases,
    getStepState,
    projectDetails,
    amountRaising,
    projectStatus,
    evaluationStepResults,
    submissionStepResults,
    coverPicture,
    logo,
  }
}

export default useProject
