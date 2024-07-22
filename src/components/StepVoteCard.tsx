import { Stack, Sheet, Typography, Divider } from '@mui/joy'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const MAX_VOTE = 10

interface Props {
  currentStep: number
}

const StepVoteCard: FC<Props> = ({ currentStep }) => {
  const { t } = useTranslation()

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
          <Typography fontWeight="lg">00:00:00</Typography>
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
            >
              <Typography fontSize={12}>{index + 1}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default StepVoteCard
