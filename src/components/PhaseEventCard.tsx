import { StepInternal } from '@/hooks/useProject'
import { StepStatus } from '@/interfaces/project'
import { Sheet, Stack, Typography } from '@mui/joy'
import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Voting from '@/assets/voting.gif'
import Confetti from '@/assets/confetti.png'
import Rejected from '@/assets/application-rejected.gif'
import Submit from '@/assets/submit.gif'
import { Duration, intervalToDuration } from 'date-fns'

interface Props {
  phase?: StepInternal
}

const PhaseEventCard: FC<Props> = ({ phase }) => {
  const { t } = useTranslation()
  const [phaseDuration, setPhaseDuration] = useState<Duration>()

  const statusImage = useMemo(() => {
    switch (phase?.state) {
      case StepStatus.Evaluation:
        return Voting
      case StepStatus.Approved:
        return Confetti
      case StepStatus.NotApproved:
        return Rejected
      default:
        return Submit
    }
  }, [phase?.state])

  const hasTimer = useMemo(() => {
    return [StepStatus.Open, StepStatus.Evaluation].includes(phase?.state)
  }, [phase])

  useEffect(() => {
    if (!hasTimer) return

    const interval = setInterval(() => {
      const cutoffDate =
        phase?.state === StepStatus.Evaluation
          ? phase.evaluationEndDate
          : phase?.submissionDate

      const duration = intervalToDuration({
        start: new Date(),
        end: cutoffDate,
      })

      setPhaseDuration(duration)

      return () => {
        clearInterval(interval)
      }
    }, 1000)
  }, [hasTimer, phase])

  const renderTimer = () => {
    if (!phaseDuration) return
    const { days, minutes, hours, seconds } = phaseDuration
    return (
      <Stack>
        <Typography level="body-lg" textAlign="center">
          {t(`phaseEventCard.remainingTime`)}
        </Typography>
        <Typography level="h4" textAlign="center">
          {t(`phaseEventCard.timer`, {
            days: days || 0,
            minutes: minutes || 0,
            hours: hours || 0,
            seconds: seconds || 0,
          })}
        </Typography>
      </Stack>
    )
  }

  if (!phase) return

  return (
    <Stack spacing={2} p={2}>
      <Typography level="h4">{t(`projectPhases.${phase?.id}`)}</Typography>
      <Stack component={Sheet} p={2} borderRadius={10} variant="outlined">
        <Stack spacing={3} alignItems="center">
          <img src={statusImage} width={100} />
          <Typography level="h4" textAlign="center">
            {t(`projectPhaseStateDescription.${phase?.state}`)}
          </Typography>
          {hasTimer && renderTimer()}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PhaseEventCard
