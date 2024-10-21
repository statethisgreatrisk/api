import { API, AppState, User, Storage, Schema, Validator, Workflow, App, Billing, Deploy, Key, Log, Usage, Project, Fn, Obj, Document, Sub, Instance, Request } from "../interfaces/app.interface";

// User

export const addUserFn: (state: AppState, user: User) => AppState = (state: AppState, user: User) => {
    if (!user) return { ...state };
    return { ...state, user };
}

// Project

export const addProjectsFn: (state: AppState, projects: Project[]) => AppState = (state: AppState, projects: Project[]) => {
    if (!projects) return { ...state };
    return { ...state, projects: projects };
}

export const addProjectFn: (state: AppState, project: Project) => AppState = (state: AppState, project: Project) => {
    if (!project) return { ...state };
    return { ...state, projects: state.projects.concat([project]) };
}

export const replaceProjectFn: (state: AppState, project: Project) => AppState = (state: AppState, project: Project) => {
    if (!project) return { ...state };

    const projects = state.projects.map((existingProject) => {
        if (existingProject._id !== project._id) return existingProject;
        return project;
    });

    return { ...state, projects: projects };
}

export const removeProjectFn: (state: AppState, projectId: string) => AppState = (state: AppState, projectId: string) => {
    if (!projectId) return { ...state };
    return { ...state, projects: state.projects.filter((project) => project._id !== projectId) };
}

// API

export const addAPIsFn: (state: AppState, apis: API[]) => AppState = (state: AppState, apis: API[]) => {
    if (!apis) return { ...state };
    return { ...state, apis: apis };
}

export const addAPIFn: (state: AppState, api: API) => AppState = (state: AppState, api: API) => {
    if (!api) return { ...state };
    return { ...state, apis: state.apis.concat([api]) };
}

export const replaceAPIFn: (state: AppState, api: API) => AppState = (state: AppState, api: API) => {
    if (!api) return { ...state };

    const apis = state.apis.map((existingAPI) => {
        if (existingAPI._id !== api._id) return existingAPI;
        return api;
    });

    return { ...state, apis: apis };
}

export const removeAPIFn: (state: AppState, apiId: string) => AppState = (state: AppState, apiId: string) => {
    if (!apiId) return { ...state };
    return { ...state, apis: state.apis.filter((api) => api._id !== apiId) };
}

// Storage

export const addStoragesFn: (state: AppState, storages: Storage[]) => AppState = (state: AppState, storages: Storage[]) => {
    if (!storages) return { ...state };
    return { ...state, storages: storages };
}

export const addStorageFn: (state: AppState, storage: Storage) => AppState = (state: AppState, storage: Storage) => {
    if (!storage) return { ...state };
    return { ...state, storages: state.storages.concat([storage]) };
}

export const replaceStorageFn: (state: AppState, storage: Storage) => AppState = (state: AppState, storage: Storage) => {
    if (!storage) return { ...state };

    const storages = state.storages.map((existingStorage) => {
        if (existingStorage._id !== storage._id) return existingStorage;
        return storage;
    });

    return { ...state, storages: storages };
}

export const removeStorageFn: (state: AppState, storageId: string) => AppState = (state: AppState, storageId: string) => {
    if (!storageId) return { ...state };
    return { ...state, storages: state.storages.filter((storage) => storage._id !== storageId) };
}

// Schema

export const addSchemasFn: (state: AppState, schemas: Schema[]) => AppState = (state: AppState, schemas: Schema[]) => {
    if (!schemas) return { ...state };
    return { ...state, schemas: schemas };
}

export const addSchemaFn: (state: AppState, schema: Schema) => AppState = (state: AppState, schema: Schema) => {
    if (!schema) return { ...state };
    return { ...state, schemas: state.schemas.concat([schema]) };
}

export const replaceSchemaFn: (state: AppState, schema: Schema) => AppState = (state: AppState, schema: Schema) => {
    if (!schema) return { ...state };

    const schemas = state.schemas.map((existingSchema) => {
        if (existingSchema._id !== schema._id) return existingSchema;
        return schema;
    });

    return { ...state, schemas: schemas };
}

export const removeSchemaFn: (state: AppState, schemaId: string) => AppState = (state: AppState, schemaId: string) => {
    if (!schemaId) return { ...state };
    return { ...state, schemas: state.schemas.filter((schema) => schema._id !== schemaId) };
}

// Validator

export const addValidatorsFn: (state: AppState, validators: Validator[]) => AppState = (state: AppState, validators: Validator[]) => {
    if (!validators) return { ...state };
    return { ...state, validators: validators };
}

