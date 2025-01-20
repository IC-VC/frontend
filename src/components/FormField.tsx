import { FC, useRef } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  useTheme,
} from '@mui/joy'
import { Field } from 'formik'
import { useTranslation } from 'react-i18next'
import FileUpload from './FileUpload'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  ListsToggle,
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

import Markdown from 'react-markdown'

interface Props {
  name: string
  type?: string
  disabled?: boolean
}

const FormField: FC<Props> = ({ name, type, disabled }) => {
  const { t } = useTranslation()
  const { palette } = useTheme()

  const editorRef = useRef()

  const getBody = (field: any, setFieldValue: any) => {
    if (type === 'textarea') {
      if (disabled) {
        return (
          <Box className="mdxinput">
            <Markdown>{field.value}</Markdown>
          </Box>
        )
      }

      return (
        <>
          <MDXEditor
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarClassName: 'my-classname',
                toolbarContents: () => (
                  <>
                    <BlockTypeSelect />
                    <BoldItalicUnderlineToggles />
                    <CreateLink />
                    <ListsToggle />
                  </>
                ),
              }),
            ]}
            markdown={field.value || ''}
            contentEditableClassName="mdxinput"
            ref={editorRef}
            onChange={(value) => setFieldValue(field.name, value)}
          />
        </>
      )
    }

    if (type === 'file') {
      return (
        <FileUpload
          value={field.value}
          setValue={(file) => setFieldValue(field.name, file)}
          isVideo={name === 'ICVC_FILE_1_10_0'}
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
