export const idlFactory = ({ IDL }) => {
  const APIError = IDL.Rec()
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
  const CategoryCreate = IDL.Record({ name: IDL.Text })
  const Category = IDL.Record({
    id: IDL.Nat64,
    active: IDL.Bool,
    name: IDL.Text,
  })
  const Result_1 = IDL.Variant({ Ok: Category, Err: APIError })
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
    title: IDL.Text,
    moto: IDL.Text,
    description: IDL.Text,
    links: IDL.Vec(Link),
    team_members: IDL.Vec(TeamMember),
  })
  const ProjectStatus = IDL.Variant({
    Open: IDL.Null,
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
  const Result_2 = IDL.Variant({ Ok: Project, Err: APIError })
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
  const Result_3 = IDL.Variant({
    Ok: IDL.Vec(UploadUrlResponse),
    Err: APIError,
  })
  const Result_4 = IDL.Variant({ Ok: IDL.Vec(User), Err: APIError })
  const Result_5 = IDL.Variant({ Ok: IDL.Vec(Category), Err: APIError })
  const Result_6 = IDL.Variant({ Ok: IDL.Vec(Project), Err: APIError })
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
  const Result_7 = IDL.Variant({ Ok: IDL.Vec(StepPhase), Err: APIError })
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
  const Result_8 = IDL.Variant({ Ok: IDL.Vec(Step), Err: APIError })
  const StepGrade = IDL.Record({
    user_id: IDL.Principal,
    step_id: IDL.Nat64,
    step_phase_id: IDL.Nat64,
    grade: IDL.Nat32,
    project_id: IDL.Nat64,
  })
  const Result_9 = IDL.Variant({ Ok: IDL.Vec(StepGrade), Err: APIError })
  const Result_10 = IDL.Variant({ Ok: Step, Err: APIError })
  const Result_11 = IDL.Variant({ Ok: StepGrade, Err: APIError })
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
  const Result_12 = IDL.Variant({
    Ok: StepPhaseGradeResult,
    Err: APIError,
  })
  const Result_13 = IDL.Variant({ Ok: StepPhase, Err: APIError })
  const Result_14 = IDL.Variant({ Ok: IDL.Nat32, Err: APIError })
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
  const ProjectUpdate = IDL.Record({
    categories: IDL.Vec(IDL.Nat64),
    title: IDL.Opt(IDL.Text),
    moto: IDL.Opt(IDL.Text),
    description: IDL.Opt(IDL.Text),
    links: IDL.Opt(IDL.Vec(Link)),
    team_members: IDL.Opt(IDL.Vec(TeamMember)),
  })
  const StepUpdate = IDL.Record({
    questions_submission: IDL.Opt(IDL.Vec(QuestionSubmission)),
    checkbox_submission: IDL.Opt(IDL.Vec(CheckBoxSubmission)),
    numeric_submission: IDL.Opt(IDL.Vec(DecimalSubmission)),
    upload_files: IDL.Opt(IDL.Vec(UploadFile)),
  })
  const UserUpdate = IDL.Record({ name: IDL.Text })
  return IDL.Service({
    addAdmin: IDL.Func([UserCreate], [Result], []),
    createCategory: IDL.Func([CategoryCreate], [Result_1], []),
    createProject: IDL.Func([ProjectCreate], [Result_2], []),
    deleteCategory: IDL.Func([IDL.Nat64], [Result_1], []),
    deleteProject: IDL.Func([IDL.Principal, IDL.Nat64], [Result_2], []),
    deleteUser: IDL.Func([IDL.Principal], [Result], []),
    generateUploadUrl: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Vec(UploadUrlRequest)],
      [Result_3],
      []
    ),
    getAllAdmins: IDL.Func([], [Result_4], ['query']),
    getAllCategories: IDL.Func([], [Result_5], []),
    getAllProjects: IDL.Func(
      [IDL.Opt(IDL.Nat64), IDL.Opt(IDL.Nat64)],
      [Result_6],
      ['query']
    ),
    getAllStepPhaseByProjectId: IDL.Func([IDL.Nat64], [Result_7], ['query']),
    getAllSteps: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_8], ['query']),
    getAllUserStepPhaseStepsGrade: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [Result_9],
      ['query']
    ),
    getCategoryById: IDL.Func([IDL.Nat64], [Result_1], []),
    getProjectById: IDL.Func([IDL.Nat64], [Result_2], ['query']),
    getStepById: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64],
      [Result_10],
      ['query']
    ),
    getStepGradepById: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64],
      [Result_11],
      ['query']
    ),
    getStepPhaseAssessmentResult: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [Result_12],
      ['query']
    ),
    getStepPhaseById: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_13], ['query']),
    getUserProjects: IDL.Func([], [Result_6], ['query']),
    submitStepGrade: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat32],
      [Result_14],
      []
    ),
    submitStepPhase: IDL.Func([IDL.Nat64, IDL.Nat64], [Result_13], []),
    transform: IDL.Func([TransformArgs], [HttpResponse], ['query']),
    updateProject: IDL.Func([IDL.Nat64, ProjectUpdate], [Result_2], []),
    updateStep: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, StepUpdate],
      [Result_10],
      []
    ),
    updateUser: IDL.Func([IDL.Principal, UserUpdate], [Result], []),
  })
}
export const init = ({ IDL }) => {
  return []
}