export const addValidatorFn: (state: AppState, validator: Validator) => AppState = (state: AppState, validator: Validator) => {
    if (!validator) return { ...state };
    return { ...state, validators: state.validators.concat([validator]) };
}

export const replaceValidatorFn: (state: AppState, validator: Validator) => AppState = (state: AppState, validator: Validator) => {
    if (!validator) return { ...state };

    const validators = state.validators.map((existingValidator) => {
        if (existingValidator._id !== validator._id) return existingValidator;
        return validator;
    });

    return { ...state, validators: validators };
}

export const removeValidatorFn: (state: AppState, validatorId: string) => AppState = (state: AppState, validatorId: string) => {
    if (!validatorId) return { ...state };
    return { ...state, validators: state.validators.filter((validator) => validator._id !== validatorId) };
}

// Workflow

export const addWorkflowsFn: (state: AppState, workflows: Workflow[]) => AppState = (state: AppState, workflows: Workflow[]) => {
    if (!workflows) return { ...state };
    return { ...state, workflows: workflows };
}

export const addWorkflowFn: (state: AppState, workflow: Workflow) => AppState = (state: AppState, workflow: Workflow) => {
    if (!workflow) return { ...state };
    return { ...state, workflows: state.workflows.concat([workflow]) };
}

export const replaceWorkflowFn: (state: AppState, workflow: Workflow) => AppState = (state: AppState, workflow: Workflow) => {
    if (!workflow) return { ...state };

    const workflows = state.workflows.map((existingWorkflow) => {
        if (existingWorkflow._id !== workflow._id) return existingWorkflow;
        return workflow;
    });

    return { ...state, workflows: workflows };
}

export const removeWorkflowFn: (state: AppState, workflowId: string) => AppState = (state: AppState, workflowId: string) => {
    if (!workflowId) return { ...state };
    return { ...state, workflows: state.workflows.filter((workflow) => workflow._id !== workflowId) };
}

// Fn

export const addFnsFn: (state: AppState, fns: Fn[]) => AppState = (state: AppState, fns: Fn[]) => {
    if (!fns) return { ...state };
    return { ...state, fns: fns };
}

export const addFnFn: (state: AppState, fn: Fn) => AppState = (state: AppState, fn: Fn) => {
    if (!fn) return { ...state };
    return { ...state, fns: state.fns.concat([fn]) };
}

export const replaceFnFn: (state: AppState, fn: Fn) => AppState = (state: AppState, fn: Fn) => {
    if (!fn) return { ...state };

    const fns = state.fns.map((existingFn) => {
        if (existingFn._id !== fn._id) return existingFn;
        return fn;
    });

    return { ...state, fns: fns };
}

export const removeFnFn: (state: AppState, fnId: string) => AppState = (state: AppState, fnId: string) => {
    if (!fnId) return { ...state };
    return { ...state, fns: state.fns.filter((fn) => fn._id !== fnId) };
}

// Obj

export const addObjsFn: (state: AppState, objs: Obj[]) => AppState = (state: AppState, objs: Obj[]) => {
    if (!objs) return { ...state };
    return { ...state, objs: objs };
}

export const addObjFn: (state: AppState, obj: Obj) => AppState = (state: AppState, obj: Obj) => {
    if (!obj) return { ...state };
    return { ...state, objs: state.objs.concat([obj]) };
}

export const replaceObjFn: (state: AppState, obj: Obj) => AppState = (state: AppState, obj: Obj) => {
    if (!obj) return { ...state };

    const objs = state.objs.map((existingObj) => {
        if (existingObj._id !== obj._id) return existingObj;
        return obj;
    });

    return { ...state, objs: objs };
}

export const removeObjFn: (state: AppState, objId: string) => AppState = (state: AppState, objId: string) => {
    if (!objId) return { ...state };
    return { ...state, objs: state.objs.filter((obj) => obj._id !== objId) };
}

// Request

export const addRequestsFn: (state: AppState, requests: Request[]) => AppState = (state: AppState, requests: Request[]) => {
    if (!requests) return { ...state };
    return { ...state, requests: requests };
}

export const addRequestFn: (state: AppState, request: Request) => AppState = (state: AppState, request: Request) => {
    if (!request) return { ...state };
    return { ...state, requests: state.requests.concat([request]) };
}

