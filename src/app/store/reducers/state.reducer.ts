import { createReducer, on } from "@ngrx/store";
import { appState } from "../states/state";
import { addAPI, addAPIs, addBilling, addBillings, addDeploy, addDeploys, addDocument, addDocuments, addFn, addFns, addInstances, addKey, addKeys, addLog, addLogs, addRegister, addRegisters, addProject, addProjects, addQueue, addQueues, addRequest, addRequests, addScheduler, addSchedulers, addSchema, addSchemas, addStorage, addStorages, addSub, addSubs, addUsage, addUsages, addUser, addValidator, addValidators, addVariable, addVariables, addWebsocket, addWebsockets, clearData, clearStore, deselectService, deselectWindow, log, removeAPI, removeDocument, removeFn, removeKey, removeRegister, removeProject, removeQueue, removeRequest, removeScheduler, removeSchema, removeStorage, removeSub, removeValidator, removeVariable, removeWebsocket, replaceAPI, replaceBilling, replaceDeploy, replaceDocument, replaceFn, replaceKey, replaceLog, replaceRegister, replaceProject, replaceQueue, replaceRequest, replaceScheduler, replaceSchema, replaceStorage, replaceSub, replaceUsage, replaceValidator, replaceVariable, replaceWebsocket, selectService, selectWindow, addProjectSetup, addProjectData, addProjectSettings, addJob, addJobs, addLogLine, addPool, addPools, removePool, replacePool, addCode, addCodes, removeCode, replaceCode, addChat, addChats, removeChat, replaceChat, chunkChat } from "../actions/app.action";
import { addAPIFn, addAPIsFn, addBillingFn, addBillingsFn, addDeployFn, addDeploysFn, addDocumentFn, addDocumentsFn, addFnFn, addFnsFn, addInstanceFn, addKeyFn, addKeysFn, addLogFn, addLogsFn, addRegisterFn, addRegistersFn, addProjectFn, addProjectsFn, addQueueFn, addQueuesFn, addRequestFn, addRequestsFn, addSchedulerFn, addSchedulersFn, addSchemaFn, addSchemasFn, addStorageFn, addStoragesFn, addSubFn, addSubsFn, addUsageFn, addUsagesFn, addUserFn, addValidatorFn, addValidatorsFn, addVariableFn, addVariablesFn, addWebsocketFn, addWebsocketsFn, clearDataFn, clearStoreFn, deselectServiceFn, deselectWindowFn, logFn, removeAPIFn, removeDocumentFn, removeFnFn, removeKeyFn, removeRegisterFn, removeProjectFn, removeQueueFn, removeRequestFn, removeSchedulerFn, removeSchemaFn, removeStorageFn, removeSubFn, removeValidatorFn, removeVariableFn, removeWebsocketFn, replaceAPIFn, replaceBillingFn, replaceDeployFn, replaceDocumentFn, replaceFnFn, replaceKeyFn, replaceLogFn, replaceRegisterFn, replaceProjectFn, replaceQueueFn, replaceRequestFn, replaceSchedulerFn, replaceSchemaFn, replaceStorageFn, replaceSubFn, replaceUsageFn, replaceValidatorFn, replaceVariableFn, replaceWebsocketFn, selectServiceFn, selectWindowFn, addProjectSetupFn, addProjectDataFn, addProjectSettingsFn, addJobFn, addJobsFn, addLogLineFn, addPoolFn, addPoolsFn, removePoolFn, replacePoolFn, addCodeFn, addCodesFn, removeCodeFn, replaceCodeFn, addChatFn, addChatsFn, removeChatFn, replaceChatFn, chunkChatFn } from "./app.reducer";

