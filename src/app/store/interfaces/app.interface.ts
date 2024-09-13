export interface Service {
    name: string;
    icon: string;
}

export interface AppState {
    services: Service[];
}

export interface AppStateInit {
    app: AppState;
}