export const replaceRequestFn: (state: AppState, request: Request) => AppState = (state: AppState, request: Request) => {
    if (!request) return { ...state };

    const requests = state.requests.map((existingRequest) => {
        if (existingRequest._id !== request._id) return existingRequest;
        return request;
    });

    return { ...state, requests: requests };
}

export const removeRequestFn: (state: AppState, requestId: string) => AppState = (state: AppState, requestId: string) => {
    if (!requestId) return { ...state };
    return { ...state, requests: state.requests.filter((request) => request._id !== requestId) };
}

// Document

export const addDocumentsFn: (state: AppState, documents: Document[]) => AppState = (state: AppState, documents: Document[]) => {
    if (!documents) return { ...state };
    return { ...state, documents: documents };
}

export const addDocumentFn: (state: AppState, document: Document) => AppState = (state: AppState, document: Document) => {
    if (!document) return { ...state };
    return { ...state, documents: state.documents.concat([document]) };
}

export const replaceDocumentFn: (state: AppState, document: Document) => AppState = (state: AppState, document: Document) => {
    if (!document) return { ...state };

    const documents = state.documents.map((existingDocument) => {
        if (existingDocument._id !== document._id) return existingDocument;
        return document;
    });

    return { ...state, documents: documents };
}

export const removeDocumentFn: (state: AppState, documentId: string) => AppState = (state: AppState, documentId: string) => {
    if (!documentId) return { ...state };
    return { ...state, documents: state.documents.filter((document) => document._id !== documentId) };
}

// Instance

export const addInstanceFn: (state: AppState, instance: Instance) => AppState = (state: AppState, instance: Instance) => {
    if (!instance) return { ...state };
    return { ...state, instances: [instance] };
}

// Deploy

export const addDeploysFn: (state: AppState, deploys: Deploy[]) => AppState = (state: AppState, deploys: Deploy[]) => {
    if (!deploys) return { ...state };
    return { ...state, deploys: deploys };
}

export const addDeployFn: (state: AppState, deploy: Deploy) => AppState = (state: AppState, deploy: Deploy) => {
    if (!deploy) return { ...state };
    return { ...state, deploys: state.deploys.concat([deploy]) };
}

export const replaceDeployFn: (state: AppState, deploy: Deploy) => AppState = (state: AppState, deploy: Deploy) => {
    if (!deploy) return { ...state };

    const deploys = state.deploys.map((existingDeploy) => {
        if (existingDeploy._id !== deploy._id) return existingDeploy;
        return deploy;
    });

    return { ...state, deploys: deploys };
}

// Log

export const addLogsFn: (state: AppState, logs: Log[]) => AppState = (state: AppState, logs: Log[]) => {
    if (!logs) return { ...state };
    return { ...state, logs: logs };
}

export const addLogFn: (state: AppState, log: Log) => AppState = (state: AppState, log: Log) => {
    if (!log) return { ...state };
    return { ...state, logs: state.logs.concat([log]) };
}

export const replaceLogFn: (state: AppState, log: Log) => AppState = (state: AppState, log: Log) => {
    if (!log) return { ...state };

    const logs = state.logs.map((existingLog) => {
        if (existingLog._id !== log._id) return existingLog;
        return log;
    });

    return { ...state, logs: logs };
}

// Key

export const addKeysFn: (state: AppState, keys: Key[]) => AppState = (state: AppState, keys: Key[]) => {
    if (!keys) return { ...state };
    return { ...state, keys: keys };
}

export const addKeyFn: (state: AppState, key: Key) => AppState = (state: AppState, key: Key) => {
    if (!key) return { ...state };
    return { ...state, keys: state.keys.concat([key]) };
}

export const replaceKeyFn: (state: AppState, key: Key) => AppState = (state: AppState, key: Key) => {
    if (!key) return { ...state };

    const keys = state.keys.map((existingKey) => {
        if (existingKey._id !== key._id) return existingKey;
        return key;
    });

    return { ...state, keys: keys };
}

export const removeKeyFn: (state: AppState, keyId: string) => AppState = (state: AppState, keyId: string) => {
    if (!keyId) return { ...state };
    return { ...state, keys: state.keys.filter((key) => key._id !== keyId) };
}

// Billing

export const addBillingsFn: (state: AppState, billings: Billing[]) => AppState = (state: AppState, billings: Billing[]) => {
    if (!billings) return { ...state };
    return { ...state, billings: billings };
}

export const addBillingFn: (state: AppState, billing: Billing) => AppState = (state: AppState, billing: Billing) => {
    if (!billing) return { ...state };
    return { ...state, billings: state.billings.concat([billing]) };
}

