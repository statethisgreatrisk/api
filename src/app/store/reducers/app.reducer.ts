import { API, AppState, User, Storage, Schema, Validator, Workflow } from "../interfaces/app.interface";

// User

export const addUserFn: (state: AppState, user: User) => AppState = (state: AppState, user: User) => {
    if (!user) return { ...state };
    return { ...state, user };
}

// API

export const addAPIsFn: (state: AppState, apis: API[]) => AppState = (state: AppState, apis: API[]) => {
    if (!apis) return { ...state };
    return { ...state, api: state.api.concat(apis) };
}

export const addAPIFn: (state: AppState, api: API) => AppState = (state: AppState, api: API) => {
    if (!api) return { ...state };
    return { ...state, api: state.api.concat([api]) };
}

export const replaceAPIFn: (state: AppState, api: API) => AppState = (state: AppState, api: API) => {
    if (!api) return { ...state };

    const apis = state.api.map((existingAPI) => {
        return existingAPI;
    });

    return { ...state, api: apis };
}

export const removeAPIFn: (state: AppState, apiId: string) => AppState = (state: AppState, apiId: string) => {
    if (!apiId) return { ...state };
    return { ...state, api: state.api.filter((api) => api._id !== apiId ) };
}

// Storage

export const addStoragesFn: (state: AppState, storages: Storage[]) => AppState = (state: AppState, storages: Storage[]) => {
    if (!storages) return { ...state };
    return { ...state, storage: state.storage.concat(storages) };
}

export const addStorageFn: (state: AppState, storage: Storage) => AppState = (state: AppState, storage: Storage) => {
    if (!storage) return { ...state };
    return { ...state, storage: state.storage.concat([storage]) };
}

export const replaceStorageFn: (state: AppState, storage: Storage) => AppState = (state: AppState, storage: Storage) => {
    if (!storage) return { ...state };

    const storages = state.storage.map((existingStorage) => {
        return existingStorage;
    });

    return { ...state, storage: storages };
}

export const removeStorageFn: (state: AppState, storageId: string) => AppState = (state: AppState, storageId: string) => {
    if (!storageId) return { ...state };
    return { ...state, storage: state.storage.filter((storage) => storage._id !== storageId ) };
}

// Schema

export const addSchemasFn: (state: AppState, schemas: Schema[]) => AppState = (state: AppState, schemas: Schema[]) => {
    if (!schemas) return { ...state };
    return { ...state, schema: state.schema.concat(schemas) };
}

export const addSchemaFn: (state: AppState, schema: Schema) => AppState = (state: AppState, schema: Schema) => {
    if (!schema) return { ...state };
    return { ...state, schema: state.schema.concat([schema]) };
}

export const replaceSchemaFn: (state: AppState, schema: Schema) => AppState = (state: AppState, schema: Schema) => {
    if (!schema) return { ...state };

    const schemas = state.schema.map((existingSchema) => {
        return existingSchema;
    });

    return { ...state, schema: schemas };
}

export const removeSchemaFn: (state: AppState, schemaId: string) => AppState = (state: AppState, schemaId: string) => {
    if (!schemaId) return { ...state };
    return { ...state, schema: state.schema.filter((schema) => schema._id !== schemaId ) };
}

// Validator

export const addValidatorsFn: (state: AppState, validators: Validator[]) => AppState = (state: AppState, validators: Validator[]) => {
    if (!validators) return { ...state };
    return { ...state, validator: state.validator.concat(validators) };
}

export const addValidatorFn: (state: AppState, validator: Validator) => AppState = (state: AppState, validator: Validator) => {
    if (!validator) return { ...state };
    return { ...state, validator: state.validator.concat([validator]) };
}

export const replaceValidatorFn: (state: AppState, validator: Validator) => AppState = (state: AppState, validator: Validator) => {
    if (!validator) return { ...state };

    const validators = state.validator.map((existingValidator) => {
        return existingValidator;
    });

    return { ...state, validator: validators };
}

export const removeValidatorFn: (state: AppState, validatorId: string) => AppState = (state: AppState, validatorId: string) => {
    if (!validatorId) return { ...state };
    return { ...state, validator: state.validator.filter((validator) => validator._id !== validatorId ) };
}

// Workflow

export const addWorkflowsFn: (state: AppState, workflows: Workflow[]) => AppState = (state: AppState, workflows: Workflow[]) => {
    if (!workflows) return { ...state };
    return { ...state, workflow: state.workflow.concat(workflows) };
}

export const addWorkflowFn: (state: AppState, workflow: Workflow) => AppState = (state: AppState, workflow: Workflow) => {
    if (!workflow) return { ...state };
    return { ...state, workflow: state.workflow.concat([workflow]) };
}

export const replaceWorkflowFn: (state: AppState, workflow: Workflow) => AppState = (state: AppState, workflow: Workflow) => {
    if (!workflow) return { ...state };

    const workflows = state.workflow.map((existingWorkflow) => {
        return existingWorkflow;
    });

    return { ...state, workflow: workflows };
}

export const removeWorkflowFn: (state: AppState, workflowId: string) => AppState = (state: AppState, workflowId: string) => {
    if (!workflowId) return { ...state };
    return { ...state, workflow: state.workflow.filter((workflow) => workflow._id !== workflowId ) };
}

// Services/View

export const selectServiceFn: (state: AppState, serviceName: string, serviceDataId: string) => AppState = (state: AppState, serviceName: string, serviceDataId: string) => {
    if (!serviceName || !serviceDataId) return { ...state };

    return { ...state, view: { service: serviceName, serviceDataId } };
}

export const deselectServiceFn: (state: AppState, serviceName: string, serviceDataId: string) => AppState = (state: AppState, serviceName: string, serviceDataId: string) => {
    return { ...state, view: { service: '', serviceDataId: '' } };
}

export const logFn: (state: AppState, any: any) => AppState = (state: AppState, any: any) => {
    return { ...state };
}
