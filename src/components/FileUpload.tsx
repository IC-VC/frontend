import { FC, useCallback } from 'react'
import { FormLabel, Sheet, Stack, Typography } from '@mui/joy'

import { useDropzone } from 'react-dropzone'
import { CloudUpload, FileIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  name?: string
  value?: File
  setValue: (file: File) => void
  isVideo?: boolean
}

const BYTES_IN_MB = 1_000_000
const MAX_VIDEO_SIZE = 100
const MAX_FILE_SIZE = 10

const FileUpload: FC<Props> = ({ name, value, setValue, isVideo }) => {
  const { t } = useTranslation()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: isVideo
      ? MAX_VIDEO_SIZE * BYTES_IN_MB
      : MAX_FILE_SIZE * BYTES_IN_MB,
    accept: isVideo
      ? { 'video/mp4': ['.mp4', '.m4a', '.m4v'] }
      : {
          'image/png': ['.png', '.jpg', '.jpeg'],
          'application/pdf': ['.pdf'],
          'application/vnd.ms-excel': ['.xls'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
            '.xlsx',
          ],
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
      <Typography level="body-md">
        Accepted file types:{' '}
        {isVideo ? 'mp4, m4v' : 'png, jpg, jpeg, pdf, xls, xlsx'}
      </Typography>
      <Typography level="body-sm">
        Max: {isVideo ? MAX_VIDEO_SIZE : MAX_FILE_SIZE} MB
      </Typography>
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
