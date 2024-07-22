import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Option,
  Select,
  Stack,
  Typography,
} from '@mui/joy'
import { Formik } from 'formik'
import TeamMemberForm from '../components/TeamMemberForm'
import FormField from '../components/FormField'
import * as Yup from 'yup'
import { ProjectTeamMember } from '@/interfaces/project'
import TeamMemberCard from '@/components/TeamMemberCard'
import { useNavigate, useParams } from 'react-router-dom'
import useProject from '@/hooks/useProject'
import useConfig from '@/hooks/useConfig'
import useBackend from '@/hooks/useBackend'
import { Link, TeamMember } from '@/idls/backend.did'
import { ROUTES } from '@/utils/routes'

const INIT_VALUES = {
  title: '',
  moto: '',
  description: '',
  github: '',
  linkedin: '',
  twitter: '',
  otherLink: '',
  categories: [],
  teamMembers: [] as ProjectTeamMember[],
}

const ProjectSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  moto: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
})

const ProjectForm = () => {
  const { projectId } = useParams()

  const [memberFormVisible, setMemberFormVisible] = useState(false)
  const [memberInEdit, setMemberInEdit] = useState<ProjectTeamMember>()

  const { project } = useProject(projectId || '')
  const { categories } = useConfig()

  const { backendActor } = useBackend()
  const navigate = useNavigate()

  const shouldRenderForm = (projectId && project) || !projectId

  const canEdit = useMemo(() => {
    return !projectId
  }, [projectId])

  const initialValues = useMemo(() => {
    if (!projectId || !project) return INIT_VALUES

    const { title, moto, description, links, categories, team_members } =
      project

    let cats: string[] = []

    for (let i = 0; i < categories.length; i++) {
      cats.push(categories[i].toString())
    }

    return {
      title,
      moto,
      description,
      categories: cats,
      teamMembers: team_members,
      twitter: links.find((link) => link.kind === 'x')?.url,
      github: links.find((link) => link.kind === 'github')?.url,
      linkedin: links.find((link) => link.kind === 'linkedin')?.url,
    }
  }, [projectId, project])

  const [projectSaving, setProjectSaving] = useState(false)

  const getLinks = (
    twitter: string,
    github: string,
    linkedIn: string,
    otherLink: string
  ) => {
    let links: Link[] = []

    if (twitter) {
      links.push({ kind: 'x', url: twitter })
    }

    if (github) {
      links.push({ kind: 'github', url: github })
    }

    if (linkedIn) {
      links.push({ kind: 'linkedIn', url: linkedIn })
    }

    if (otherLink) {
      links.push({ kind: 'other', url: otherLink })
    }

    return links
  }

  const createProject = async (values: any) => {
    setProjectSaving(true)

    const {
      title,
      moto,
      description,
      categories,
      teamMembers,
      twitter,
      github,
      linkedin,
      otherLink,
    } = values

    const team_members: TeamMember[] = teamMembers.map((tm) => {
      const {
        first_name,
        github,
        last_name,
        linkedin,
        position,
        previous_experience,
        twitter,
      } = tm

      return {
        first_name,
        last_name,
        position,
        previous_experience,
        profile_picture: '',
        links: getLinks(twitter, github, linkedin, otherLink),
      }
    })

    const response = await backendActor.createProject({
      title,
      moto,
      description,
      categories: categories.map((cat) => BigInt(cat)),
      team_members,
      links: getLinks(twitter, github, linkedin, otherLink),
    })

    if ('Ok' in response) {
      navigate(
        ROUTES.PROJECTS_PHASE_SECTION_FORM(response.Ok.id.toString(), 0, 0)
      )
    } else if ('Err' in response) {
      alert(response.Err)
    }
  }

  return (
    <Grid container>
      <Grid xs={3} />
      <Grid xs={6}>
        {shouldRenderForm && (
          <Formik
            initialValues={initialValues}
            validationSchema={ProjectSchema}
            onSubmit={(values) =>
              createProject(values)
                .catch(console)
                .finally(() => setProjectSaving(false))
            }
          >
            {({ values, errors, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2} mt={3} mb={10}>
                  <Stack>
                    <Typography level="h4">Project Creation Form</Typography>
                    <Typography level="body-md">
                      Tell us about your project
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormField name="title" disabled={!canEdit} />
                    <FormField name="moto" disabled={!canEdit} />
                  </Stack>
                  <FormField
                    name="description"
                    type="textarea"
                    disabled={!canEdit}
                  />
                  <FormControl>
                    <FormLabel>Categories</FormLabel>
                    <Select
                      multiple
                      placeholder="Select 1 or multiple categories"
                      value={values.categories}
                      onChange={(_, newValue) =>
                        setFieldValue('categories', newValue)
                      }
                      disabled={!canEdit}
                    >
                      {categories.map((category) => (
                        <Option value={category.id.toString()}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormField name="github" disabled={!canEdit} />
                  <FormField name="linkedin" disabled={!canEdit} />
                  <FormField name="twitter" disabled={!canEdit} />
                  <FormField name="otherLink" disabled={!canEdit} />
                  <Stack>
                    <FormLabel>Team Members</FormLabel>
                    <Box>
                      <Grid container sx={{ flexGrow: 1 }} spacing={2}>
                        {values.teamMembers.map((teamMember) => (
                          <Grid xs={4}>
                            <TeamMemberCard
                              teamMember={teamMember}
                              onEditClick={() => {
                                setMemberInEdit(teamMember)
                                setMemberFormVisible(true)
                              }}
                              onDeleteClick={() => {
                                const filtered = values.teamMembers.filter(
                                  (tm) => tm.id !== teamMember.id
                                )
                                setFieldValue('teamMembers', filtered)
                              }}
                            />
                          </Grid>
                        ))}
                        {canEdit && (
                          <Grid xs={4}>
                            <Button
                              onClick={() => {
                                setMemberInEdit(undefined)
                                setMemberFormVisible(true)
                              }}
                            >
                              Add team member
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Stack>
                </Stack>
                <TeamMemberForm
                  visible={memberFormVisible}
                  onClose={() => setMemberFormVisible(false)}
                  setTeamMember={(newMember) => {
                    console.log('n', newMember)
                    if (!newMember.id) {
                      setFieldValue(
                        'teamMembers',
                        values.teamMembers
                          ? [
                              ...values.teamMembers,
                              { ...newMember, id: crypto.randomUUID() },
                            ]
                          : [newMember]
                      )
                    } else {
                      const filtered = values.teamMembers.filter(
                        (tm) => tm.id !== newMember.id
                      )
                      setFieldValue('teamMembers', [...filtered, newMember])
                    }
                  }}
                  existingTeamMember={memberInEdit}
                />
                <Stack
                  position="fixed"
                  bottom={0}
                  left={0}
                  right={0}
                  height={70}
                  boxShadow="xl"
                  direction="row"
                  justifyContent="flex-end"
                  pr={3}
                  bgcolor={(theme) => theme.palette.background.body}
                  zIndex={1}
                >
                  <Box alignContent="center">
                    {canEdit && (
                      <Button type="submit" loading={projectSaving}>
                        Create and Proceed
                      </Button>
                    )}
                  </Box>
                </Stack>
              </form>
            )}
          </Formik>
        )}
      </Grid>
    </Grid>
  )
}

export default ProjectForm
