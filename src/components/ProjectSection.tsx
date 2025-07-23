import { Sheet, Stack } from '@mui/joy'
import { FC, PropsWithChildren } from 'react'

const ProjectSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      component={Sheet}
      variant="outlined"
      borderRadius={10}
      bgcolor={(theme) => theme.palette.background.body}
      boxShadow="lg"
      p={2}
    >
      {children}
    </Stack>
  )
}

export default ProjectSection
