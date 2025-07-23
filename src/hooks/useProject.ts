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

export interface UserGrade {
  stepId: number
  grade: number
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

  const [step0ProposalId, setStep0ProposalId] = useState<number>()
  const [userGrades, setUserGrades] = useState<UserGrade[]>([])

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
    if (!backendActor) return

    backendActor
      .getAllUserStepPhaseStepsGrade(BigInt(projectId || ''), BigInt(1))
      .then((result) => {
        if ('Ok' in result) {
          setUserGrades(
            result.Ok.map(({ step_id, grade }) => ({
              stepId: Number(step_id),
              grade,
            }))
          )
        }
      })
      .catch(console.log)
  }, [backendActor, projectId])

  useEffect(() => {
    backendActor
      .getAllProposalsByStepPhase(BigInt(projectId || ''), BigInt(0))
      .then((result) => {
        if ('Ok' in result) {
          setStep0ProposalId(Number(result.Ok[0]?.proposal_id))
        }
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
    if (projectId == '1') {
      setProjectDetails({
        id: BigInt(0),
        question_submission: [
          {
            id: 'ICVC_QUESTION_0_0_0',
            response: [
              "WaterNeuron is a liquid staking protocol for the Internet Computer network, simplifying ICP staking and enhancing capital efficiency. It allows users to maintain exposure to ICP staking rewards while keeping tokens liquid, addressing the challenge of competing with high ICP returns in DeFi. WaterNeuron aims to decentralize governance by providing an alternative to DFINITY's voting power. WaterNeuron's mission is to streamline staking, improve capital efficiency, and contribute to the decentralization of the Internet Computer ecosystem.",
            ],
          },
          {
            id: 'ICVC_QUESTION_0_0_1',
            response: [
              '- Léo K. - ex-DFINITY engineers - worked in the chain-fusion team doing ckBTC, ckETH, and ckERC20 - https://github.com/leokazz - Enzo D. - ex-DFINITY engineers - worked in the IDX team doing infrastructure, build reproducibility, and was pitching the IC at conferences  - https://github.com/EnzoPlayer0ne/ - Ulysse K. - student at Polytechnique Paris - https://github.com/uk4z',
            ],
          },
          {
            id: 'ICVC_QUESTION_0_0_2',
            response: [
              'Staking rewards are split 90% for liquid staking token holders and 10% for the DAO. As more ICP gets staked into the protocol, the DAO earns a larger stream of ICP staking rewards.',
            ],
          },
          {
            id: 'ICVC_QUESTION_0_0_3',
            response: [
              'Short-Term: - accrue more ICP staked on the protocol by whales. Audit the code by Trail of Bits to allow for greater amount of TVL.  - augment the visibility of WaterNeuron. Part of the ICP deposited in Papaya would be used to pay for CoinMarket Cap and Token Terminal integrations. Long Term: - Develop a DEX with one pair ICP/nICP that will allow for greater liquidity pool depth.',
            ],
          },
          {
            id: 'ICVC_QUESTION_0_0_4',
            response: [
              'The protocol is live, controlled by the WaterNeuron SNS, and currently has 1.3M $ICP staked.',
            ],
          },
        ],
        decimal_submission: [],
      })

      return
    }
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
    if (projectId == '1') return 400000
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
    if (projectId == '1')
      return 'https://plug-cdn.s3.amazonaws.com/wn-cover.jpg'

    return findUploadFile('CoverPhoto', projectDetails?.upload_files || [])
  }, [projectDetails, projectId])

  const logo = useMemo(() => {
    if (projectId == '1') return 'https://plug-cdn.s3.amazonaws.com/wn-logo.jpg'

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
    step0ProposalId,
    userGrades,
  }
}

export default useProject