export const replaceBillingFn: (state: AppState, billing: Billing) => AppState = (state: AppState, billing: Billing) => {
    if (!billing) return { ...state };

    const billings = state.billings.map((existingBilling) => {
        if (existingBilling._id !== billing._id) return existingBilling;
        return billing;
    });

    return { ...state, billings: billings };
}

// Usage

export const addUsagesFn: (state: AppState, usages: Usage[]) => AppState = (state: AppState, usages: Usage[]) => {
    if (!usages) return { ...state };
    return { ...state, usages: usages };
}

export const addUsageFn: (state: AppState, usage: Usage) => AppState = (state: AppState, usage: Usage) => {
    if (!usage) return { ...state };
    return { ...state, usages: state.usages.concat([usage]) };
}

export const replaceUsageFn: (state: AppState, usage: Usage) => AppState = (state: AppState, usage: Usage) => {
    if (!usage) return { ...state };

    const usages = state.usages.map((existingUsage) => {
        if (existingUsage._id !== usage._id) return existingUsage;
        return usage;
    });

    return { ...state, usages: usages };
}

// Sub

export const addSubsFn: (state: AppState, subs: Sub[]) => AppState = (state: AppState, subs: Sub[]) => {
    if (!subs) return { ...state };
    return { ...state, subs: subs };
}

export const addSubFn: (state: AppState, sub: Sub) => AppState = (state: AppState, sub: Sub) => {
    if (!sub) return { ...state };
    return { ...state, subs: state.subs.concat([sub]) };
}

export const replaceSubFn: (state: AppState, sub: Sub) => AppState = (state: AppState, sub: Sub) => {
    if (!sub) return { ...state };

    const subs = state.subs.map((existingSub) => {
        if (existingSub._id !== sub._id) return existingSub;
        return sub;
    });

    return { ...state, subs: subs };
}

export const removeSubFn: (state: AppState, subId: string) => AppState = (state: AppState, subId: string) => {
    if (!subId) return { ...state };
    return { ...state, subs: state.subs.filter((sub) => sub._id !== subId) };
}

// App

export const addAppsFn: (state: AppState, apps: App[]) => AppState = (state: AppState, apps: App[]) => {
    if (!apps) return { ...state };
    return { ...state, apps: apps };
}

// Services/View

export const selectServiceFn: (state: AppState, serviceName: string, serviceId: string) => AppState = (state: AppState, serviceName: string, serviceId: string) => {
    if (!serviceName || !serviceId) return { ...state };

    return { ...state, view: { ...state.view, service: serviceName, serviceId } };
}

export const deselectServiceFn: (state: AppState, serviceName: string, serviceId: string) => AppState = (state: AppState, serviceName: string, serviceId: string) => {
    return { ...state, view: { ...state.view, service: '', serviceId: '' } };
}

export const selectWindowFn: (state: AppState, windowName: string, windowId: string) => AppState = (state: AppState, windowName: string, windowId: string) => {
    if (!windowName || !windowId) return { ...state };

    return { ...state, view: { ...state.view, window: windowName, windowId } };
}

export const deselectWindowFn: (state: AppState, windowName: string, windowId: string) => AppState = (state: AppState, windowName: string, windowId: string) => {
    return { ...state, view: { ...state.view, window: '', windowId: '' } };
}

export const logFn: (state: AppState, any: any) => AppState = (state: AppState, any: any) => {
    return { ...state };
}

export const clearStoreFn: (state: AppState) => AppState = (state: AppState) => {
    return {
        projects: [],
        apps: [],
        
        apis: [],
        storages: [],
        schemas: [],
        validators: [],
        workflows: [],
        fns: [],
        objs: [],
        requests: [],
        documents: [],

        instances: [],
        deploys: [],
        logs: [],
        keys: [],
        billings: [],
        usages: [],
        subs: [],

        user: null,
        view: { service: '', serviceId: '', window: '', windowId: '' },
    };
}

export const clearDataFn: (state: AppState) => AppState = (state: AppState) => {
    return {
        ...state,

        // user not deleted
        // projects not deleted
        // apps: apps not deleted
        
        apis: [],
        storages: [],
        schemas: [],
        validators: [],
        workflows: [],
        fns: [],
        objs: [],
        requests: [],
        documents: [],

        instances: [],
        deploys: [],
        logs: [],
        keys: [],
        billings: [],
        usages: [],
        subs: [],

        view: { service: '', serviceId: '', window: '', windowId: '' },
    };
}
