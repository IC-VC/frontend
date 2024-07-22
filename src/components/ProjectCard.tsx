import React, { FC } from 'react'
import { Project } from '@/idls/backend.did'
import {
  AspectRatio,
  Avatar,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Stack,
  Typography,
} from '@mui/joy'
import { motion } from 'framer-motion'
import CoverPlaceholder from '@/assets/coverPlaceholder.png'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/utils/routes'
import { useTranslation } from 'react-i18next'
import useProject from '@/hooks/useProject'

interface Props {
  project: Project
}

const ProjectCard: FC<Props> = ({ project }) => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const { coverPicture, logo } = useProject(project.id.toString())

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      onClick={() =>
        navigate(ROUTES.PROJECTS_SHOW_DASHBOARD(project.id.toString()))
      }
    >
      <Card variant="outlined">
        <CardOverflow>
          <AspectRatio ratio={3}>
            <img src={coverPicture || CoverPlaceholder} loading="lazy" alt="" />
          </AspectRatio>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={logo} />
              <Stack>
                <Typography level="title-md">{project.title}</Typography>
                <Typography level="body-sm">{project.moto}</Typography>
              </Stack>
            </Stack>
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Stack pt={1} pb={1}>
              <Chip variant="outlined">
                {t(`projectStatuses.${Object.keys(project.status)[0]}`)}
              </Chip>
            </Stack>
          </CardOverflow>
        </CardOverflow>
      </Card>
    </motion.div>
  )
}

export default ProjectCard
