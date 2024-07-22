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
import { useCallback, useState } from 'react'
import { ROUTES } from '../utils/routes'
import { useLocation, useNavigate } from 'react-router-dom'
import icvcLogo from '../assets/logo.png'
import useSession from '../hooks/useSession'
import shortAddress from '@/utils/shortAddress'

const NAV_ITEMS = [
  { name: 'Projects', route: ROUTES.PROJECTS_INDEX, routeElement: 'projects' },
  { name: 'SNS Terminal', route: ROUTES.SNS_TERMINAL, routeElement: 'sns' },
  // { name: 'Funds', route: ROUTES.DOCS, routeElement: 'docs' },
]

const NavBar = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const { identity, authInProgress, login, logout } = useSession()
  const { palette } = useTheme()

  const performLogin = useCallback(() => {
    login().catch(console.log)
  }, [login])

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
        {!identity && (
          <Button onClick={performLogin} loading={authInProgress}>
            Login
          </Button>
        )}
        {identity && (
          <Dropdown>
            <MenuButton variant="plain">
              <Typography mr={1} fontWeight="lg">
                {shortAddress(identity?.getPrincipal()?.toString(), {
                  leftSize: 6,
                  rightSize: 4,
                })}
              </Typography>
              <Avatar />
            </MenuButton>
            <Menu>
              <MenuItem onClick={() => navigate(ROUTES.PROJECTS_NEW)}>
                New Project
              </MenuItem>
              <ListDivider />
              <MenuItem onClick={() => logout().catch(console.log)}>
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
