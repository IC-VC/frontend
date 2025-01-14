export const idlFactory = ({ IDL }) => {
  const APIError = IDL.Rec()
  const InitArgs = IDL.Record({
    max_stable_memory_size: IDL.Nat64,
    subaccount: IDL.Opt(IDL.Text),
    sns_governance_id: IDL.Opt(IDL.Principal),
  })
  const UserCreate = IDL.Record({
    name: IDL.Text,
    user_id: IDL.Principal,
  })
  const User = IDL.Record({
    is_admin: IDL.Bool,
    name: IDL.Text,
    user_id: IDL.Principal,
  })
  APIError.fill(
    IDL.Variant({
      InternalServerError: IDL.Text,
      NotFound: IDL.Text,
      Unauthorized: IDL.Text,
      MultipleErrors: IDL.Vec(APIError),
      Forbidden: IDL.Text,
      BadRequest: IDL.Text,
    })
  )
  const Result = IDL.Variant({ Ok: User, Err: APIError })
  const UserNeuron = IDL.Record({
    id: IDL.Nat64,
    user_id: IDL.Principal,
    neuron_id: IDL.Text,
  })
  const Result_1 = IDL.Variant({ Ok: UserNeuron, Err: APIError })
  const CategoryCreate = IDL.Record({ name: IDL.Text })
  const Category = IDL.Record({
    id: IDL.Nat64,
    active: IDL.Bool,
    name: IDL.Text,
  })
  const Result_2 = IDL.Variant({ Ok: Category, Err: APIError })
  const Link = IDL.Record({ url: IDL.Text, kind: IDL.Text })
  const TeamMember = IDL.Record({
    previous_experience: IDL.Text,
    profile_picture: IDL.Text,
    links: IDL.Vec(Link),
    first_name: IDL.Text,
    last_name: IDL.Text,
    position: IDL.Text,
  })
  const ProjectCreate = IDL.Record({
    categories: IDL.Vec(IDL.Nat64),
    transaction_id: IDL.Nat64,
    title: IDL.Text,
    moto: IDL.Text,
    description: IDL.Text,
    links: IDL.Vec(Link),
    team_members: IDL.Vec(TeamMember),
  })
  const ProjectStatus = IDL.Variant({
    Open: IDL.Null,
    Draft: IDL.Null,
    NotFunded: IDL.Null,
    Funded: IDL.Null,
    NotSubmitted: IDL.Null,
  })
  const Project = IDL.Record({
    id: IDL.Nat64,
    categories: IDL.Vec(IDL.Nat64),
    status: ProjectStatus,
    title: IDL.Text,
    moto: IDL.Text,
    description: IDL.Text,
    created_at: IDL.Nat64,
    current_phase: IDL.Nat64,
    user_id: IDL.Principal,
    links: IDL.Vec(Link),
    update_at: IDL.Opt(IDL.Nat64),
    update_by: IDL.Opt(IDL.Principal),
    team_members: IDL.Vec(TeamMember),
  })
  const Result_3 = IDL.Variant({ Ok: Project, Err: APIError })
  const ProjectProposalPayload = IDL.Record({
    phase_id: IDL.Nat64,
    project_id: IDL.Nat64,
  })
  const DocumentType = IDL.Variant({
    Logo: IDL.Null,
    ProductDemo: IDL.Null,
    CoverPhoto: IDL.Null,
    ExpenditurePlan: IDL.Null,
    PitchDeck: IDL.Null,
    FinancialModels: IDL.Null,
  })
  const UploadUrlRequest = IDL.Record({
    document_type: DocumentType,
    filename: IDL.Text,
  })
  const UploadUrlResponse = IDL.Record({
    url: IDL.Text,
    document_type: DocumentType,
    step_id: IDL.Nat64,
    step_phase_id: IDL.Nat64,
    project_id: IDL.Nat64,
  })
  const Result_4 = IDL.Variant({
    Ok: IDL.Vec(UploadUrlResponse),
    Err: APIError,
  })
  const Result_5 = IDL.Variant({ Ok: IDL.Vec(User), Err: APIError })
  const Result_6 = IDL.Variant({ Ok: IDL.Vec(Category), Err: APIError })
  const Result_7 = IDL.Variant({ Ok: IDL.Vec(Project), Err: APIError })
  const StepPhaseProposal = IDL.Record({
    step_phase_id: IDL.Nat64,
    proposal_id: IDL.Nat64,
    project_id: IDL.Nat64,
  })
  const Result_8 = IDL.Variant({
    Ok: IDL.Vec(StepPhaseProposal),
    Err: APIError,
  })
  const StepPhaseStatus = IDL.Variant({
    Open: IDL.Null,
    Approved: IDL.Null,
    NotApproved: IDL.Null,
    Submitted: IDL.Null,
    NotSubmitted: IDL.Null,
  })
  const AssessmentMethod = IDL.Variant({
    Grade: IDL.Null,
    None: IDL.Null,
    Vote: IDL.Null,
  })
  const StepPhase = IDL.Record({
    id: IDL.Nat64,
    end_assessment_date: IDL.Nat64,
    status: StepPhaseStatus,
    start_assessment_date: IDL.Nat64,
    submit_date: IDL.Opt(IDL.Nat64),
    end_open_date: IDL.Nat64,
    start_open_date: IDL.Nat64,
    assessment_method: AssessmentMethod,
    project_id: IDL.Nat64,
  })
  const Result_9 = IDL.Variant({ Ok: IDL.Vec(StepPhase), Err: APIError })
  const QuestionSubmission = IDL.Record({
    id: IDL.Text,
    response: IDL.Opt(IDL.Text),
  })
  const CheckBoxSubmission = IDL.Record({
    id: IDL.Text,
    value: IDL.Bool,
  })
  const DecimalSubmission = IDL.Record({
    id: IDL.Text,
    value: IDL.Float64,
  })
  const UploadFile = IDL.Record({
    document_type: DocumentType,
    filename: IDL.Opt(IDL.Text),
    s3_key: IDL.Opt(IDL.Text),
  })
  const Step = IDL.Record({
    id: IDL.Nat64,
    grade_end_date: IDL.Opt(IDL.Nat64),
    question_submission: IDL.Vec(QuestionSubmission),
    update_at: IDL.Opt(IDL.Nat64),
    update_by: IDL.Opt(IDL.Principal),
    step_phase_id: IDL.Nat64,
    checkbox_submission: IDL.Vec(CheckBoxSubmission),
    decimal_submission: IDL.Vec(DecimalSubmission),
    project_id: IDL.Nat64,
    upload_files: IDL.Vec(UploadFile),
  })
  const Result_10 = IDL.Variant({ Ok: IDL.Vec(Step), Err: APIError })
  const StepGrade = IDL.Record({
    step_id: IDL.Nat64,
    step_phase_id: IDL.Nat64,
    grade: IDL.Nat32,
    project_id: IDL.Nat64,
    neuron_id: IDL.Nat64,
  })
  const Result_11 = IDL.Variant({
    Ok: IDL.Vec(StepGrade),
    Err: APIError,
  })
  const CanisterConfig = IDL.Record({
    max_stable_memory_size: IDL.Opt(IDL.Nat64),
    owner: IDL.Opt(IDL.Principal),
    subaccount: IDL.Opt(IDL.Text),
    sns_governance_id: IDL.Opt(IDL.Principal),
  })
  const Result_12 = IDL.Variant({ Ok: CanisterConfig, Err: APIError })
  const ICVCConfig = IDL.Record({
    grade_max_value: IDL.Nat32,
    grade_min_value: IDL.Nat32,
    assessment_duration: IDL.Nat64,
    open_duration: IDL.Nat64,
    projects_update_timer_interval: IDL.Nat64,
  })
  const Result_13 = IDL.Variant({ Ok: ICVCConfig, Err: APIError })
  const ProjectAndStepPhase = IDL.Record({
    id: IDL.Nat64,
    status: ProjectStatus,
    title: IDL.Text,
    moto: IDL.Text,
    description: IDL.Text,
    created_at: IDL.Nat64,
    current_phase: IDL.Nat64,
    user_id: IDL.Principal,
    links: IDL.Vec(Link),
    step_phase: StepPhase,
    update_at: IDL.Opt(IDL.Nat64),
    update_by: IDL.Opt(IDL.Principal),
    team_members: IDL.Vec(TeamMember),
  })
  const Result_14 = IDL.Variant({
    Ok: ProjectAndStepPhase,
    Err: APIError,
  })
  const Result_15 = IDL.Variant({ Ok: StepPhaseProposal, Err: APIError })
  const ProposalId = IDL.Record({ id: IDL.Nat64 })
  const GovernanceError = IDL.Record({
    error_message: IDL.Text,
    error_type: IDL.Int32,
  })
  const Subaccount = IDL.Record({ subaccount: IDL.Vec(IDL.Nat8) })
  const Account = IDL.Record({
    owner: IDL.Opt(IDL.Principal),
    subaccount: IDL.Opt(Subaccount),
  })
  const Decimal = IDL.Record({ human_readable: IDL.Opt(IDL.Text) })
  const Tokens = IDL.Record({ e8s: IDL.Opt(IDL.Nat64) })
  const ValuationFactors = IDL.Record({
    xdrs_per_icp: IDL.Opt(Decimal),
    icps_per_token: IDL.Opt(Decimal),
    tokens: IDL.Opt(Tokens),
  })
  const Valuation = IDL.Record({
    token: IDL.Opt(IDL.Int32),
    account: IDL.Opt(Account),
    valuation_factors: IDL.Opt(ValuationFactors),
    timestamp_seconds: IDL.Opt(IDL.Nat64),
  })
  const MintSnsTokensActionAuxiliary = IDL.Record({
    valuation: IDL.Opt(Valuation),
  })
  const ActionAuxiliary = IDL.Variant({
    TransferSnsTreasuryFunds: MintSnsTokensActionAuxiliary,
    MintSnsTokens: MintSnsTokensActionAuxiliary,
  })
  const Ballot = IDL.Record({
    vote: IDL.Int32,
    cast_timestamp_seconds: IDL.Nat64,
    voting_power: IDL.Nat64,
  })
  const Percentage = IDL.Record({ basis_points: IDL.Opt(IDL.Nat64) })
  const Tally = IDL.Record({
    no: IDL.Nat64,
    yes: IDL.Nat64,
    total: IDL.Nat64,
    timestamp_seconds: IDL.Nat64,
  })
  const NeuronId = IDL.Record({ id: IDL.Vec(IDL.Nat8) })
  const Followees = IDL.Record({ followees: IDL.Vec(NeuronId) })
  const DefaultFollowees = IDL.Record({
    followees: IDL.Vec(IDL.Tuple(IDL.Nat64, Followees)),
  })
  const NeuronPermissionList = IDL.Record({
    permissions: IDL.Vec(IDL.Int32),
  })
  const VotingRewardsParameters = IDL.Record({
    final_reward_rate_basis_points: IDL.Opt(IDL.Nat64),
    initial_reward_rate_basis_points: IDL.Opt(IDL.Nat64),
    reward_rate_transition_duration_seconds: IDL.Opt(IDL.Nat64),
    round_duration_seconds: IDL.Opt(IDL.Nat64),
  })
  const NervousSystemParameters = IDL.Record({
    default_followees: IDL.Opt(DefaultFollowees),
    max_dissolve_delay_seconds: IDL.Opt(IDL.Nat64),
    max_dissolve_delay_bonus_percentage: IDL.Opt(IDL.Nat64),
    max_followees_per_function: IDL.Opt(IDL.Nat64),
    neuron_claimer_permissions: IDL.Opt(NeuronPermissionList),
    neuron_minimum_stake_e8s: IDL.Opt(IDL.Nat64),
    max_neuron_age_for_age_bonus: IDL.Opt(IDL.Nat64),
    initial_voting_period_seconds: IDL.Opt(IDL.Nat64),
    neuron_minimum_dissolve_delay_to_vote_seconds: IDL.Opt(IDL.Nat64),
    reject_cost_e8s: IDL.Opt(IDL.Nat64),
    max_proposals_to_keep_per_action: IDL.Opt(IDL.Nat32),
    wait_for_quiet_deadline_increase_seconds: IDL.Opt(IDL.Nat64),
    max_number_of_neurons: IDL.Opt(IDL.Nat64),
    transaction_fee_e8s: IDL.Opt(IDL.Nat64),
    max_number_of_proposals_with_ballots: IDL.Opt(IDL.Nat64),
    max_age_bonus_percentage: IDL.Opt(IDL.Nat64),
    neuron_grantable_permissions: IDL.Opt(NeuronPermissionList),
    voting_rewards_parameters: IDL.Opt(VotingRewardsParameters),
    maturity_modulation_disabled: IDL.Opt(IDL.Bool),
    max_number_of_principals_per_neuron: IDL.Opt(IDL.Nat64),
  })
  const GenericNervousSystemFunction = IDL.Record({
    validator_canister_id: IDL.Opt(IDL.Principal),
    target_canister_id: IDL.Opt(IDL.Principal),
    validator_method_name: IDL.Opt(IDL.Text),
    target_method_name: IDL.Opt(IDL.Text),
  })
  const FunctionType = IDL.Variant({
    NativeNervousSystemFunction: IDL.Record({}),
    GenericNervousSystemFunction: GenericNervousSystemFunction,
  })
  const NervousSystemFunction = IDL.Record({
    id: IDL.Nat64,
    name: IDL.Text,
    description: IDL.Opt(IDL.Text),
    function_type: IDL.Opt(FunctionType),
  })
  const ManageDappCanisterSettings = IDL.Record({
    freezing_threshold: IDL.Opt(IDL.Nat64),
    canister_ids: IDL.Vec(IDL.Principal),
    reserved_cycles_limit: IDL.Opt(IDL.Nat64),
    log_visibility: IDL.Opt(IDL.Int32),
    memory_allocation: IDL.Opt(IDL.Nat64),
    compute_allocation: IDL.Opt(IDL.Nat64),
  })
  const RegisterDappCanisters = IDL.Record({
    canister_ids: IDL.Vec(IDL.Principal),
  })
  const TransferSnsTreasuryFunds = IDL.Record({
    from_treasury: IDL.Int32,
    to_principal: IDL.Opt(IDL.Principal),
    to_subaccount: IDL.Opt(Subaccount),
    memo: IDL.Opt(IDL.Nat64),
    amount_e8s: IDL.Nat64,
  })
  const UpgradeSnsControlledCanister = IDL.Record({
    new_canister_wasm: IDL.Vec(IDL.Nat8),
    mode: IDL.Opt(IDL.Int32),
    canister_id: IDL.Opt(IDL.Principal),
    canister_upgrade_arg: IDL.Opt(IDL.Vec(IDL.Nat8)),
  })
  const DeregisterDappCanisters = IDL.Record({
    canister_ids: IDL.Vec(IDL.Principal),
    new_controllers: IDL.Vec(IDL.Principal),
  })
  const MintSnsTokens = IDL.Record({
    to_principal: IDL.Opt(IDL.Principal),
    to_subaccount: IDL.Opt(Subaccount),
    memo: IDL.Opt(IDL.Nat64),
    amount_e8s: IDL.Opt(IDL.Nat64),
  })
  const ManageSnsMetadata = IDL.Record({
    url: IDL.Opt(IDL.Text),
    logo: IDL.Opt(IDL.Text),
    name: IDL.Opt(IDL.Text),
    description: IDL.Opt(IDL.Text),
  })
  const ExecuteGenericNervousSystemFunction = IDL.Record({
    function_id: IDL.Nat64,
    payload: IDL.Vec(IDL.Nat8),
  })
  const ManageLedgerParameters = IDL.Record({
    transfer_fee: IDL.Opt(IDL.Nat64),
  })
  const Motion = IDL.Record({ motion_text: IDL.Text })
  const Action = IDL.Variant({
    ManageNervousSystemParameters: NervousSystemParameters,
    AddGenericNervousSystemFunction: NervousSystemFunction,
    ManageDappCanisterSettings: ManageDappCanisterSettings,
    RemoveGenericNervousSystemFunction: IDL.Nat64,
    UpgradeSnsToNextVersion: IDL.Record({}),
    RegisterDappCanisters: RegisterDappCanisters,
    TransferSnsTreasuryFunds: TransferSnsTreasuryFunds,
    UpgradeSnsControlledCanister: UpgradeSnsControlledCanister,
    DeregisterDappCanisters: DeregisterDappCanisters,
    MintSnsTokens: MintSnsTokens,
    Unspecified: IDL.Record({}),
    ManageSnsMetadata: ManageSnsMetadata,
    ExecuteGenericNervousSystemFunction: ExecuteGenericNervousSystemFunction,
    ManageLedgerParameters: ManageLedgerParameters,
    Motion: Motion,
  })
  const Proposal = IDL.Record({
    url: IDL.Text,
    title: IDL.Text,
    action: IDL.Opt(Action),
    summary: IDL.Text,
  })
  const WaitForQuietState = IDL.Record({
    current_deadline_timestamp_seconds: IDL.Nat64,
  })
  const ProposalData = IDL.Record({
    id: IDL.Opt(ProposalId),
    payload_text_rendering: IDL.Opt(IDL.Text),
    action: IDL.Nat64,
    failure_reason: IDL.Opt(GovernanceError),
    action_auxiliary: IDL.Opt(ActionAuxiliary),
    ballots: IDL.Vec(IDL.Tuple(IDL.Text, Ballot)),
    minimum_yes_proportion_of_total: IDL.Opt(Percentage),
    reward_event_round: IDL.Nat64,
    failed_timestamp_seconds: IDL.Nat64,
    reward_event_end_timestamp_seconds: IDL.Opt(IDL.Nat64),
    proposal_creation_timestamp_seconds: IDL.Nat64,
    initial_voting_period_seconds: IDL.Nat64,
    reject_cost_e8s: IDL.Nat64,
    latest_tally: IDL.Opt(Tally),
    wait_for_quiet_deadline_increase_seconds: IDL.Nat64,
    decided_timestamp_seconds: IDL.Nat64,
    proposal: IDL.Opt(Proposal),
    proposer: IDL.Opt(NeuronId),
    wait_for_quiet_state: IDL.Opt(WaitForQuietState),
    minimum_yes_proportion_of_exercised: IDL.Opt(Percentage),
    is_eligible_for_rewards: IDL.Bool,
    executed_timestamp_seconds: IDL.Nat64,
  })
  const ListProposalsResponse = IDL.Record({
    include_ballots_by_caller: IDL.Opt(IDL.Bool),
    proposals: IDL.Vec(ProposalData),
  })
  const Result_16 = IDL.Variant({
    Ok: ListProposalsResponse,
    Err: APIError,
  })
  const Result_17 = IDL.Variant({ Ok: ProposalData, Err: APIError })
  const Result_18 = IDL.Variant({ Ok: Step, Err: APIError })
  const Result_19 = IDL.Variant({ Ok: StepGrade, Err: APIError })
  const StepGradeResult = IDL.Record({
    grade_avg: IDL.Float64,
    step_id: IDL.Nat64,
    grades_count: IDL.Nat64,
  })
  const StepPhaseGradeResult = IDL.Record({
    step_phase_id: IDL.Nat64,
    avg_result: IDL.Float64,
    steps_grade_results: IDL.Vec(StepGradeResult),
    project_id: IDL.Nat64,
    total_steps_grades_count: IDL.Nat64,
  })
  const Result_20 = IDL.Variant({
    Ok: StepPhaseGradeResult,
    Err: APIError,
  })
  const Result_21 = IDL.Variant({ Ok: StepPhase, Err: APIError })
  const Result_22 = IDL.Variant({
    Ok: IDL.Vec(UserNeuron),
    Err: APIError,
  })
  const StepPhaseVoteResult = IDL.Record({
    no: IDL.Nat64,
    yes: IDL.Nat64,
    total: IDL.Nat64,
    step_phase_id: IDL.Nat64,
    approved: IDL.Bool,
    project_id: IDL.Nat64,
  })
  const Result_23 = IDL.Variant({
    Ok: StepPhaseVoteResult,
    Err: APIError,
  })
  const Result_24 = IDL.Variant({ Ok: IDL.Bool, Err: APIError })
  const Result_25 = IDL.Variant({ Ok: IDL.Nat32, Err: APIError })
  const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text })
  const HttpResponse = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HttpHeader),
  })
  const TransformArgs = IDL.Record({
    context: IDL.Vec(IDL.Nat8),
    response: HttpResponse,
  })
  const ICVCConfigUpdate = IDL.Record({
    grade_max_value: IDL.Opt(IDL.Nat32),
    grade_min_value: IDL.Opt(IDL.Nat32),
    assessment_duration: IDL.Opt(IDL.Nat64),
    open_duration: IDL.Opt(IDL.Nat64),
    projects_update_timer_interval: IDL.Opt(IDL.Nat64),
  })
  const ProjectUpdate = IDL.Record({
    categories: IDL.Vec(IDL.Nat64),
    title: IDL.Opt(IDL.Text),
    moto: IDL.Opt(IDL.Text),
    description: IDL.Opt(IDL.Text),
    links: IDL.Opt(IDL.Vec(Link)),
    team_members: IDL.Opt(IDL.Vec(TeamMember)),
  })
  const Result_26 = IDL.Variant({ Ok: ProjectStatus, Err: APIError })
  const StepUpdate = IDL.Record({
    questions_submission: IDL.Opt(IDL.Vec(QuestionSubmission)),
    checkbox_submission: IDL.Opt(IDL.Vec(CheckBoxSubmission)),
    numeric_submission: IDL.Opt(IDL.Vec(DecimalSubmission)),
    upload_files: IDL.Opt(IDL.Vec(UploadFile)),
  })
  const UserUpdate = IDL.Record({ name: IDL.Text })
  const CanisterConfigUpdate = IDL.Record({
    max_stable_memory_size: IDL.Opt(IDL.Nat64),
    subaccount: IDL.Opt(IDL.Text),
    sns_governance_id: IDL.Opt(IDL.Principal),
  })
  const Result_27 = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text })
  return IDL.Service({
    addAdmin: IDL.Func([UserCreate], [Result], []),
    addUserNeuron: IDL.Func([IDL.Text], [Result_1], []),
    createCategory: IDL.Func([CategoryCreate], [Result_2], []),
    createProject: IDL.Func([ProjectCreate], [Result_3], []),
    deleteCategory: IDL.Func([IDL.Nat64], [Result_2], []),
    deleteProject: IDL.Func([IDL.Principal, IDL.Nat64], [Result_3], []),
    deleteUser: IDL.Func([IDL.Principal], [Result], []),
    execute_project_vote_proposal: IDL.Func([ProjectProposalPayload], [], []),
    generateUploadUrl: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Vec(UploadUrlRequest)],
      [Result_4],
      []
    ),
    getAllAdmins: IDL.Func([], [Result_5], ['query']),
    getAllCategories: IDL.Func([], [Result_6], ['query']),
    getAllProjects: IDL.Func(
      [IDL.Opt(IDL.Nat64), IDL.Opt(IDL.Nat64)],
      [Result_7],
      ['query']
    ),
    getAllProposalsByStepPhase: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [Result_8],
      ['query']
    ),
    getAllStepPhaseByProjectId: IDL.Func([IDL.Nat64], [Result_9], ['query']),
    getAllSteps: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_10], ['query']),
    getAllUserStepPhaseStepsGrade: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [Result_11],
      ['query']
    ),
    getCanisterConfig: IDL.Func([], [Result_12], ['query']),
    getCategoryById: IDL.Func([IDL.Nat64], [Result_2], ['query']),
    getICVCConfig: IDL.Func([], [Result_13], ['query']),
    getProjectAndStepPhase: IDL.Func([IDL.Nat64], [Result_14], ['query']),
    getProjectById: IDL.Func([IDL.Nat64], [Result_3], ['query']),
    getProposalByPhaseId: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [Result_15],
      ['query']
    ),
    getSnsListProposals: IDL.Func([IDL.Nat32], [Result_16], ['query']),
    getSnsProposalById: IDL.Func([IDL.Nat64], [Result_17], ['query']),
    getStepById: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64],
      [Result_18],
      ['query']
    ),
    getStepGradepById: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64],
      [Result_19],
      ['query']
    ),
    getStepPhaseAssessmentResult: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [Result_20],
      ['query']
    ),
    getStepPhaseById: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_21], ['query']),
    getUserNeurons: IDL.Func([], [Result_22], ['query']),
    getUserProjects: IDL.Func([], [Result_7], ['query']),
    getVoteResultByStepPhaseId: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [Result_23],
      ['query']
    ),
    setOwner: IDL.Func([IDL.Principal], [Result_24], []),
    submitStepGrade: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat32],
      [Result_25],
      []
    ),
    submitStepPhase: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_21], []),
    transform: IDL.Func([TransformArgs], [HttpResponse], ['query']),
    updateICVCConfig: IDL.Func([ICVCConfigUpdate], [Result_13], []),
    updateProject: IDL.Func([IDL.Nat64, ProjectUpdate], [Result_3], []),
    updateProjectStatus: IDL.Func([Project, ProjectStatus], [Result_26], []),
    updateStep: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, StepUpdate],
      [Result_18],
      []
    ),
    updateUser: IDL.Func([IDL.Principal, UserUpdate], [Result], []),
    update_canister_config: IDL.Func([CanisterConfigUpdate], [Result_12], []),
    validate_project_vote_proposal: IDL.Func(
      [ProjectProposalPayload],
      [Result_27],
      []
    ),
    validate_update_canister_config: IDL.Func(
      [CanisterConfigUpdate],
      [Result_27],
      []
    ),
  })
}
export const init = ({ IDL }) => {
  const InitArgs = IDL.Record({
    max_stable_memory_size: IDL.Nat64,
    subaccount: IDL.Opt(IDL.Text),
    sns_governance_id: IDL.Opt(IDL.Principal),
  })
  return [IDL.Opt(InitArgs)]
}