export const appStateReducer = createReducer(
    appState,
    // User
    on(addUser, (state, { user }) => addUserFn(state, user)),
    // Project
    on(addProjectSetup, (state, { setup }) => addProjectSetupFn(state, setup)),
    on(addProjectData, (state, { data }) => addProjectDataFn(state, data)),
    on(addProjectSettings, (state, { settings }) => addProjectSettingsFn(state, settings)),
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
    // Code
    on(addCodes, (state, { codes }) => addCodesFn(state, codes)),
    on(addCode, (state, { code }) => addCodeFn(state, code)),
    on(replaceCode, (state, { code }) => replaceCodeFn(state, code)),
    on(removeCode, (state, { codeId }) => removeCodeFn(state, codeId)),
    // Chat
    on(addChats, (state, { chats }) => addChatsFn(state, chats)),
    on(addChat, (state, { chat }) => addChatFn(state, chat)),
    on(replaceChat, (state, { chat }) => replaceChatFn(state, chat)),
    on(chunkChat, (state, { chatId, chunk }) => chunkChatFn(state, chatId, chunk)),
    on(removeChat, (state, { chatId }) => removeChatFn(state, chatId)),
    // Fn
    on(addFns, (state, { fns }) => addFnsFn(state, fns)),
    on(addFn, (state, { fn }) => addFnFn(state, fn)),
    on(replaceFn, (state, { fn }) => replaceFnFn(state, fn)),
    on(removeFn, (state, { fnId }) => removeFnFn(state, fnId)),
    // Request
    on(addRequests, (state, { requests }) => addRequestsFn(state, requests)),
    on(addRequest, (state, { request }) => addRequestFn(state, request)),
    on(replaceRequest, (state, { request }) => replaceRequestFn(state, request)),
    on(removeRequest, (state, { requestId }) => removeRequestFn(state, requestId)),
    // Variable
    on(addVariables, (state, { variables }) => addVariablesFn(state, variables)),
    on(addVariable, (state, { variable }) => addVariableFn(state, variable)),
    on(replaceVariable, (state, { variable }) => replaceVariableFn(state, variable)),
    on(removeVariable, (state, { variableId }) => removeVariableFn(state, variableId)),
    // Websocket
    on(addWebsockets, (state, { websockets }) => addWebsocketsFn(state, websockets)),
    on(addWebsocket, (state, { websocket }) => addWebsocketFn(state, websocket)),
    on(replaceWebsocket, (state, { websocket }) => replaceWebsocketFn(state, websocket)),
    on(removeWebsocket, (state, { websocketId }) => removeWebsocketFn(state, websocketId)),
    // Queue
    on(addQueues, (state, { queues }) => addQueuesFn(state, queues)),
    on(addQueue, (state, { queue }) => addQueueFn(state, queue)),
    on(replaceQueue, (state, { queue }) => replaceQueueFn(state, queue)),
    on(removeQueue, (state, { queueId }) => removeQueueFn(state, queueId)),
    // Scheduler
    on(addSchedulers, (state, { schedulers }) => addSchedulersFn(state, schedulers)),
    on(addScheduler, (state, { scheduler }) => addSchedulerFn(state, scheduler)),
    on(replaceScheduler, (state, { scheduler }) => replaceSchedulerFn(state, scheduler)),
    on(removeScheduler, (state, { schedulerId }) => removeSchedulerFn(state, schedulerId)),
    // Register
    on(addRegisters, (state, { registers }) => addRegistersFn(state, registers)),
    on(addRegister, (state, { register }) => addRegisterFn(state, register)),
    on(replaceRegister, (state, { register }) => replaceRegisterFn(state, register)),
    on(removeRegister, (state, { registerId }) => removeRegisterFn(state, registerId)),
    // Document
    on(addDocuments, (state, { documents }) => addDocumentsFn(state, documents)),
    on(addDocument, (state, { document }) => addDocumentFn(state, document)),
    on(replaceDocument, (state, { document }) => replaceDocumentFn(state, document)),
    on(removeDocument, (state, { documentId }) => removeDocumentFn(state, documentId)),
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
    on(addLogLine, (state, { logId, logLine }) => addLogLineFn(state, logId, logLine)),
    // Job
    on(addJobs, (state, { jobs }) => addJobsFn(state, jobs)),
    on(addJob, (state, { job }) => addJobFn(state, job)),
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
    // Pool
    on(addPools, (state, { pools }) => addPoolsFn(state, pools)),
    on(addPool, (state, { pool }) => addPoolFn(state, pool)),
    on(replacePool, (state, { pool }) => replacePoolFn(state, pool)),
    on(removePool, (state, { poolId }) => removePoolFn(state, poolId)),
    // Services/View
    on(log, (state, { any }) => logFn(state, any)),
    on(selectService, (state, { serviceName, serviceId }) => selectServiceFn(state, serviceName, serviceId)),
    on(deselectService, (state, { serviceName, serviceId }) => deselectServiceFn(state, serviceName, serviceId)),
    on(selectWindow, (state, { windowName, windowId }) => selectWindowFn(state, windowName, windowId)),
    on(deselectWindow, (state, { windowName, windowId }) => deselectWindowFn(state, windowName, windowId)),
    on(clearStore, (state) => clearStoreFn(state)),
    on(clearData, (state) => clearDataFn(state)),
);
