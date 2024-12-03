import { FC, useEffect, useMemo, useState } from 'react'
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

const PROJECT_STATES = [
  { title: 'Open', value: 'Open' },
  { title: 'Funded', value: 'Funded' },
  { title: 'Not Funded', value: 'NotFunded' },
  { title: 'Not Submitted', value: 'NotSubmitted' },
]

interface Props {
  showMy?: boolean
}

const ProjectList: FC<Props> = ({ showMy }) => {
  const navigate = useNavigate()
  const { backendActor } = useBackend()
  const [projects, setProjects] = useState<Project[]>([])

  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { categories } = useConfig()

  useEffect(() => {
    const promise = showMy
      ? backendActor.getUserProjects()
      : backendActor.getAllProjects([], [])

    promise
      .then((projectResult) => {
        if ('Ok' in projectResult) {
          setProjects(projectResult.Ok)
        }
      })
      .catch(console.log)
  }, [backendActor, showMy])

  const filteredProjects = useMemo(() => {
    let projectsFiltered = projects
    if (selectedStates.length > 0) {
      projectsFiltered = projects.filter((p) =>
        selectedStates.includes(Object.keys(p.status)[0])
      )
    }

    if (selectedCategories.length > 0) {
      projectsFiltered = projectsFiltered.filter((p) => {
        return p.categories.some((cat) => {
          return selectedCategories.includes(`${Number(cat)}`)
        })
      })
    }

    return projectsFiltered
  }, [projects, selectedStates, selectedCategories])

  const toggleState = (state: string) =>
    setSelectedStates((old) => {
      if (old.includes(state)) return old.filter((s) => s !== state)

      return [...old, state]
    })

  const toggleCategory = (category: string) =>
    setSelectedCategories((old) => {
      if (old.includes(category)) return old.filter((s) => s !== category)

      return [...old, category]
    })

  const clearFilters = () => {
    setSelectedStates([])
    setSelectedCategories([])
  }

  return (
    <Stack>
      {!showMy && (
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
      )}
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
            {PROJECT_STATES.map((state) => (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Checkbox
                  label=""
                  value={state.value}
                  checked={selectedStates.includes(state.value)}
                  onChange={(e) => toggleState(e.target.value)}
                />
                <Chip variant="outlined">{state.title}</Chip>
              </Stack>
            ))}
            <Box>
              <Typography level="body-lg">By Category</Typography>
              <Stack spacing={1} mt={2}>
                {categories.map((category) => (
                  <Box>
                    <Checkbox
                      label={category.name}
                      value={category.id.toString()}
                      checked={selectedCategories.includes(
                        category.id.toString()
                      )}
                      onChange={(e) => toggleCategory(e.target.value)}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
            <Divider />
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined" onClick={clearFilters}>
                Clear
              </Button>
              {/* <Button>Apply filters</Button> */}
            </Stack>
          </Stack>
        </Box>
        <Grid xs={12} md={9} lg={9}>
          <Stack>
            <Grid container spacing={2}>
              {filteredProjects.map((project) => (
                <Grid xs={12} sm={6} md={4}>
                  <ProjectCard project={project} manage={showMy} />
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
