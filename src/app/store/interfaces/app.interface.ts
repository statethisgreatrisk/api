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

export interface WorkflowRow {
    _id: string;
    appId: string;
    pairId: string;
    variable: string;
    args: string;
    key: string;
    conditionals: string;
    comment: string;
    indents: number;
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
}

export interface Workflow {
    _id: string;
    userId: string;
    projectId: string;
    date: string;
    active: boolean;
    name: string;
    rows: WorkflowRow[];
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

export interface Document {
    _id: string;
    userId: string;
    projectId: string;
    storageId: string;
    date: string;
    active: boolean;
    document: string;
    version: number;
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
    apis: API[];
    storages: Storage[];
    schemas: Schema[];
    validators: Validator[];
    fns: Fn[];
    objs: Obj[];
    requests: Request[];
    variables: Variable[];
    websockets: Websocket[];
    queues: Queue[];
    schedulers: Scheduler[];
    documents: Document[];
}

export interface ProjectSettings {
    instance: Instance;
    deploys: Deploy[];
    logs: Log[];
    keys: Key[];
    billings: Billing[];
    usages: Usage[];
    subs: Sub[];
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
    fns: Fn[];
    objs: Obj[];
    requests: Request[];
    variables: Variable[];
    websockets: Websocket[];
    queues: Queue[];
    schedulers: Scheduler[];
    registers: Register[];
    documents: Document[];

    instances: Instance[];
    deploys: Deploy[];
    logs: Log[];
    keys: Key[];
    billings: Billing[];
    usages: Usage[];
    subs: Sub[];
    
    user: User | null;
    view: View;
}

export interface AppStateInit {
    app: AppState;
}
