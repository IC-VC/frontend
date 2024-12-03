import React, { useState } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/joy'
import FormField from './FormField'
import { Formik } from 'formik'
import useBackend from '@/hooks/useBackend'
import useSession from '@/hooks/useSession'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/utils/routes'

const INIT_VALUES = {
  neuronId: '',
}

const NeuronForm = () => {
  const [neuronLinkInProgress, setNeuronLinkInProgress] = useState(false)
  const { identity } = useSession()

  const { backendActor } = useBackend()

  const navigate = useNavigate()

  return (
    <Grid container spacing={2} ml={5} mr={5} mt={2}>
      <Grid xs={2} />
      <Grid xs={6}>
        <Typography level="h3">Link New Neuron</Typography>
        <Stack mt={2} mb={2}>
          <Typography>
            Please add your local Principal ID as a hotkey to your neuron (this
            is used to validate the ownership of the neuron)
          </Typography>
          <Typography>
            Your local Principal:{' '}
            <strong>{identity?.getPrincipal()?.toString()}</strong>
          </Typography>
        </Stack>
        <Formik
          initialValues={INIT_VALUES}
          onSubmit={(values) => {
            setNeuronLinkInProgress(true)
            backendActor
              .addUserNeuron(values.neuronId)
              .then((result) => {
                if ('Err' in result) {
                  const errorKey = Object.keys(result.Err)[0]
                  alert(`${errorKey}: ${result.Err[errorKey]}`)
                  return
                }
                navigate(ROUTES.NEURON_LIST)
              })
              .catch((e) => {
                console.log('Linking error', e)
                alert('Error linking neuron')
              })
              .finally(() => setNeuronLinkInProgress(false))
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormField name="neuronId" type="text" />
              <Stack mt={2}>
                <Button type="submit" loading={neuronLinkInProgress}>
                  Link Neuron
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

export default NeuronForm
