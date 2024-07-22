import type { Principal } from '@dfinity/principal'
import type { ActorMethod } from '@dfinity/agent'
import type { IDL } from '@dfinity/candid'

export type APIError =
  | { InternalServerError: string }
  | { NotFound: string }
  | { Unauthorized: string }
  | { MultipleErrors: Array<APIError> }
  | { Forbidden: string }
  | { BadRequest: string }
export type AssessmentMethod = { Grade: null } | { None: null } | { Vote: null }
export interface Category {
  id: bigint
  active: boolean
  name: string
}
export interface CategoryCreate {
  name: string
}
export interface CheckBoxSubmission {
  id: string
  value: boolean
}
export interface DecimalSubmission {
  id: string
  value: number
}
export type DocumentType =
  | { Logo: null }
  | { ProductDemo: null }
  | { CoverPhoto: null }
  | { ExpenditurePlan: null }
  | { PitchDeck: null }
  | { FinancialModels: null }
export interface HttpHeader {
  value: string
  name: string
}
export interface HttpResponse {
  status: bigint
  body: Uint8Array | number[]
  headers: Array<HttpHeader>
}
export interface Link {
  url: string
  kind: string
}
export interface Project {
  id: bigint
  categories: BigUint64Array | bigint[]
  status: ProjectStatus
  title: string
  moto: string
  description: string
  created_at: bigint
  current_phase: bigint
  user_id: Principal
  links: Array<Link>
  update_at: [] | [bigint]
  update_by: [] | [Principal]
  team_members: Array<TeamMember>
}
export interface ProjectCreate {
  categories: BigUint64Array | bigint[]
  title: string
  moto: string
  description: string
  links: Array<Link>
  team_members: Array<TeamMember>
}
export type ProjectStatus =
  | { Open: null }
  | { NotFunded: null }
  | { Funded: null }
  | { NotSubmitted: null }
export interface ProjectUpdate {
  categories: BigUint64Array | bigint[]
  title: [] | [string]
  moto: [] | [string]
  description: [] | [string]
  links: [] | [Array<Link>]
  team_members: [] | [Array<TeamMember>]
}
export interface QuestionSubmission {
  id: string
  response: [] | [string]
}
export type Result = { Ok: User } | { Err: APIError }
export type Result_1 = { Ok: Category } | { Err: APIError }
export type Result_10 = { Ok: Step } | { Err: APIError }
export type Result_11 = { Ok: StepGrade } | { Err: APIError }
export type Result_12 = { Ok: StepPhaseGradeResult } | { Err: APIError }
export type Result_13 = { Ok: StepPhase } | { Err: APIError }
export type Result_14 = { Ok: number } | { Err: APIError }
export type Result_2 = { Ok: Project } | { Err: APIError }
export type Result_3 = { Ok: Array<UploadUrlResponse> } | { Err: APIError }
export type Result_4 = { Ok: Array<User> } | { Err: APIError }
export type Result_5 = { Ok: Array<Category> } | { Err: APIError }
export type Result_6 = { Ok: Array<Project> } | { Err: APIError }
export type Result_7 = { Ok: Array<StepPhase> } | { Err: APIError }
export type Result_8 = { Ok: Array<Step> } | { Err: APIError }
export type Result_9 = { Ok: Array<StepGrade> } | { Err: APIError }
export interface Step {
  id: bigint
  grade_end_date: [] | [bigint]
  question_submission: Array<QuestionSubmission>
  update_at: [] | [bigint]
  update_by: [] | [Principal]
  step_phase_id: bigint
  checkbox_submission: Array<CheckBoxSubmission>
  decimal_submission: Array<DecimalSubmission>
  project_id: bigint
  upload_files: Array<UploadFile>
}
export interface StepGrade {
  user_id: Principal
  step_id: bigint
  step_phase_id: bigint
  grade: number
  project_id: bigint
}
export interface StepGradeResult {
  grade_avg: number
  step_id: bigint
  grades_count: bigint
}
export interface StepPhase {
  id: bigint
  end_assessment_date: bigint
  status: StepPhaseStatus
  start_assessment_date: bigint
  submit_date: [] | [bigint]
  end_open_date: bigint
  start_open_date: bigint
  assessment_method: AssessmentMethod
  project_id: bigint
}
export interface StepPhaseGradeResult {
  step_phase_id: bigint
  avg_result: number
  steps_grade_results: Array<StepGradeResult>
  project_id: bigint
  total_steps_grades_count: bigint
}
export type StepPhaseStatus =
  | { Open: null }
  | { Approved: null }
  | { NotApproved: null }
  | { Submitted: null }
  | { NotSubmitted: null }
