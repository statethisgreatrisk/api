export interface Service {
    name: string;
    icon: string;
}

export interface API {
    _id: string;
    name: string;
    action: string;
}

export interface Validation {
    _id: string;
    name: string;
    field: string;
}

export interface Storage {
    _id: string;
    name: string;
}

export interface Schema {
    _id: string;
    name: string;
}

export interface View {
    service: string;
    serviceDataId: string;
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
