import React, { FC, useMemo } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormField from './FormField'
import { ProjectTeamMember } from '@/interfaces/project'

interface Props {
  visible: boolean
  onClose: () => void
  setTeamMember: (teamMember: string) => void
  existingTeamMember?: ProjectTeamMember
}

const INIT_VALUES = {
  first_name: '',
  last_name: '',
  position: '',
  previous_experience: '',
  github: '',
  linkedin: '',
  twitter: '',
}

const TeamMemberSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  position: Yup.string().required('Required'),
  previous_experience: Yup.string().required('Required'),
})

const TeamMemberForm: FC<Props> = ({
  visible,
  onClose,
  setTeamMember,
  existingTeamMember,
}) => {
  return (
    <Modal open={visible} onClose={onClose}>
      <ModalDialog minWidth={650}>
        <Stack spacing={2}>
          <Stack alignItems="center" flex={1}>
            <img width={100} src="/assets/edit.gif" />
            <Typography level="h4">Add Team Member</Typography>
            <Typography level="body-sm">
              Fill in the details about your team member
            </Typography>
          </Stack>
          {visible && (
            <Formik
              initialValues={existingTeamMember || INIT_VALUES}
              validationSchema={TeamMemberSchema}
              onSubmit={(values) => {
                console.log(values)
                setTeamMember(values)
                onClose()
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Stack
                    spacing={2}
                    p={3}
                    borderRadius={10}
                    bgcolor={(theme) => theme.palette.background.level1}
                    color={(theme) => theme.palette.border.primary}
                    border={1}
                  >
                    <FormField name="first_name" />
                    <FormField name="last_name" />
                    <FormField name="position" />
                    <FormField name="previous_experience" />
                    <FormField name="github" />
                    <FormField name="linkedin" />
                    <FormField name="twitter" />
                  </Stack>
                  <Stack direction="row" mt={2}>
                    <Button variant="outlined" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                  </Stack>
                </form>
              )}
            </Formik>
          )}
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default TeamMemberForm
