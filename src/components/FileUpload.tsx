import React, { FC, useCallback } from 'react'
import { FormLabel, Sheet, Stack, Typography } from '@mui/joy'

import { useDropzone } from 'react-dropzone'
import { CloudUpload, FileIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  name?: string
  value?: File
  setValue: (file: File) => void
}

const FileUpload: FC<Props> = ({ name, value, setValue }) => {
  const { t } = useTranslation()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
  })

  const renderCardContent = () => {
    if (value) {
      return (
        <>
          <FileIcon size={35} />
          <Typography>{value.name}</Typography>
        </>
      )
    }
    return (
      <>
        <CloudUpload size={35} />

        {isDragActive ? (
          <Typography>Drop the files here</Typography>
        ) : (
          <Typography>Click to upload or drag and drop</Typography>
        )}
      </>
    )
  }

  return (
    <Stack flex={1}>
      {name && <FormLabel>{t(`form.${name}`)}</FormLabel>}
      <Stack
        component={Sheet}
        variant="outlined"
        borderRadius={10}
        p={2}
        boxShadow="xs"
        mt={1}
      >
        <Stack alignItems="center" {...getRootProps()}>
          <input {...getInputProps()} />
          {renderCardContent()}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FileUpload
