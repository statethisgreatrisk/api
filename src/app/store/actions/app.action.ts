import { createAction, props } from "@ngrx/store";
import { API, App, Auth, Billing, Deploy, Key, Log, Schema, Storage, Usage, User, Validator, Workflow } from "../interfaces/app.interface";

export const getUser = createAction('[GET] User', props<{userId: string}>());
export const addUser = createAction('[ADD] User', props<{user: User}>());

// Auth
export const signupUser = createAction('[SIGNUP] User', props<{email: string, password: string}>());
export const resendUser = createAction('[RESEND] User', props<{email: string}>());
export const confirmUser = createAction('[CONFIRM] User', props<{email: string, confirmationCode: string}>());
export const forgotUser = createAction('[FORGOT] User', props<{email: string}>());
export const resetUser = createAction('[RESET] User', props<{email: string, password: string, confirmationCode: string}>());
export const loginUser = createAction('[LOGIN] User', props<{email: string, password: string}>());
export const refreshUser = createAction('[REFRESH] User');
export const logoutUser = createAction('[LOGOUT] User', props<{email: string}>());
export const checkUser = createAction('[CHECK] User');
export const authSuccess = createAction('[SUCCESS] Auth', props<{action: Auth['action'], success: boolean, message: string }>());
export const authError = createAction('[ERROR] Auth', props<{action: Auth['action'], success: boolean, message: string }>());

// API
export const getAPIs = createAction('[GET] APIs', props<{userId: string}>());
export const addAPIs = createAction('[ADD] APIs', props<{apis: API[]}>());
export const createAPI = createAction('[CREATE] API', props<{api: API}>());
export const addAPI = createAction('[ADD] API', props<{api: API}>());
export const updateAPI = createAction('[UPDATE] API', props<{api: API}>());
export const replaceAPI = createAction('[REPLACE] API', props<{api: API}>());
export const deleteAPI = createAction('[DELETE] API', props<{userId: string, apiId: string}>());
export const removeAPI = createAction('[REMOVE] API', props<{apiId: string}>());

// Storage
export const getStorages = createAction('[GET] Storages', props<{userId: string}>());
export const addStorages = createAction('[ADD] Storages', props<{storages: Storage[]}>());
export const createStorage = createAction('[CREATE] Storage', props<{storage: Storage}>());
export const addStorage = createAction('[ADD] Storage', props<{storage: Storage}>());
export const updateStorage = createAction('[UPDATE] Storage', props<{storage: Storage}>());
export const replaceStorage = createAction('[REPLACE] Storage', props<{storage: Storage}>());
export const deleteStorage = createAction('[DELETE] Storage', props<{userId: string, storageId: string}>());
export const removeStorage = createAction('[REMOVE] Storage', props<{storageId: string}>());

// Schema
export const getSchemas = createAction('[GET] Schemas', props<{userId: string}>());
export const addSchemas = createAction('[ADD] Schemas', props<{schemas: Schema[]}>());
export const createSchema = createAction('[CREATE] Schema', props<{schema: Schema}>());
export const addSchema = createAction('[ADD] Schema', props<{schema: Schema}>());
export const updateSchema = createAction('[UPDATE] Schema', props<{schema: Schema}>());
export const replaceSchema = createAction('[REPLACE] Schema', props<{schema: Schema}>());
export const deleteSchema = createAction('[DELETE] Schema', props<{userId: string, schemaId: string}>());
export const removeSchema = createAction('[REMOVE] Schema', props<{schemaId: string}>());

// Validator
export const getValidators = createAction('[GET] Validators', props<{userId: string}>());
export const addValidators = createAction('[ADD] Validators', props<{validators: Validator[]}>());
export const createValidator = createAction('[CREATE] Validator', props<{validator: Validator}>());
export const addValidator = createAction('[ADD] Validator', props<{validator: Validator}>());
export const updateValidator = createAction('[UPDATE] Validator', props<{validator: Validator}>());
export const replaceValidator = createAction('[REPLACE] Validator', props<{validator: Validator}>());
export const deleteValidator = createAction('[DELETE] Validator', props<{userId: string, validatorId: string}>());
export const removeValidator = createAction('[REMOVE] Validator', props<{validatorId: string}>());

