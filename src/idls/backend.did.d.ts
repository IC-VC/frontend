import type { Principal } from '@dfinity/principal'
import type { ActorMethod } from '@dfinity/agent'

export type APIError =
  | { InternalServerError: string }
  | { NotFound: string }
  | { Unauthorized: string }
  | { MultipleErrors: Array<APIError> }
  | { Forbidden: string }
  | { BadRequest: string }
export interface Account {
  owner: [] | [Principal]
  subaccount: [] | [Subaccount]
}
export type Action =
  | {
      ManageNervousSystemParameters: NervousSystemParameters
    }
  | { AddGenericNervousSystemFunction: NervousSystemFunction }
  | { ManageDappCanisterSettings: ManageDappCanisterSettings }
  | { RemoveGenericNervousSystemFunction: bigint }
  | { UpgradeSnsToNextVersion: {} }
  | { RegisterDappCanisters: RegisterDappCanisters }
  | { TransferSnsTreasuryFunds: TransferSnsTreasuryFunds }
  | { UpgradeSnsControlledCanister: UpgradeSnsControlledCanister }
  | { DeregisterDappCanisters: DeregisterDappCanisters }
  | { MintSnsTokens: MintSnsTokens }
  | { Unspecified: {} }
  | { ManageSnsMetadata: ManageSnsMetadata }
  | {
      ExecuteGenericNervousSystemFunction: ExecuteGenericNervousSystemFunction
    }
  | { ManageLedgerParameters: ManageLedgerParameters }
  | { Motion: Motion }
export type ActionAuxiliary =
  | {
      TransferSnsTreasuryFunds: MintSnsTokensActionAuxiliary
    }
  | { MintSnsTokens: MintSnsTokensActionAuxiliary }
export type AssessmentMethod = { Grade: null } | { None: null } | { Vote: null }
export interface Ballot {
  vote: number
  cast_timestamp_seconds: bigint
  voting_power: bigint
}
export interface CanisterConfig {
  max_stable_memory_size: [] | [bigint]
  owner: [] | [Principal]
  subaccount: [] | [string]
  sns_governance_id: [] | [Principal]
}
export interface CanisterConfigUpdate {
  max_stable_memory_size: [] | [bigint]
  subaccount: [] | [string]
  sns_governance_id: [] | [Principal]
}
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
export interface Decimal {
  human_readable: [] | [string]
}
export interface DecimalSubmission {
  id: string
  value: number
}
export interface DefaultFollowees {
  followees: Array<[bigint, Followees]>
}
export interface DeregisterDappCanisters {
  canister_ids: Array<Principal>
  new_controllers: Array<Principal>
}
export type DocumentType =
  | { Logo: null }
  | { ProductDemo: null }
  | { CoverPhoto: null }
  | { ExpenditurePlan: null }
  | { PitchDeck: null }
  | { FinancialModels: null }
export interface ExecuteGenericNervousSystemFunction {
  function_id: bigint
  payload: Uint8Array | number[]
}
export interface Followees {
  followees: Array<NeuronId>
}
export type FunctionType =
  | { NativeNervousSystemFunction: {} }
  | { GenericNervousSystemFunction: GenericNervousSystemFunction }
