import {
  Avatar,
  Box,
  Button,
  Dropdown,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/joy'
import { ROUTES } from '../utils/routes'
import { useLocation, useNavigate } from 'react-router-dom'
import icvcLogo from '../assets/logo.png'
import shortAddress from '@/utils/shortAddress'
import { useAuth } from '@nfid/identitykit/react'

const NAV_ITEMS = [
  { name: 'Projects', route: ROUTES.PROJECTS_INDEX, routeElement: 'projects' },
  { name: 'Forum', route: ROUTES.FORUM, routeElement: 'forum' },
  { name: 'SNS Terminal', route: ROUTES.SNS_TERMINAL, routeElement: 'sns' },
  // { name: 'Funds', route: ROUTES.DOCS, routeElement: 'docs' },
]

const NavBar = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const { connect, disconnect, isConnecting, user } = useAuth()

  const { palette } = useTheme()

  return (
    <Box>
      <Stack
        component={List}
        alignItems="center"
        direction="row"
        color={palette.border.primary}
        borderBottom={2}
        pl={5}
        pr={5}
      >
        <Box display={{ xs: 'none', md: 'block', lg: 'block' }} mr={2}>
          <img
            src={icvcLogo}
            height={40}
            onClick={() => navigate(ROUTES.ROOT)}
          />
        </Box>

        <Stack direction="row" spacing={1} mt={1} mb={1}>
          {NAV_ITEMS.map((link) => (
            <ListItem key={link.name}>
              <ListItemButton
                onClick={() => navigate(link.route)}
                selected={pathname.includes(link.routeElement)}
                sx={{ borderRadius: 5 }}
              >
                {link.name}
              </ListItemButton>
            </ListItem>
          ))}
        </Stack>
        <Box flex={1} />
        {!user && (
          <Button onClick={() => connect()} loading={isConnecting}>
            Login
          </Button>
        )}
        {user && (
          <Dropdown>
            <MenuButton variant="plain">
              <Typography mr={1} fontWeight="lg">
                {shortAddress(user.principal.toString(), {
                  leftSize: 6,
                  rightSize: 4,
                })}
              </Typography>
              <Avatar />
            </MenuButton>
            <Menu>
              <MenuItem onClick={() => navigate(ROUTES.MY_PROJECTS)}>
                My Projects
              </MenuItem>
              <MenuItem onClick={() => navigate(ROUTES.PROJECTS_NEW)}>
                New Project
              </MenuItem>
              <ListDivider />
              <MenuItem onClick={() => navigate(ROUTES.NEURON_LIST)}>
                Linked Neurons
              </MenuItem>
              <MenuItem onClick={() => navigate(ROUTES.NEURON_FORM)}>
                Link New Neuron
              </MenuItem>
              <ListDivider />
              <MenuItem onClick={() => disconnect().catch(console.log)}>
                <Typography textColor={palette.danger[500]}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Dropdown>
        )}
      </Stack>
    </Box>
  )
}

export default NavBar
