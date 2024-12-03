import { Step } from '@/idls/backend.did'
import { Question } from '@/utils/formConfig'
import { Divider, Sheet, Stack, Typography } from '@mui/joy'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

const BASE_URL = 'https://icvc-s3-uploads.s3.eu-central-1.amazonaws.com'

interface Props {
  step: Step
  fields: Question[]
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

const FileSubmission = ({
  id,
  url,
  fileType,
}: {
  id: string
  url?: string
  fileType?: string
}) => {
  const { t } = useTranslation()

  const fullUrl = `${BASE_URL}/${url}`

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
      <a href={fullUrl} target="_blank">
        <Typography level="body-md">{t(`fileTypes.${fileType}`)}</Typography>
      </a>
    </Stack>
  )
}

const StepSubmission: FC<Props> = ({ step, fields }) => {
  const renderField = (field: Question) => {
    if (field.id.includes('QUESTION')) {
      const submission = step.question_submission.find(
        (submission) => submission.id === field.id
      )
      return (
        <QuestionSubmission
          id={field.id}
          response={submission?.response?.[0]}
        />
      )
    }
    if (field.id.includes('FILE')) {
      const submission = step.upload_files.find(
        (submission) =>
          Object.keys(submission.document_type)[0] ===
          Object.keys(field.documentType || {})[0]
      )
      if (!submission) return
      return (
        <FileSubmission
          id={field.id}
          url={submission?.s3_key}
          fileType={Object.keys(submission?.document_type || {})[0]}
        />
      )
    }
  }

  return <Stack spacing={2}>{fields.map(renderField)}</Stack>
}

export default StepSubmission
