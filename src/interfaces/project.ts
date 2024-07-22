export interface ProjectTeamMember {
  id: string
  first_name: string
  last_name: string
  position: string
  previous_experience: string
  github?: string
  linkedin?: string
  twitter?: string
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
