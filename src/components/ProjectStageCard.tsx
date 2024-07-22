import { StepStatus } from '@/interfaces/project'
import { Chip, Sheet, Stack, Typography } from '@mui/joy'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  stageName: string
  subtitle?: string
  path: string
  stageStatus?: StepStatus
  disabled?: boolean
}

const CHIP_COLOR_MAP = {
  [StepStatus.NotStarted]: 'neutral',
  [StepStatus.Evaluation]: 'success',
  [StepStatus.Approved]: 'success',
  [StepStatus.NotApproved]: 'danger',
  [StepStatus.Submitted]: 'primary',
}

const ProjectStageCard: FC<Props> = ({
  stageName,
  stageStatus,
  subtitle,
  path,
  disabled,
}) => {
  const { t } = useTranslation()

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isSelected = useMemo(() => {
    return pathname === path
  }, [pathname, path])

  return (
    <Stack
      component={Sheet}
      bgcolor={(theme) =>
        stageStatus === StepStatus.NotStarted || disabled
          ? theme.palette.background.level1
          : theme.palette.background.body
      }
      p={2}
      borderRadius={10}
      boxShadow="lg"
      flex={1}
      variant={isSelected ? 'outlined' : 'plain'}
      onClick={() => !disabled && navigate(path)}
    >
      <Stack mb={1}>
        <Typography level="title-md" fontWeight="bold">
          {stageName}
        </Typography>
        {subtitle && <Typography level="body-sm">{subtitle}</Typography>}
      </Stack>

      {stageStatus && (
        <Chip variant="outlined" color={CHIP_COLOR_MAP[stageStatus]}>
          {t(`stageState.${stageStatus}`)}
        </Chip>
      )}
    </Stack>
  )
}

export default ProjectStageCard
