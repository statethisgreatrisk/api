export interface Auth {
    action: 'signup' | 'resend' | 'confirm' | 'forgot' | 'reset' | 'login' | 'refresh' | 'logout' | 'check';
    success: boolean;
    message: string;
}

export interface Service {
    name: string;
    icon: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface Arg {
    _id: string;
    argtypes: string[];
    placeholder: string;
    placeholderWidth: number;
    value: string;
}

export interface Argtype {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    name: string;
    regex: string;
}

export interface WorkflowRow {
    _id: string;
    appId: string;
    pairId: string;
    indents: number;
    variables: Arg[];
    args: Arg[];
    returns: Arg[];
    schemas: Arg[];
}

export interface WorkflowVersion {
    _id: string;
    version: number;
    rows: WorkflowRow[];
}

export interface Workflow {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    rows: WorkflowRow[];
    versionId: string;
    versions: WorkflowVersion[];
}

export type WorkflowExport = Omit<Workflow, 'rows'>;

export interface CodeVersion {
    _id: string;
    version: number;
    code: string;
}

export interface Code {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    code: string;
    versionId: string;
    versions: CodeVersion[];
}

export type CodeExport = Omit<Code, 'code'>;

export interface CodeData {
    code: string;
    name: string;
    version: string | number;
    versionId: string;
    versionStatus: string;
}

export interface ChatMessage {
    _id: string;
    role: 'system' | 'user' | 'assistant' | 'error';
    content: string;
}

export interface Chat {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    type: 'chat';
    messages: ChatMessage[];
    modelId: string;
    variableId: string;
    inputTokens: number;
    outputTokens: number;
}

export interface RequestParameter {
    _id: string;
    active: boolean;
    key: string;
    value: string;
}

export interface RequestHeader {
    _id: string;
    active: boolean;
    key: string;
    value: string;
}

export interface RequestBodyForm {
    _id: string;
    active: boolean;
    parameter: string;
    value: string;
    file: string;
}

export interface App {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    hidden: boolean;
    name: string;
    method: string;
    variables: Arg[];
    args: Arg[];
    returns: Arg[];
    schemas: Arg[];
}

export interface AppSelect {
    app: App;
    below: boolean;
}

export interface Project {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    name: string;
}

export interface API {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    workflowId: string;
    codeId: string;
    action: 'get' | 'post' | 'put' | 'delete';
    url: string;
    validators: string[];
}

export interface Storage {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    schemaId: string;
}

export interface Schema {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    schema: string;
    version: number;
    valid: boolean;
}

export interface Validator {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    validator: string;
    valid: boolean;
}

export interface Fn {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    fn: string;
}

export interface Obj {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    obj: string;
}

export interface Arr {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    arr: string;
}

export interface Request {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    action: 'get' | 'post' | 'put' | 'delete';
    url: string;
    parameters: RequestParameter[];
    headers: RequestHeader[];
    contentType: 'none' | 'json' | 'form' | 'text';
    authorizationType: 'none' | 'apiKey' | 'basicAuth' | 'bearer';
    apiKeyPassBy: 'headers' | 'queryParameters';
    bodyJson: string;
    bodyText: string;
    bodyForm: RequestBodyForm[];
    apiKeyKey: string;
    apiKeyValue: string;
    basicAuthUsername: string;
    basicAuthPassword: string;
    bearerToken: string;
}

export interface Variable {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    value: string;
    put: boolean;
}

export interface Websocket {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
}

export interface Queue {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    workflowId: string;
}

export interface Scheduler {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    workflowId: string;
    cron: string;
    cronType: string;
    cronHour: number;
    cronMinute: number;
    cronTimezone: string;
}

export interface Register {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    version: string;
}

export interface DocumentBase {
    _id: string;
    userId: string;
    projectId: string;
    storageId: string;
    date: string;
    active: boolean;
    version: number;
}

export type Document = DocumentBase & {
    [key: string]: any;
}

export interface Instance {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
}

export interface Deploy {
    _id: string;
    userId: string;
    projectId: string;
    instanceId: string;
    date: string;
    active: boolean;
    type: 'standard';
    ec2Id: string;
    ipAddress: string;
    running: boolean;
    start: string;
    stop: string;
}

export interface DeployStatus {
    status: string;
}

export interface Log {
    _id: string;
    userId: string;
    projectId: string;
    deployId: string;
    date: string;
    active: boolean;
    logs: string[];
}

export interface Job {
    _id: string;
    userId: string;
    projectId: string;
    deployId: string;
    workflowId: string;
    jobId: string;
    apiId: string;
    // queueId: string;
    // schedulerId: string;
    active: boolean;
    date: string;
    type: 'start' | 'stop';
    activity: string;
    error: boolean;
}

export interface Key {
    _id: string;
    userId: string;
    projectId: string;
    apiKey: string;
    apiHash: string;
    date: string;
    active: boolean;
    name: string;
    admin: boolean;
}

export interface Billing {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    debit: number;
    credit: number;
}

export interface Usage {
    _id: string;
    userId: string;
    projectId: string;
    deployId: string;
    date: string;
    active: boolean;
    received: number;
    transmitted: number;
    requestSize: number;
    responseSize: number;
    responseDuration: number;
    documentReads: number;
    documentWrites: number;
    requests: string[];
    documents: string[];
}

export interface Sub {
    _id: string;
    userId: string;
    projectId: string;
    poolId: string;
    sub: string;
    date: string;
    active: boolean;
    name: string;
    email: string;
}

export interface Pool {
    _id: string;
    userId: string;
    projectId: string;
    cognitoPoolId: string;
    date: string;
    active: boolean;
    callbackUrl: string,
    logoutUrl: string,
}

export interface View {
    service: string;
    serviceId: string;
    window: string;
    windowId: string;
}

export interface Toast {
    type: 'info' | 'success' | 'alert';
    text: string;
}

export interface DeleteData {
    service: string;
    serviceData: Object;
    deleteFn: () => void;
}

export interface InfoData {
    data: Object;
}

export interface DebugData {
    workflow: Workflow;
    argtype: any;
}

export interface ResponseMessage {
    message: string;
}

export interface ProjectSetup {
    user: User;
    apps: App[];
    projects: Project[];
}

export interface ProjectData {
    workflows: Workflow[];
    codes: Code[];
    chats: Chat[];
    apis: API[];
    storages: Storage[];
    schemas: Schema[];
    validators: Validator[];
    fns: Fn[];
    objs: Obj[];
    arrs: Arr[];
    requests: Request[];
    variables: Variable[];
    websockets: Websocket[];
    queues: Queue[];
    schedulers: Scheduler[];
    documents: Document[];
    argtypes: Argtype[];
}

export interface ProjectSettings {
    instance: Instance;
    deploys: Deploy[];
    logs: Log[];
    keys: Key[];
    billings: Billing[];
    usages: Usage[];
    subs: Sub[];
    pools: Pool[];
    registers: Register[];
}

export interface AppState {
    projects: Project[];
    apps: App[];
    
    apis: API[];
    validators: Validator[];
    storages: Storage[];
    schemas: Schema[];
    workflows: Workflow[];
    codes: Code[];
    chats: Chat[];
    fns: Fn[];
    objs: Obj[];
    arrs: Arr[];
    requests: Request[];
    variables: Variable[];
    websockets: Websocket[];
    queues: Queue[];
    schedulers: Scheduler[];
    registers: Register[];
    documents: Document[];
    argtypes: Argtype[];

    instances: Instance[];
    deploys: Deploy[];
    logs: Log[];
    jobs: Job[];
    keys: Key[];
    billings: Billing[];
    usages: Usage[];
    subs: Sub[];
    pools: Pool[];

    user: User | null;
    view: View;
}

export interface AppStateInit {
    app: AppState;
}
