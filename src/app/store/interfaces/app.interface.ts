export interface Service {
    name: string;
    icon: string;
}

export interface View {
    service: string;
}

export interface API {
    name: string;
    action: string;
}

export interface Validation {
    name: string;
    field: string;
}

export interface Storage {
    name: string;
}

export interface Schema {
    name: string;
}

export interface AppState {
    services: Service[];

    api: API[];
    validation: Validation[];
    storage: Storage[];
    schema: Schema[];
    
    view: View;
}

export interface AppStateInit {
    app: AppState;
}
