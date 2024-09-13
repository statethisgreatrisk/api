export interface Service {
    name: string;
    icon: string;
}

export interface View {
    service: string;
}

export interface Endpoint {
    name: string;
    action: string;
}

export interface AppState {
    services: Service[];
    endpoints: Endpoint[];
    view: View;
}

export interface AppStateInit {
    app: AppState;
}
