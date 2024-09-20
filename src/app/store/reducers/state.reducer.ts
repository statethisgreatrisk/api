import { createReducer, on } from "@ngrx/store";
import { appState } from "../states/state";
import { addAPI, addAPIs, addSchema, addSchemas, addStorage, addStorages, addUser, addValidator, addValidators, addWorkflow, addWorkflows, log, removeAPI, removeSchema, removeStorage, removeValidator, removeWorkflow, replaceAPI, replaceSchema, replaceStorage, replaceValidator, replaceWorkflow, selectService } from "../actions/app.action";
import { addAPIFn, addAPIsFn, addSchemaFn, addSchemasFn, addStorageFn, addStoragesFn, addUserFn, addValidatorFn, addValidatorsFn, addWorkflowFn, addWorkflowsFn, logFn, removeAPIFn, removeSchemaFn, removeStorageFn, removeValidatorFn, removeWorkflowFn, replaceAPIFn, replaceSchemaFn, replaceStorageFn, replaceValidatorFn, replaceWorkflowFn, selectServiceFn } from "./app.reducer";

export const appStateReducer = createReducer(
    appState,
    // User
    on(addUser, (state, { user }) => addUserFn(state, user)),
    // API
    on(addAPIs, (state, { apis }) => addAPIsFn(state, apis)),
    on(addAPI, (state, { api }) => addAPIFn(state, api)),
    on(replaceAPI, (state, { api }) => replaceAPIFn(state, api)),
    on(removeAPI, (state, { apiId }) => removeAPIFn(state, apiId)),
    // Storage
    on(addStorages, (state, { storages }) => addStoragesFn(state, storages)),
    on(addStorage, (state, { storage }) => addStorageFn(state, storage)),
    on(replaceStorage, (state, { storage }) => replaceStorageFn(state, storage)),
    on(removeStorage, (state, { storageId }) => removeStorageFn(state, storageId)),
    // Schema
    on(addSchemas, (state, { schemas }) => addSchemasFn(state, schemas)),
    on(addSchema, (state, { schema }) => addSchemaFn(state, schema)),
    on(replaceSchema, (state, { schema }) => replaceSchemaFn(state, schema)),
    on(removeSchema, (state, { schemaId }) => removeSchemaFn(state, schemaId)),
    // Validator
    on(addValidators, (state, { validators }) => addValidatorsFn(state, validators)),
    on(addValidator, (state, { validator }) => addValidatorFn(state, validator)),
    on(replaceValidator, (state, { validator }) => replaceValidatorFn(state, validator)),
    on(removeValidator, (state, { validatorId }) => removeValidatorFn(state, validatorId)),
    // Workflow
    on(addWorkflows, (state, { workflows }) => addWorkflowsFn(state, workflows)),
    on(addWorkflow, (state, { workflow }) => addWorkflowFn(state, workflow)),
    on(replaceWorkflow, (state, { workflow }) => replaceWorkflowFn(state, workflow)),
    on(removeWorkflow, (state, { workflowId }) => removeWorkflowFn(state, workflowId)),
    // Services/View
    on(log, (state, { any }) => logFn(state, any)),
    on(selectService, (state, { serviceName, serviceDataId }) => selectServiceFn(state, serviceName, serviceDataId)),
);
