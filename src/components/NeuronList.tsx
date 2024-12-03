import useBackend from '@/hooks/useBackend'
import { UserNeuron } from '@/idls/backend.did'
import { ROUTES } from '@/utils/routes'
import { Button, Grid, Sheet, Stack, Table, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NeuronList = () => {
  const navigate = useNavigate()
  const [linkedNeurons, setLinkedNeurons] = useState<UserNeuron[]>([])
  const { backendActor } = useBackend()

  useEffect(() => {
    backendActor
      .getUserNeurons()
      .then((res) => {
        if ('Ok' in res) {
          setLinkedNeurons(res.Ok)
        }
      })
      .catch(console.log)
  }, [backendActor])

  return (
    <Stack>
      <Grid container spacing={2} ml={5} mr={5}>
        <Grid xs={2} />
        <Grid xs={6}>
          <Typography mt={2} level="h3">
            Linked Neurons
          </Typography>
          <Stack spacing={1} mt={2} mb={2}>
            <Typography>
              In order to participate in internal grading process you need to
              link your ICVC neurons
            </Typography>
          </Stack>
          <Sheet>
            <Table>
              <thead>
                <tr>
                  <th>Neuron ID</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {linkedNeurons.map((neuron) => (
                  <tr>
                    <td>{neuron.neuron_id}</td>
                    <td>{neuron.user_id.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <Button onClick={() => navigate(ROUTES.NEURON_FORM)}>
            ADD NEURON
          </Button>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default NeuronList
