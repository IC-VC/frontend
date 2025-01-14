export interface Link {
  url: string
  kind: string
}

export interface ProjectTeamMember {
  id: string
  first_name: string
  last_name: string
  position: string
  previous_experience: string
  links: Link[]
  profile_picture?: string
}

export enum StepStatus {
  Open = 'Open',
  NotStarted = 'NotStarted',
  Evaluation = 'Evaluation',
  Approved = 'Approved',
  NotApproved = 'NotApproved',
  Submitted = 'Submitted',
}
