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

export interface SchemaRow {
    _id: string;
    key: string;
    type: string;
    placeholder?: string;
    placeholderIndex?: number;
}

export interface WorkflowRow {
    _id: string;
    appId: string;
    variable: string;
    args: string;
}

export interface API {
    _id: string;
    userId: string;
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
    date: string;
    active: boolean;
    name: string;
    schemaId: string;
}

export interface Schema {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    name: string;
    rows: SchemaRow[];
}

export interface Validator {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    name: string;
    field: 'param' | 'body';
    path: string;
    validation: string;
    placeholder?: string;
    placeholderIndex?: number;
}

export interface Workflow {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    name: string;
    rows: WorkflowRow[];
}

export interface App {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    name: string;
    method: string;
}

export interface Deploy {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    size: string;
    expiration: string;
    status: string;
}

export interface Log {
    _id: string;
    userId: string;
    deployId: string;
    date: string;
    active: boolean;
    type: string;
    info: string;
}

export interface Key {
    _id: string;
    userId: string;
    keyId: string;
    date: string;
    active: boolean;
    name: string;
}

export interface Billing {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    debit: number;
    credit: number;
}

export interface Usage {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    name: string;
    type: string;
    usage: number;
    rate: number;
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
    apis: API[];
    validators: Validator[];
    storages: Storage[];
    schemas: Schema[];
    workflows: Workflow[];
    apps: App[];

    deploys: Deploy[];
    logs: Log[];
    keys: Key[];
    billings: Billing[];
    usages: Usage[];
    
    user: User | null;
    view: View;
}

export interface AppStateInit {
    app: AppState;
}
