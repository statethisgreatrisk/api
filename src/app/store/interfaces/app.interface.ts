export interface Service {
    name: string;
    icon: string;
}

export interface User {
    _id: string;
    date: string;
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

export interface API {
    _id: string;
    date: string;
    name: string;
    action: string;
    url: string;
    validators: string[];
}

export interface Storage {
    _id: string;
    date: string;
    name: string;
    schema: string;
}

export interface Schema {
    _id: string;
    date: string;
    name: string;
    keys: SchemaKey[];
}

export interface Validator {
    _id: string;
    date: string;
    name: string;
    field: 'param' | 'body';
    path: string;
    validation: string;
}

export interface View {
    service: string;
    serviceDataId: string;
}

export interface AppState {
    services: Service[];

    api: API[];
    validator: Validator[];
    storage: Storage[];
    schema: Schema[];
    
    view: View;
}

export interface AppStateInit {
    app: AppState;
}
