export interface Service {
    name: string;
    icon: string;
}

export interface User {
    _id: string;
    name: string;
}

export interface SchemaKeyOptions {
    array: boolean;
    required: boolean;
    default: boolean;
    defaultValue: string;
}

export interface SchemaKey {
    key: string;
    type: 'string' | 'number' | 'schema' | 'boolean' | 'date' | 'null';
    options: SchemaKeyOptions
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
    name: string;
    action: 'get' | 'post' | 'put' | 'delete';
    url: string;
    validators: string[];
}

export interface Storage {
    _id: string;
    userId: string;
    date: string;
    name: string;
    schemaId: string;
}

export interface Schema {
    _id: string;
    userId: string;
    date: string;
    name: string;
    keys: SchemaKey[];
}

export interface Validator {
    _id: string;
    userId: string;
    date: string;
    name: string;
    field: 'param' | 'body';
    path: string;
    validation: string | ValidatorOption;
}

export interface Workflow {
    _id: string;
    userId: string;
    date: string;
    name: string;
    rows: WorkflowRow[];
}

export interface View {
    service: string;
    serviceDataId: string;
    window: string;
    windowId: string;
}

export interface Toast {
    type: 'info' | 'success' | 'alert';
    text: string;
}

export interface AppState {
    api: API[];
    validator: Validator[];
    storage: Storage[];
    schema: Schema[];
    workflow: Workflow[];
    
    user: User | null;
    view: View;
}

export interface AppStateInit {
    app: AppState;
}
