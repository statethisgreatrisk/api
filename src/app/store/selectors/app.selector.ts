import { createSelector } from "@ngrx/store";
import { API, Storage, AppState, AppStateInit, Schema, Validator, Billing, Deploy, Key, Log, Usage, Workflow, Fn, Obj, Document, Sub, Instance, Request, Variable, Websocket } from "../interfaces/app.interface";

export const selectApp = (state: AppStateInit) => state.app;

export const selectUser = createSelector(selectApp, (state: AppState) => state.user);
export const selectView = createSelector(selectApp, (state: AppState) => state.view);
export const selectApps = createSelector(selectApp, (state: AppState) => state.apps);

export const selectProjects = createSelector(selectApp, (state: AppState) => state.projects);
export const selectMainProject = createSelector(selectApp, (state: AppState) => {
    const localStorageProjectValue = localStorage.getItem('mainProject');
    const foundProject = state.projects.find((project) => project._id === localStorageProjectValue);

    if (localStorageProjectValue && foundProject) {
        return foundProject;
    }

    const projects = [...state.projects].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
    const project = projects[0];

    if (!project) return null;
    
    localStorage.setItem('mainProject', project._id);
    return project;
});

export const selectAPIs = createSelector(selectApp, (state: AppState) => state.apis);
export const selectStorages = createSelector(selectApp, (state: AppState) => state.storages);
export const selectSchemas = createSelector(selectApp, (state: AppState) => state.schemas);
export const selectValidators = createSelector(selectApp, (state: AppState) => state.validators);
export const selectWorkflows = createSelector(selectApp, (state: AppState) => state.workflows);
export const selectFns = createSelector(selectApp, (state: AppState) => state.fns);
export const selectObjs = createSelector(selectApp, (state: AppState) => state.objs);
export const selectRequests = createSelector(selectApp, (state: AppState) => state.requests);
export const selectVariables = createSelector(selectApp, (state: AppState) => state.variables);
export const selectWebsockets = createSelector(selectApp, (state: AppState) => state.websockets);
export const selectDocuments = createSelector(selectApp, (state: AppState) => state.documents);
export const selectInstances = createSelector(selectApp, (state: AppState) => state.instances);
export const selectDeploys = createSelector(selectApp, (state: AppState) => state.deploys);
export const selectLogs = createSelector(selectApp, (state: AppState) => state.logs);
export const selectKeys = createSelector(selectApp, (state: AppState) => state.keys);
export const selectBillings = createSelector(selectApp, (state: AppState) => state.billings);
export const selectUsages = createSelector(selectApp, (state: AppState) => state.usages);
export const selectSubs = createSelector(selectApp, (state: AppState) => state.subs);

export const selectProjectAPIs = (projectId: string) => createSelector(selectAPIs, (apis: API[]) => apis.filter((api) => projectId === api.projectId));
export const selectProjectStorages = (projectId: string) => createSelector(selectStorages, (storages: Storage[]) => storages.filter((storage) => projectId === storage.projectId));
export const selectProjectSchemas = (projectId: string) => createSelector(selectSchemas, (storages: Schema[]) => storages.filter((storage) => projectId === storage.projectId));
export const selectProjectValidators = (projectId: string) => createSelector(selectValidators, (validators: Validator[]) => validators.filter((validator) => projectId === validator.projectId));
export const selectProjectWorkflows = (projectId: string) => createSelector(selectWorkflows, (workflows: Workflow[]) => workflows.filter((workflow) => projectId === workflow.projectId));
export const selectProjectFns = (projectId: string) => createSelector(selectFns, (fns: Fn[]) => fns.filter((fn) => projectId === fn.projectId));
export const selectProjectObjs = (projectId: string) => createSelector(selectObjs, (objs: Obj[]) => objs.filter((obj) => projectId === obj.projectId));
export const selectProjectRequests = (projectId: string) => createSelector(selectRequests, (requests: Request[]) => requests.filter((request) => projectId === request.projectId));
export const selectProjectVariables = (projectId: string) => createSelector(selectVariables, (variables: Variable[]) => variables.filter((variable) => projectId === variable.projectId));
export const selectProjectWebsockets = (projectId: string) => createSelector(selectWebsockets, (websockets: Websocket[]) => websockets.filter((websocket) => projectId === websocket.projectId));
export const selectProjectDocuments = (projectId: string) => createSelector(selectDocuments, (documents: Document[]) => documents.filter((document) => projectId === document.projectId));
export const selectProjectInstances = (projectId: string) => createSelector(selectInstances, (instances: Instance[]) => instances.filter((instance) => projectId === instance.projectId));
export const selectProjectDeploys = (projectId: string) => createSelector(selectDeploys, (deploys: Deploy[]) => deploys.filter((deploy) => projectId === deploy.projectId));
export const selectProjectLogs = (projectId: string) => createSelector(selectLogs, (logs: Log[]) => logs.filter((log) => projectId === log.projectId));
export const selectProjectKeys = (projectId: string) => createSelector(selectKeys, (keys: Key[]) => keys.filter((key) => projectId === key.projectId));
export const selectProjectBillings = (projectId: string) => createSelector(selectBillings, (billings: Billing[]) => billings.filter((billing) => projectId === billing.projectId));
export const selectProjectUsages = (projectId: string) => createSelector(selectUsages, (usages: Usage[]) => usages.filter((usage) => projectId === usage.projectId));
export const selectProjectSubs = (projectId: string) => createSelector(selectSubs, (subs: Sub[]) => subs.filter((sub) => projectId === sub.projectId));
