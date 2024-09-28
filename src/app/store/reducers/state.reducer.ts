import { createReducer, on } from "@ngrx/store";
import { appState } from "../states/state";
import { addAPI, addAPIs, addApps, addBilling, addBillings, addDeploy, addDeploys, addKey, addKeys, addLog, addLogs, addProject, addProjects, addSchema, addSchemas, addStorage, addStorages, addUsage, addUsages, addUser, addValidator, addValidators, addWorkflow, addWorkflows, clearStore, deselectService, deselectWindow, log, removeAPI, removeProject, removeSchema, removeStorage, removeValidator, removeWorkflow, replaceAPI, replaceBilling, replaceDeploy, replaceKey, replaceLog, replaceProject, replaceSchema, replaceStorage, replaceUsage, replaceValidator, replaceWorkflow, selectService, selectWindow } from "../actions/app.action";
import { addAPIFn, addAPIsFn, addAppsFn, addBillingFn, addBillingsFn, addDeployFn, addDeploysFn, addKeyFn, addKeysFn, addLogFn, addLogsFn, addProjectFn, addProjectsFn, addSchemaFn, addSchemasFn, addStorageFn, addStoragesFn, addUsageFn, addUsagesFn, addUserFn, addValidatorFn, addValidatorsFn, addWorkflowFn, addWorkflowsFn, clearStoreFn, deselectServiceFn, deselectWindowFn, logFn, removeAPIFn, removeProjectFn, removeSchemaFn, removeStorageFn, removeValidatorFn, removeWorkflowFn, replaceAPIFn, replaceBillingFn, replaceDeployFn, replaceKeyFn, replaceLogFn, replaceProjectFn, replaceSchemaFn, replaceStorageFn, replaceUsageFn, replaceValidatorFn, replaceWorkflowFn, selectServiceFn, selectWindowFn } from "./app.reducer";

export const appStateReducer = createReducer(
    appState,
    // User
    on(addUser, (state, { user }) => addUserFn(state, user)),
    // Project
    on(addProjects, (state, { projects }) => addProjectsFn(state, projects)),
    on(addProject, (state, { project }) => addProjectFn(state, project)),
    on(replaceProject, (state, { project }) => replaceProjectFn(state, project)),
    on(removeProject, (state, { projectId }) => removeProjectFn(state, projectId)),
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
    // App
    on(addApps, (state, { apps }) => addAppsFn(state, apps)),
    // Deploy
    on(addDeploys, (state, { deploys }) => addDeploysFn(state, deploys)),
    on(addDeploy, (state, { deploy }) => addDeployFn(state, deploy)),
    on(replaceDeploy, (state, { deploy }) => replaceDeployFn(state, deploy)),
    // Log
    on(addLogs, (state, { logs }) => addLogsFn(state, logs)),
    on(addLog, (state, { log }) => addLogFn(state, log)),
    on(replaceLog, (state, { log }) => replaceLogFn(state, log)),
    // Key
    on(addKeys, (state, { keys }) => addKeysFn(state, keys)),
    on(addKey, (state, { key }) => addKeyFn(state, key)),
    on(replaceKey, (state, { key }) => replaceKeyFn(state, key)),
    // Billing
    on(addBillings, (state, { billings }) => addBillingsFn(state, billings)),
    on(addBilling, (state, { billing }) => addBillingFn(state, billing)),
    on(replaceBilling, (state, { billing }) => replaceBillingFn(state, billing)),
    // Usage
    on(addUsages, (state, { usages }) => addUsagesFn(state, usages)),
    on(addUsage, (state, { usage }) => addUsageFn(state, usage)),
    on(replaceUsage, (state, { usage }) => replaceUsageFn(state, usage)),
    // Services/View
    on(log, (state, { any }) => logFn(state, any)),
    on(selectService, (state, { serviceName, serviceId }) => selectServiceFn(state, serviceName, serviceId)),
    on(deselectService, (state, { serviceName, serviceId }) => deselectServiceFn(state, serviceName, serviceId)),
    on(selectWindow, (state, { windowName, windowId }) => selectWindowFn(state, windowName, windowId)),
    on(deselectWindow, (state, { windowName, windowId }) => deselectWindowFn(state, windowName, windowId)),
    on(clearStore, (state) => clearStoreFn(state)),
);
