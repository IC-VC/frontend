import React from 'react'
import {
  Navigate,
  Outlet,
  RouteObject,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import ProjectList from '../screens/ProjectList'
import NavBar from './Navbar'
import SnsTerminal from '../screens/SnsTerminal'
import ProtectedRoute from './ProtectedRoute'
import ProjectForm from '../screens/ProjectForm'
import ProjectDetails from '@/screens/ProjectDetails'
import ProjectDashboard from '@/screens/ProjectDashboard'
import ProjectApplication from '@/screens/ProjectApplication'
import ProjectEvaluation from '@/screens/ProjectEvaluation'
import ProjectStepForm from '@/screens/ProjectStepForm'
import ProjectManager from '@/screens/ProjectManager'
import Login from '@/screens/Login'
import SNSDetails from '@/screens/SNSDetails'

const RootHandler = () => {
  return null
}

const ROUTE_DATA: RouteObject[] = [
  {
    path: ROUTES.ROOT,
    element: <RootHandler />,
  },
  {
    path: ROUTES.PROJECTS_INDEX,
    element: <ProjectList />,
  },
  {
    path: ROUTES.SNS_TERMINAL,
    element: <SnsTerminal />,
  },
  {
    path: ROUTES.SNS_TERMINAL_PROJECT(':snsId'),
    element: <SNSDetails />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.PROJECTS_MANAGER,
    element: (
      <ProtectedRoute>
        <ProjectManager />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.PROJECTS_EDIT(':projectId'),
        element: <ProjectForm />,
      },
      {
        path: ROUTES.PROJECTS_NEW,
        element: <ProjectForm />,
      },
      {
        path: ROUTES.PROJECTS_PHASE_SECTION_FORM(
          ':projectId',
          ':phaseId',
          ':sectionId'
        ),
        element: <ProjectStepForm />,
      },
    ],
  },
  {
    path: ROUTES.PROJECTS_SHOW(':projectId'),
    element: <ProjectDetails />,
    children: [
      {
        path: ROUTES.PROJECTS_SHOW_DASHBOARD(':projectId'),
        element: <ProjectDashboard />,
      },
      {
        path: ROUTES.PROJECTS_SHOW_APPLICATION(':projectId'),
        element: <ProjectApplication />,
      },
      {
        path: ROUTES.PROJECTS_SHOW_EVALUATION(':projectId'),
        element: <ProjectEvaluation />,
      },
    ],
  },
]

const RootLayout = () => {
  const { pathname } = useLocation()

  if (pathname === ROUTES.ROOT) {
    return <Navigate to={ROUTES.PROJECTS_INDEX} />
  }

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export const router = createBrowserRouter([
  { element: <RootLayout />, children: ROUTE_DATA },
])
