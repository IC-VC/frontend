import React, { FC } from 'react'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
  useTheme,
} from '@mui/joy'
import { Field } from 'formik'
import { useTranslation } from 'react-i18next'
import FileUpload from './FileUpload'

interface Props {
  name: string
  type?: string
  disabled?: boolean
}

const FormField: FC<Props> = ({ name, type, disabled }) => {
  const { t } = useTranslation()

  const { palette } = useTheme()

  const getBody = (field: any, setFieldValue: any) => {
    if (type === 'textarea') {
      return (
        <>
          <Textarea
            minRows={5}
            variant="outlined"
            {...field}
            disabled={disabled}
          />
          <FormHelperText>Max 500 characters</FormHelperText>
        </>
      )
    }

    if (type === 'file') {
      return (
        <FileUpload
          value={field.value}
          setValue={(file) => setFieldValue(field.name, file)}
        />
      )
    }

    return (
      <Input
        {...field}
        placeholder={t('form.placeholder', {
          fieldName: t(`form.${field.name}`),
        })}
        disabled={disabled}
      />
    )
  }

  return (
    <Stack flex={1}>
      <Field name={name} type={type}>
        {({ field, form: { errors, setFieldValue }, meta }) => (
          <FormControl error={!!meta.error}>
            <FormLabel>
              <Typography
                textColor={!!meta.error && palette.danger[500]}
                fontWeight="lg"
              >
                {t(`form.${field.name}`)}
              </Typography>
            </FormLabel>
            {getBody(field, setFieldValue)}
          </FormControl>
        )}
      </Field>
    </Stack>
  )
}

export default FormField