export interface GenericNervousSystemFunction {
  validator_canister_id: [] | [Principal]
  target_canister_id: [] | [Principal]
  validator_method_name: [] | [string]
  target_method_name: [] | [string]
}
export interface GovernanceError {
  error_message: string
  error_type: number
}
export interface HttpHeader {
  value: string
  name: string
}
export interface HttpResponse {
  status: bigint
  body: Uint8Array | number[]
  headers: Array<HttpHeader>
}
export interface ICVCConfig {
  grade_max_value: number
  grade_min_value: number
  assessment_duration: bigint
  open_duration: bigint
  projects_update_timer_interval: bigint
}
export interface ICVCConfigUpdate {
  grade_max_value: [] | [number]
  grade_min_value: [] | [number]
  assessment_duration: [] | [bigint]
  open_duration: [] | [bigint]
  projects_update_timer_interval: [] | [bigint]
}
export interface InitArgs {
  max_stable_memory_size: bigint
  subaccount: [] | [string]
  sns_governance_id: [] | [Principal]
}
export interface Link {
  url: string
  kind: string
}
export interface ListProposalsResponse {
  include_ballots_by_caller: [] | [boolean]
  proposals: Array<ProposalData>
}
export interface ManageDappCanisterSettings {
  freezing_threshold: [] | [bigint]
  canister_ids: Array<Principal>
  reserved_cycles_limit: [] | [bigint]
  log_visibility: [] | [number]
  memory_allocation: [] | [bigint]
  compute_allocation: [] | [bigint]
}
export interface ManageLedgerParameters {
  transfer_fee: [] | [bigint]
}
export interface ManageSnsMetadata {
  url: [] | [string]
  logo: [] | [string]
  name: [] | [string]
  description: [] | [string]
}
export interface MintSnsTokens {
  to_principal: [] | [Principal]
  to_subaccount: [] | [Subaccount]
  memo: [] | [bigint]
  amount_e8s: [] | [bigint]
}
export interface MintSnsTokensActionAuxiliary {
  valuation: [] | [Valuation]
}
export interface Motion {
  motion_text: string
}
export interface NervousSystemFunction {
  id: bigint
  name: string
  description: [] | [string]
  function_type: [] | [FunctionType]
}
export interface NervousSystemParameters {
  default_followees: [] | [DefaultFollowees]
  max_dissolve_delay_seconds: [] | [bigint]
  max_dissolve_delay_bonus_percentage: [] | [bigint]
  max_followees_per_function: [] | [bigint]
  neuron_claimer_permissions: [] | [NeuronPermissionList]
  neuron_minimum_stake_e8s: [] | [bigint]
  max_neuron_age_for_age_bonus: [] | [bigint]
  initial_voting_period_seconds: [] | [bigint]
  neuron_minimum_dissolve_delay_to_vote_seconds: [] | [bigint]
  reject_cost_e8s: [] | [bigint]
  max_proposals_to_keep_per_action: [] | [number]
  wait_for_quiet_deadline_increase_seconds: [] | [bigint]
  max_number_of_neurons: [] | [bigint]
  transaction_fee_e8s: [] | [bigint]
  max_number_of_proposals_with_ballots: [] | [bigint]
  max_age_bonus_percentage: [] | [bigint]
  neuron_grantable_permissions: [] | [NeuronPermissionList]
  voting_rewards_parameters: [] | [VotingRewardsParameters]
  maturity_modulation_disabled: [] | [boolean]
  max_number_of_principals_per_neuron: [] | [bigint]
}
export interface NeuronId {
  id: Uint8Array | number[]
}
export interface NeuronPermissionList {
  permissions: Int32Array | number[]
}
export interface Percentage {
  basis_points: [] | [bigint]
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
export interface ProjectAndStepPhase {
  id: bigint
  status: ProjectStatus
  title: string
  moto: string
  description: string
  created_at: bigint
  current_phase: bigint
  user_id: Principal
  links: Array<Link>
  step_phase: StepPhase
  update_at: [] | [bigint]
  update_by: [] | [Principal]
  team_members: Array<TeamMember>
}
export interface ProjectCreate {
  categories: BigUint64Array | bigint[]
  transaction_id: bigint
  title: string
  moto: string
  description: string
  links: Array<Link>
  team_members: Array<TeamMember>
}
export interface ProjectProposalPayload {
  phase_id: bigint
  project_id: bigint
}
export type ProjectStatus =
  | { Open: null }
  | { Draft: null }
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
export interface Proposal {
  url: string
  title: string
  action: [] | [Action]
  summary: string
}
export interface ProposalData {
  id: [] | [ProposalId]
  payload_text_rendering: [] | [string]
  action: bigint
  failure_reason: [] | [GovernanceError]
  action_auxiliary: [] | [ActionAuxiliary]
  ballots: Array<[string, Ballot]>
  minimum_yes_proportion_of_total: [] | [Percentage]
  reward_event_round: bigint
  failed_timestamp_seconds: bigint
  reward_event_end_timestamp_seconds: [] | [bigint]
  proposal_creation_timestamp_seconds: bigint
  initial_voting_period_seconds: bigint
  reject_cost_e8s: bigint
  latest_tally: [] | [Tally]
  wait_for_quiet_deadline_increase_seconds: bigint
  decided_timestamp_seconds: bigint
  proposal: [] | [Proposal]
  proposer: [] | [NeuronId]
  wait_for_quiet_state: [] | [WaitForQuietState]
  minimum_yes_proportion_of_exercised: [] | [Percentage]
  is_eligible_for_rewards: boolean
  executed_timestamp_seconds: bigint
}
export interface ProposalId {
  id: bigint
}
export interface QuestionSubmission {
  id: string
  response: [] | [string]
}
export interface RegisterDappCanisters {
  canister_ids: Array<Principal>
}
export type Result = { Ok: User } | { Err: APIError }
export type Result_1 = { Ok: UserNeuron } | { Err: APIError }
export type Result_10 = { Ok: Array<Step> } | { Err: APIError }
export type Result_11 = { Ok: Array<StepGrade> } | { Err: APIError }
export type Result_12 = { Ok: CanisterConfig } | { Err: APIError }
export type Result_13 = { Ok: ICVCConfig } | { Err: APIError }
export type Result_14 = { Ok: ProjectAndStepPhase } | { Err: APIError }
export type Result_15 = { Ok: StepPhaseProposal } | { Err: APIError }
export type Result_16 = { Ok: ListProposalsResponse } | { Err: APIError }
export type Result_17 = { Ok: ProposalData } | { Err: APIError }
export type Result_18 = { Ok: Step } | { Err: APIError }
export type Result_19 = { Ok: StepGrade } | { Err: APIError }
export type Result_2 = { Ok: Category } | { Err: APIError }
export type Result_20 = { Ok: StepPhaseGradeResult } | { Err: APIError }
export type Result_21 = { Ok: StepPhase } | { Err: APIError }
export type Result_22 = { Ok: Array<UserNeuron> } | { Err: APIError }
export type Result_23 = { Ok: StepPhaseVoteResult } | { Err: APIError }
export type Result_24 = { Ok: boolean } | { Err: APIError }
export type Result_25 = { Ok: number } | { Err: APIError }
export type Result_26 = { Ok: ProjectStatus } | { Err: APIError }
export type Result_27 = { Ok: string } | { Err: string }
export type Result_3 = { Ok: Project } | { Err: APIError }
export type Result_4 = { Ok: Array<UploadUrlResponse> } | { Err: APIError }
export type Result_5 = { Ok: Array<User> } | { Err: APIError }
export type Result_6 = { Ok: Array<Category> } | { Err: APIError }
export type Result_7 = { Ok: Array<Project> } | { Err: APIError }
export type Result_8 = { Ok: Array<StepPhaseProposal> } | { Err: APIError }
export type Result_9 = { Ok: Array<StepPhase> } | { Err: APIError }
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
  step_id: bigint
  step_phase_id: bigint
  grade: number
  project_id: bigint
  neuron_id: bigint
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
export interface StepPhaseProposal {
  step_phase_id: bigint
  proposal_id: bigint
  project_id: bigint
}
export type StepPhaseStatus =
  | { Open: null }
  | { Approved: null }
  | { NotApproved: null }
  | { Submitted: null }
  | { NotSubmitted: null }
export interface StepPhaseVoteResult {
  no: bigint
  yes: bigint
  total: bigint
  step_phase_id: bigint
  approved: boolean
  project_id: bigint
}
export interface StepUpdate {
  questions_submission: [] | [Array<QuestionSubmission>]
  checkbox_submission: [] | [Array<CheckBoxSubmission>]
  numeric_submission: [] | [Array<DecimalSubmission>]
  upload_files: [] | [Array<UploadFile>]
}
export interface Subaccount {
  subaccount: Uint8Array | number[]
}
export interface Tally {
  no: bigint
  yes: bigint
  total: bigint
  timestamp_seconds: bigint
}
export interface TeamMember {
  previous_experience: string
  profile_picture: string
  links: Array<Link>
  first_name: string
  last_name: string
  position: string
}
export interface Tokens {
  e8s: [] | [bigint]
}
export interface TransferSnsTreasuryFunds {
  from_treasury: number
  to_principal: [] | [Principal]
  to_subaccount: [] | [Subaccount]
  memo: [] | [bigint]
  amount_e8s: bigint
}
export interface TransformArgs {
  context: Uint8Array | number[]
  response: HttpResponse
}
export interface UpgradeSnsControlledCanister {
  new_canister_wasm: Uint8Array | number[]
  mode: [] | [number]
  canister_id: [] | [Principal]
  canister_upgrade_arg: [] | [Uint8Array | number[]]
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
export interface UserNeuron {
  id: bigint
  user_id: Principal
  neuron_id: string
}
export interface UserUpdate {
  name: string
}
export interface Valuation {
  token: [] | [number]
  account: [] | [Account]
  valuation_factors: [] | [ValuationFactors]
  timestamp_seconds: [] | [bigint]
}
export interface ValuationFactors {
  xdrs_per_icp: [] | [Decimal]
  icps_per_token: [] | [Decimal]
  tokens: [] | [Tokens]
}
export interface VotingRewardsParameters {
  final_reward_rate_basis_points: [] | [bigint]
  initial_reward_rate_basis_points: [] | [bigint]
  reward_rate_transition_duration_seconds: [] | [bigint]
  round_duration_seconds: [] | [bigint]
}
export interface WaitForQuietState {
  current_deadline_timestamp_seconds: bigint
}
export interface _SERVICE {
  addAdmin: ActorMethod<[UserCreate], Result>
  addUserNeuron: ActorMethod<[string], Result_1>
  createCategory: ActorMethod<[CategoryCreate], Result_2>
  createProject: ActorMethod<[ProjectCreate], Result_3>
  deleteCategory: ActorMethod<[bigint], Result_2>
  deleteProject: ActorMethod<[Principal, bigint], Result_3>
  deleteUser: ActorMethod<[Principal], Result>
  execute_project_vote_proposal: ActorMethod<
    [ProjectProposalPayload],
    undefined
  >
  generateUploadUrl: ActorMethod<
    [bigint, bigint, bigint, Array<UploadUrlRequest>],
    Result_4
  >
  getAllAdmins: ActorMethod<[], Result_5>
  getAllCategories: ActorMethod<[], Result_6>
  getAllProjects: ActorMethod<[[] | [bigint], [] | [bigint]], Result_7>
  getAllProposalsByStepPhase: ActorMethod<[bigint, bigint], Result_8>
  getAllStepPhaseByProjectId: ActorMethod<[bigint], Result_9>
  getAllSteps: ActorMethod<[bigint, bigint], Result_10>
  getAllUserStepPhaseStepsGrade: ActorMethod<[bigint, bigint], Result_11>
  getCanisterConfig: ActorMethod<[], Result_12>
  getCategoryById: ActorMethod<[bigint], Result_2>
  getICVCConfig: ActorMethod<[], Result_13>
  getProjectAndStepPhase: ActorMethod<[bigint], Result_14>
  getProjectById: ActorMethod<[bigint], Result_3>
  getProposalByPhaseId: ActorMethod<[bigint, bigint], Result_15>
  getSnsListProposals: ActorMethod<[number], Result_16>
  getSnsProposalById: ActorMethod<[bigint], Result_17>
  getStepById: ActorMethod<[bigint, bigint, bigint], Result_18>
  getStepGradepById: ActorMethod<[bigint, bigint, bigint, bigint], Result_19>
  getStepPhaseAssessmentResult: ActorMethod<[bigint, bigint], Result_20>
  getStepPhaseById: ActorMethod<[bigint, bigint], Result_21>
  getUserNeurons: ActorMethod<[], Result_22>
  getUserProjects: ActorMethod<[], Result_7>
  getVoteResultByStepPhaseId: ActorMethod<[bigint, bigint], Result_23>
  setOwner: ActorMethod<[Principal], Result_24>
  submitStepGrade: ActorMethod<
    [bigint, bigint, bigint, bigint, number],
    Result_25
  >
  submitStepPhase: ActorMethod<[bigint, bigint], Result_21>
  transform: ActorMethod<[TransformArgs], HttpResponse>
  updateICVCConfig: ActorMethod<[ICVCConfigUpdate], Result_13>
  updateProject: ActorMethod<[bigint, ProjectUpdate], Result_3>
  updateProjectStatus: ActorMethod<[Project, ProjectStatus], Result_26>
  updateStep: ActorMethod<[bigint, bigint, bigint, StepUpdate], Result_18>
  updateUser: ActorMethod<[Principal, UserUpdate], Result>
  update_canister_config: ActorMethod<[CanisterConfigUpdate], Result_12>
  validate_project_vote_proposal: ActorMethod<
    [ProjectProposalPayload],
    Result_27
  >
  validate_update_canister_config: ActorMethod<
    [CanisterConfigUpdate],
    Result_27
  >
}
