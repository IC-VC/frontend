export const ROUTES = {
  ROOT: '/',

  LOGIN: '/login',

  PROJECTS_INDEX: '/projects',
  PROJECTS_MANAGER: '/projects/manage',
  PROJECTS_NEW: '/projects/manage/new',
  PROJECTS_EDIT: (projectId: string) => `/projects/manage/${projectId}`,
  PROJECTS_PHASE_SECTION_FORM: (
    projectId: string,
    phaseId: string,
    sectionId: string
  ) => `/projects/manage/${projectId}/phases/${phaseId}/${sectionId}`,
  PROJECTS_SHOW: (id: string) => `/projects/${id}`,
  PROJECTS_SHOW_DASHBOARD: (id: string) => `/projects/${id}/dashboard`,
  PROJECTS_SHOW_APPLICATION: (id: string) => `/projects/${id}/application`,
  PROJECTS_SHOW_EVALUATION: (id: string) => `/projects/${id}/evaluation`,
  PROJECTS_SHOW_COMPLETION: (id: string) => `/projects/${id}/completion`,

  SNS_TERMINAL: '/sns',
  SNS_TERMINAL_PROJECT: (id: string) => `/sns/${id}`,
  DOCS: '/documents',
}
