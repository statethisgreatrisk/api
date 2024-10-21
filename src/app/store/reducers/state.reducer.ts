import { createReducer, on } from "@ngrx/store";
import { appState } from "../states/state";
import { addAPI, addAPIs, addApps, addBilling, addBillings, addDeploy, addDeploys, addDocument, addDocuments, addFn, addFns, addInstances, addKey, addKeys, addLog, addLogs, addObj, addObjs, addProject, addProjects, addRequest, addRequests, addSchema, addSchemas, addStorage, addStorages, addSub, addSubs, addUsage, addUsages, addUser, addValidator, addValidators, addWorkflow, addWorkflows, clearData, clearStore, deselectService, deselectWindow, log, removeAPI, removeDocument, removeFn, removeKey, removeObj, removeProject, removeRequest, removeSchema, removeStorage, removeSub, removeValidator, removeWorkflow, replaceAPI, replaceBilling, replaceDeploy, replaceDocument, replaceFn, replaceKey, replaceLog, replaceObj, replaceProject, replaceRequest, replaceSchema, replaceStorage, replaceSub, replaceUsage, replaceValidator, replaceWorkflow, selectService, selectWindow } from "../actions/app.action";
import { addAPIFn, addAPIsFn, addAppsFn, addBillingFn, addBillingsFn, addDeployFn, addDeploysFn, addDocumentFn, addDocumentsFn, addFnFn, addFnsFn, addInstanceFn, addKeyFn, addKeysFn, addLogFn, addLogsFn, addObjFn, addObjsFn, addProjectFn, addProjectsFn, addRequestFn, addRequestsFn, addSchemaFn, addSchemasFn, addStorageFn, addStoragesFn, addSubFn, addSubsFn, addUsageFn, addUsagesFn, addUserFn, addValidatorFn, addValidatorsFn, addWorkflowFn, addWorkflowsFn, clearDataFn, clearStoreFn, deselectServiceFn, deselectWindowFn, logFn, removeAPIFn, removeDocumentFn, removeFnFn, removeKeyFn, removeObjFn, removeProjectFn, removeRequestFn, removeSchemaFn, removeStorageFn, removeSubFn, removeValidatorFn, removeWorkflowFn, replaceAPIFn, replaceBillingFn, replaceDeployFn, replaceDocumentFn, replaceFnFn, replaceKeyFn, replaceLogFn, replaceObjFn, replaceProjectFn, replaceRequestFn, replaceSchemaFn, replaceStorageFn, replaceSubFn, replaceUsageFn, replaceValidatorFn, replaceWorkflowFn, selectServiceFn, selectWindowFn } from "./app.reducer";

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
    // Fn
    on(addFns, (state, { fns }) => addFnsFn(state, fns)),
    on(addFn, (state, { fn }) => addFnFn(state, fn)),
    on(replaceFn, (state, { fn }) => replaceFnFn(state, fn)),
    on(removeFn, (state, { fnId }) => removeFnFn(state, fnId)),
    // Obj
    on(addObjs, (state, { objs }) => addObjsFn(state, objs)),
    on(addObj, (state, { obj }) => addObjFn(state, obj)),
    on(replaceObj, (state, { obj }) => replaceObjFn(state, obj)),
    on(removeObj, (state, { objId }) => removeObjFn(state, objId)),
    // Request
    on(addRequests, (state, { requests }) => addRequestsFn(state, requests)),
    on(addRequest, (state, { request }) => addRequestFn(state, request)),
    on(replaceRequest, (state, { request }) => replaceRequestFn(state, request)),
    on(removeRequest, (state, { requestId }) => removeRequestFn(state, requestId)),
    // Document
    on(addDocuments, (state, { documents }) => addDocumentsFn(state, documents)),
    on(addDocument, (state, { document }) => addDocumentFn(state, document)),
    on(replaceDocument, (state, { document }) => replaceDocumentFn(state, document)),
    on(removeDocument, (state, { documentId }) => removeDocumentFn(state, documentId)),
    // App
    on(addApps, (state, { apps }) => addAppsFn(state, apps)),
    // Instance
    on(addInstances, (state, { instance }) => addInstanceFn(state, instance)),
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
    on(removeKey, (state, { keyId }) => removeKeyFn(state, keyId)),
    // Billing
    on(addBillings, (state, { billings }) => addBillingsFn(state, billings)),
    on(addBilling, (state, { billing }) => addBillingFn(state, billing)),
    on(replaceBilling, (state, { billing }) => replaceBillingFn(state, billing)),
    // Usage
    on(addUsages, (state, { usages }) => addUsagesFn(state, usages)),
    on(addUsage, (state, { usage }) => addUsageFn(state, usage)),
    on(replaceUsage, (state, { usage }) => replaceUsageFn(state, usage)),
    // Sub
    on(addSubs, (state, { subs }) => addSubsFn(state, subs)),
    on(addSub, (state, { sub }) => addSubFn(state, sub)),
    on(replaceSub, (state, { sub }) => replaceSubFn(state, sub)),
    on(removeSub, (state, { subId }) => removeSubFn(state, subId)),
    // Services/View
    on(log, (state, { any }) => logFn(state, any)),
    on(selectService, (state, { serviceName, serviceId }) => selectServiceFn(state, serviceName, serviceId)),
    on(deselectService, (state, { serviceName, serviceId }) => deselectServiceFn(state, serviceName, serviceId)),
    on(selectWindow, (state, { windowName, windowId }) => selectWindowFn(state, windowName, windowId)),
    on(deselectWindow, (state, { windowName, windowId }) => deselectWindowFn(state, windowName, windowId)),
    on(clearStore, (state) => clearStoreFn(state)),
    on(clearData, (state) => clearDataFn(state)),
);
