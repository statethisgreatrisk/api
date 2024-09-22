export interface Service {
    name: string;
    icon: string;
}

export interface User {
    _id: string;
    name: string;
}

export interface SchemaRow {
    _id: string;
    key: string;
    type: string;
    placeholder?: string;
    placeholderIndex?: number;
}

export interface ValidatorOption {
    isAlpha: boolean;
    matches: boolean;
    matchesValue: string;
    isUUID: boolean;
    isMongoId: boolean;
    isLength: boolean;
    isLengthMin: boolean;
    isLengthMinValue: string | number;
    isLengthMax: boolean;
    isLengthMaxValue: string | number;
}

export interface WorkflowRow {
    position: string | number;
    service: string;
    variable: string;
    command: string;
    detail: string;
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
    validation: string | ValidatorOption;
}

export interface Workflow {
    _id: string;
    userId: string;
    date: string;
    active: boolean;
    name: string;
    rows: WorkflowRow[];
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

export interface AppState {
    apis: API[];
    validators: Validator[];
    storages: Storage[];
    schemas: Schema[];
    workflows: Workflow[];
    
    user: User | null;
    view: View;
}

export interface AppStateInit {
    app: AppState;
}
