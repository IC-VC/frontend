import { Box, Button, Sheet, Stack, Typography } from '@mui/joy'
import icvcLogo from '@/assets/logo.png'

const MobileNotAvailable = () => {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center" height="100vh">
      <Stack
        component={Sheet}
        boxShadow="lg"
        variant="outlined"
        alignItems="center"
        p={3}
        borderRadius={10}
        maxWidth={400}
        spacing={3}
      >
        <Box>
          <img src={icvcLogo} height={60} />
        </Box>
        <Typography level="body-lg" textAlign="center">
          We are sorry, but ICVC dApp Mobile version is still WIP. Please check
          dApp preview on your desktop browser
        </Typography>
      </Stack>
    </Stack>
  )
}

export default MobileNotAvailable
