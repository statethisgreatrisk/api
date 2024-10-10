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
    variable: string;
    args: string;
}

export interface App {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
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
    apiId: string;
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

export interface Deploy {
    _id: string;
    userId: string;
    projectId: string;
    instanceId: string;
    date: string;
    active: boolean;
    type: 'standard';
    start: string;
    stop: string;
    received: number;
    transmitted: number;
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
    name: string;
    type: string;
    usage: number;
    rate: number;
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
    documents: Document[];

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