export interface StepUpdate {
  questions_submission: [] | [Array<QuestionSubmission>]
  checkbox_submission: [] | [Array<CheckBoxSubmission>]
  numeric_submission: [] | [Array<DecimalSubmission>]
  upload_files: [] | [Array<UploadFile>]
}
export interface TeamMember {
  previous_experience: string
  profile_picture: string
  links: Array<Link>
  first_name: string
  last_name: string
  position: string
}
export interface TransformArgs {
  context: Uint8Array | number[]
  response: HttpResponse
}
export interface UploadFile {
  document_type: DocumentType
  filename: [] | [string]
  s3_key: [] | [string]
}
export interface UploadUrlRequest {
  document_type: DocumentType
  filename: string
}
export interface UploadUrlResponse {
  url: string
  document_type: DocumentType
  step_id: bigint
  step_phase_id: bigint
  project_id: bigint
}
export interface User {
  is_admin: boolean
  name: string
  user_id: Principal
}
export interface UserCreate {
  name: string
  user_id: Principal
}
export interface UserUpdate {
  name: string
}
export interface _SERVICE {
  addAdmin: ActorMethod<[UserCreate], Result>
  createCategory: ActorMethod<[CategoryCreate], Result_1>
  createProject: ActorMethod<[ProjectCreate], Result_2>
  deleteCategory: ActorMethod<[bigint], Result_1>
  deleteProject: ActorMethod<[Principal, bigint], Result_2>
  deleteUser: ActorMethod<[Principal], Result>
  generateUploadUrl: ActorMethod<
    [bigint, bigint, bigint, Array<UploadUrlRequest>],
    Result_3
  >
  getAllAdmins: ActorMethod<[], Result_4>
  getAllCategories: ActorMethod<[], Result_5>
  getAllProjects: ActorMethod<[[] | [bigint], [] | [bigint]], Result_6>
  getAllStepPhaseByProjectId: ActorMethod<[bigint], Result_7>
  getAllSteps: ActorMethod<[bigint, bigint], Result_8>
  getAllUserStepPhaseStepsGrade: ActorMethod<[bigint, bigint], Result_9>
  getCategoryById: ActorMethod<[bigint], Result_1>
  getProjectById: ActorMethod<[bigint], Result_2>
  getStepById: ActorMethod<[bigint, bigint, bigint], Result_10>
  getStepGradepById: ActorMethod<[bigint, bigint, bigint], Result_11>
  getStepPhaseAssessmentResult: ActorMethod<[bigint, bigint], Result_12>
  getStepPhaseById: ActorMethod<[bigint, bigint], Result_13>
  getUserProjects: ActorMethod<[], Result_6>
  submitStepGrade: ActorMethod<[bigint, bigint, bigint, number], Result_14>
  submitStepPhase: ActorMethod<[bigint, bigint], Result_13>
  transform: ActorMethod<[TransformArgs], HttpResponse>
  updateProject: ActorMethod<[bigint, ProjectUpdate], Result_2>
  updateStep: ActorMethod<[bigint, bigint, bigint, StepUpdate], Result_10>
  updateUser: ActorMethod<[Principal, UserUpdate], Result>
}
export declare const idlFactory: IDL.InterfaceFactory
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[]
