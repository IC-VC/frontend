import { Box, Button, Sheet, Stack, Typography } from '@mui/joy'
import icvcLogo from '@/assets/logo.png'
import useSession from '@/hooks/useSession'

const Login = () => {
  const { authInProgress, login } = useSession()

  return (
    <Stack flex={1} justifyContent="center" alignItems="center" height="90vh">
      <Stack
        component={Sheet}
        boxShadow="lg"
        variant="outlined"
        alignItems="center"
        p={3}
        borderRadius={10}
        maxWidth={300}
      >
        <Box>
          <img src={icvcLogo} height={40} />
        </Box>
        <Typography level="h4" textAlign="center" mb={3}>
          To perform this action you need to Log In
        </Typography>
        <Button
          loading={authInProgress}
          onClick={() => login().catch(console.log)}
        >
          Sign in with Internet Identity
        </Button>
      </Stack>
    </Stack>
  )
}

export default Login
