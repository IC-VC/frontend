import useBackend from '@/hooks/useBackend'
import { UserNeuron } from '@/idls/backend.did'
import { Stack, Sheet, Typography, Divider } from '@mui/joy'
import { CircularProgress } from '@mui/material'
import { intervalToDuration } from 'date-fns'
import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const MAX_VOTE = 10

interface Props {
  currentStep: number
  endDate?: Date
}

const StepVoteCard: FC<Props> = ({ currentStep, endDate }) => {
  const { t } = useTranslation()
  const { projectId } = useParams()
  const { backendActor } = useBackend()

  const [currentGrade, setCurrentGrade] = useState<number>()
  const [gradeLoading, setGradeLoading] = useState<number>()

  const [linkedNeurons, setLinkedNeurons] = useState<UserNeuron[]>([])

  const [phaseDuration, setPhaseDuration] = useState<Duration>()

  useEffect(() => {
    backendActor
      .getUserNeurons()
      .then((res) => {
        if ('Ok' in res) {
          setLinkedNeurons(res.Ok)
        }
      })
      .catch(console.log)
  }, [backendActor])

  useEffect(() => {
    setCurrentGrade(undefined)
  }, [currentStep])

  useEffect(() => {
    if (!backendActor) return

    const neuronGradePromises = linkedNeurons.map((neuron) =>
      backendActor.getStepGradepById(
        neuron.id,
        BigInt(projectId || ''),
        BigInt(1),
        BigInt(currentStep)
      )
    )

    Promise.all(neuronGradePromises)
      .then((grades) => {
        setCurrentGrade(grades[0]?.Ok?.grade)
      })
      .catch(console.log)
  }, [currentStep, backendActor, projectId, linkedNeurons])

  const castVote = useCallback(
    (value: number) => {
      if (!backendActor) return

      setGradeLoading(value)

      const neuronGradePromises = linkedNeurons.map((neuron) =>
        backendActor.submitStepGrade(
          BigInt(projectId || ''),
          neuron.id,
          BigInt(1),
          BigInt(currentStep),
          value
        )
      )

      Promise.allSettled(neuronGradePromises)
        .then((res) => {
          const firstResponse = res[0]?.value
          if ('Err' in firstResponse) {
            const errorKey = Object.keys(firstResponse.Err)[0]
            alert(firstResponse.Err[errorKey])
          }

          if ('Ok' in firstResponse) {
            setCurrentGrade(firstResponse.Ok)
          }
        })
        .catch(console.log)
        .finally(() => setGradeLoading(undefined))
    },
    [currentStep, backendActor, projectId, linkedNeurons]
  )

  useEffect(() => {
    if (!endDate) return
    const currentDate = new Date()

    if (currentDate > endDate) return

    const interval = setInterval(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: endDate,
      })

      setPhaseDuration(duration)

      return () => {
        clearInterval(interval)
      }
    }, 1000)
  }, [endDate])

  const renderTimer = () => {
    const { days, minutes, hours, seconds } = phaseDuration || {}

    return (
      <Typography fontWeight="lg">
        {t(`phaseEventCard.timer`, {
          days: days || 0,
          minutes: minutes || 0,
          hours: hours || 0,
          seconds: seconds || 0,
        })}
      </Typography>
    )
  }

  return (
    <Stack
      component={Sheet}
      variant="outlined"
      boxShadow="lg"
      borderRadius={10}
      p={2}
      spacing={3}
      bgcolor={(theme) => theme.palette.background.body}
    >
      <Stack direction="row" spacing={2}>
        <Typography level="h4" flex={1}>
          {t(`evaluation.steps.${currentStep}`)}
        </Typography>
        <Stack alignItems="flex-end">
          <Typography>Time Remaining</Typography>
          {renderTimer()}
        </Stack>
      </Stack>
      <Typography>
        Evaluate each step separately and give a grade out of 10
      </Typography>
      <Divider />
      <Stack spacing={0.5}>
        <Typography>Your Vote</Typography>
        <Stack direction="row" spacing={1}>
          {[...Array(MAX_VOTE)].map((_, index) => (
            <Stack
              component={Sheet}
              variant="outlined"
              flex={1}
              sx={{ aspectRatio: 1 }}
              justifyContent="center"
              alignItems="center"
              borderRadius={5}
              onClick={() => castVote(index + 1)}
              bgcolor={(theme) =>
                currentGrade === index + 1
                  ? theme.palette.background.level2
                  : theme.palette.background.body
              }
            >
              {gradeLoading === index + 1 ? (
                <CircularProgress size="20px" />
              ) : (
                <Typography fontSize={12}>{index + 1}</Typography>
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Typography>Voting with {linkedNeurons.length} neurons</Typography>
    </Stack>
  )
}

export default StepVoteCard
