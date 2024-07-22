import { Step } from '@/idls/backend.did'
import { Divider, Sheet, Stack, Typography } from '@mui/joy'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  step: Step
  fields: string[]
}

const QuestionSubmission = ({
  id,
  response,
}: {
  id: string
  response?: string
}) => {
  const { t } = useTranslation()
  return (
    <Stack
      component={Sheet}
      bgcolor={(theme) => theme.palette.background.body}
      boxShadow="lg"
      variant="outlined"
      borderRadius={10}
      p={2}
      spacing={1}
    >
      <Typography level="body-sm" fontWeight="lg">
        {t(`form.${id}`)}
      </Typography>
      <Divider sx={{ width: 100 }} />
      <Typography level="body-md">{response || 'N/A'}</Typography>
    </Stack>
  )
}

const StepSubmission: FC<Props> = ({ step, fields }) => {
  const renderField = (field: string) => {
    if (field.includes('QUESTION')) {
      const submission = step.question_submission.find(
        (submission) => submission.id === field
      )
      return (
        <QuestionSubmission id={field} response={submission?.response?.[0]} />
      )
    }
  }

  return <Stack spacing={2}>{fields.map(renderField)}</Stack>
}

export default StepSubmission
