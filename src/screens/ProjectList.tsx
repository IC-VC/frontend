import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import PageTitleBar from '../components/PageTitleBar'
import useBackend from '@/hooks/useBackend'
import { Project } from '@/idls/backend.did'
import ProjectCard from '@/components/ProjectCard'
import useConfig from '@/hooks/useConfig'

const ProjectList = () => {
  const navigate = useNavigate()
  const { backendActor } = useBackend()
  const [projects, setProjects] = useState<Project[]>([])

  const { categories } = useConfig()

  useEffect(() => {
    backendActor
      .getAllProjects([], [])
      .then((projectResult) => {
        if ('Ok' in projectResult) {
          setProjects(projectResult.Ok)
        }
      })
      .catch(console.log)
  }, [backendActor])

  return (
    <Stack>
      <PageTitleBar
        title="Explore"
        subtitle="Discover projects who are using ICVC to go further"
        rightComponent={
          <Box alignContent="center">
            <Button onClick={() => navigate(ROUTES.PROJECTS_NEW)}>
              Create project
            </Button>
          </Box>
        }
      />
      <Grid mt={3} container pl={5} pr={5}>
        <Box
          component={Grid}
          xs={3}
          display={{ xs: 'none', lg: 'block', md: 'block' }}
          pr={5}
        >
          <Stack spacing={2}>
            <Typography level="h4">Filters</Typography>
            <Box>
              <Typography level="body-lg">By Status</Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Checkbox label="" />
              <Chip variant="outlined">Open</Chip>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Checkbox label="" />
              <Chip variant="outlined" color="success">
                Funded
              </Chip>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Checkbox label="" />
              <Chip variant="outlined" color="danger">
                Not Funded
              </Chip>
            </Stack>
            <Box>
              <Typography level="body-lg">By Category</Typography>
              <Stack spacing={1} mt={2}>
                {categories.map((category) => (
                  <Box>
                    <Checkbox
                      label={category.name}
                      value={category.id.toString()}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
            <Divider />
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined">Clear</Button>
              <Button>Apply filters</Button>
            </Stack>
          </Stack>
        </Box>
        <Grid xs={12} md={9} lg={9}>
          <Stack>
            <Grid container spacing={2}>
              {projects.map((project) => (
                <Grid xs={12} sm={6} md={4}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ProjectList