// Workflow
export const getWorkflows = createAction('[GET] Workflows', props<{userId: string}>());
export const addWorkflows = createAction('[ADD] Workflows', props<{workflows: Workflow[]}>());
export const createWorkflow = createAction('[CREATE] Workflow', props<{workflow: Workflow}>());
export const addWorkflow = createAction('[ADD] Workflow', props<{workflow: Workflow}>());
export const updateWorkflow = createAction('[UPDATE] Workflow', props<{workflow: Workflow}>());
export const replaceWorkflow = createAction('[REPLACE] Workflow', props<{workflow: Workflow}>());
export const deleteWorkflow = createAction('[DELETE] Workflow', props<{userId: string, workflowId: string}>());
export const removeWorkflow = createAction('[REMOVE] Workflow', props<{workflowId: string}>());

// App
export const getApps = createAction('[GET] Apps', props<{userId: string}>());
export const addApps = createAction('[ADD] Apps', props<{apps: App[]}>());

// Deploy
export const getDeploys = createAction('[GET] Deploys', props<{userId: string}>());
export const addDeploys = createAction('[ADD] Deploys', props<{deploys: Deploy[]}>());
export const createDeploy = createAction('[CREATE] Deploy', props<{deploy: Deploy}>());
export const addDeploy = createAction('[ADD] Deploy', props<{deploy: Deploy}>());
export const updateDeploy = createAction('[UPDATE] Deploy', props<{deploy: Deploy}>());
export const replaceDeploy = createAction('[REPLACE] Deploy', props<{deploy: Deploy}>());

// Log
export const getLogs = createAction('[GET] Logs', props<{userId: string}>());
export const addLogs = createAction('[ADD] Logs', props<{logs: Log[]}>());
export const createLog = createAction('[CREATE] Log', props<{log: Log}>());
export const addLog = createAction('[ADD] Log', props<{log: Log}>());
export const updateLog = createAction('[UPDATE] Log', props<{log: Log}>());
export const replaceLog = createAction('[REPLACE] Log', props<{log: Log}>());

// Key
export const getKeys = createAction('[GET] Keys', props<{userId: string}>());
export const addKeys = createAction('[ADD] Keys', props<{keys: Key[]}>());
export const createKey = createAction('[CREATE] Key', props<{key: Key}>());
export const addKey = createAction('[ADD] Key', props<{key: Key}>());
export const updateKey = createAction('[UPDATE] Key', props<{key: Key}>());
export const replaceKey = createAction('[REPLACE] Key', props<{key: Key}>());

// Billing
export const getBillings = createAction('[GET] Billings', props<{userId: string}>());
export const addBillings = createAction('[ADD] Billings', props<{billings: Billing[]}>());
export const createBilling = createAction('[CREATE] Billing', props<{billing: Billing}>());
export const addBilling = createAction('[ADD] Billing', props<{billing: Billing}>());
export const updateBilling = createAction('[UPDATE] Billing', props<{billing: Billing}>());
export const replaceBilling = createAction('[REPLACE] Billing', props<{billing: Billing}>());

// Usage
export const getUsages = createAction('[GET] Usages', props<{userId: string}>());
export const addUsages = createAction('[ADD] Usages', props<{usages: Usage[]}>());
export const createUsage = createAction('[CREATE] Usage', props<{usage: Usage}>());
export const addUsage = createAction('[ADD] Usage', props<{usage: Usage}>());
export const updateUsage = createAction('[UPDATE] Usage', props<{usage: Usage}>());
export const replaceUsage = createAction('[REPLACE] Usage', props<{usage: Usage}>());

export const selectService = createAction('[SELECT] Service', props<{ serviceName: string, serviceId: string }>());
export const deselectService = createAction('[DESELECT] Service', props<{ serviceName: string, serviceId: string }>());

export const selectWindow = createAction('[SELECT] Window', props<{ windowName: string, windowId: string }>());
export const deselectWindow = createAction('[DESELECT] Window', props<{ windowName: string, windowId: string }>());

export const log = createAction('[LOG]', props<{ any: any }>())
export const requestError = createAction('[ERROR] Request', props<{ message: string, error: any }>());
