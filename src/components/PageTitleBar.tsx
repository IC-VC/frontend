import { Box, Stack, Typography, useTheme } from '@mui/joy'
import React, { FC } from 'react'

interface Props {
  title: string
  subtitle: string
  rightComponent?: React.ReactNode
}

const PageTitleBar: FC<Props> = ({ title, subtitle, rightComponent }) => {
  const { palette } = useTheme()

  return (
    <Box
      color={palette.border.primary}
      borderBottom={2}
      pl={5}
      pr={5}
      pt={2}
      pb={2}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography level="h1">{title}</Typography>
          <Typography level="body-lg">{subtitle}</Typography>
        </Stack>
        {rightComponent}
      </Stack>
    </Box>
  )
}

export default PageTitleBar
