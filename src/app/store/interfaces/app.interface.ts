export interface Service {
    name: string;
    icon: string;
}

export interface User {
    _id: string;
    date: string;
    name: string;
}

export interface API {
    _id: string;
    date: string;
    name: string;
    action: string;
}

export interface Storage {
    _id: string;
    date: string;
    name: string;
}

export interface Schema {
    _id: string;
    date: string;
    name: string;
}

export interface Validator {
    _id: string;
    date: string;
    name: string;
    field: string;
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
