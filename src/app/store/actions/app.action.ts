import { createAction, props } from "@ngrx/store";
import { API, App, Auth, Billing, Deploy, Key, Log, Project, Schema, Storage, Usage, User, Validator, Workflow } from "../interfaces/app.interface";

// User
export const getUser = createAction('[GET] User');
export const addUser = createAction('[ADD] User', props<{user: User}>());

// App
export const getApps = createAction('[GET] Apps');
export const addApps = createAction('[ADD] Apps', props<{apps: App[]}>());

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

// Project
export const getProjects = createAction('[GET] Projects');
export const addProjects = createAction('[ADD] Projects', props<{projects: Project[]}>());
export const createProject = createAction('[CREATE] Project', props<{project: Project}>());
export const addProject = createAction('[ADD] Project', props<{project: Project}>());
export const updateProject = createAction('[UPDATE] Project', props<{projectId: string, project: Project}>());
export const replaceProject = createAction('[REPLACE] Project', props<{project: Project}>());
export const deleteProject = createAction('[DELETE] Project', props<{projectId: string}>());
export const removeProject = createAction('[REMOVE] Project', props<{projectId: string}>());

export const changeProject = createAction('[CHANGE] Project', props<{projectId: string}>());

// API
export const getAPIs = createAction('[GET] APIs', props<{projectId: string}>());
export const addAPIs = createAction('[ADD] APIs', props<{apis: API[]}>());
export const createAPI = createAction('[CREATE] API', props<{projectId: string, api: API}>());
export const addAPI = createAction('[ADD] API', props<{api: API}>());
export const updateAPI = createAction('[UPDATE] API', props<{projectId: string, api: API}>());
export const replaceAPI = createAction('[REPLACE] API', props<{api: API}>());
export const deleteAPI = createAction('[DELETE] API', props<{projectId: string, apiId: string}>());
export const removeAPI = createAction('[REMOVE] API', props<{apiId: string}>());

// Storage
export const getStorages = createAction('[GET] Storages', props<{projectId: string}>());
export const addStorages = createAction('[ADD] Storages', props<{storages: Storage[]}>());
export const createStorage = createAction('[CREATE] Storage', props<{projectId: string, storage: Storage}>());
export const addStorage = createAction('[ADD] Storage', props<{storage: Storage}>());
export const updateStorage = createAction('[UPDATE] Storage', props<{projectId: string, storage: Storage}>());
export const replaceStorage = createAction('[REPLACE] Storage', props<{storage: Storage}>());
export const deleteStorage = createAction('[DELETE] Storage', props<{projectId: string, storageId: string}>());
export const removeStorage = createAction('[REMOVE] Storage', props<{storageId: string}>());

// Schema
export const getSchemas = createAction('[GET] Schemas', props<{projectId: string}>());
export const addSchemas = createAction('[ADD] Schemas', props<{schemas: Schema[]}>());
export const createSchema = createAction('[CREATE] Schema', props<{projectId: string, schema: Schema}>());
export const addSchema = createAction('[ADD] Schema', props<{schema: Schema}>());
export const updateSchema = createAction('[UPDATE] Schema', props<{projectId: string, schema: Schema}>());
export const replaceSchema = createAction('[REPLACE] Schema', props<{schema: Schema}>());
export const deleteSchema = createAction('[DELETE] Schema', props<{projectId: string, schemaId: string}>());
export const removeSchema = createAction('[REMOVE] Schema', props<{schemaId: string}>());

// Validator
export const getValidators = createAction('[GET] Validators', props<{projectId: string}>());
export const addValidators = createAction('[ADD] Validators', props<{validators: Validator[]}>());
export const createValidator = createAction('[CREATE] Validator', props<{projectId: string, validator: Validator}>());
export const addValidator = createAction('[ADD] Validator', props<{validator: Validator}>());
export const updateValidator = createAction('[UPDATE] Validator', props<{projectId: string, validator: Validator}>());
export const replaceValidator = createAction('[REPLACE] Validator', props<{validator: Validator}>());
export const deleteValidator = createAction('[DELETE] Validator', props<{projectId: string, validatorId: string}>());
export const removeValidator = createAction('[REMOVE] Validator', props<{validatorId: string}>());

// Workflow
export const getWorkflows = createAction('[GET] Workflows', props<{projectId: string}>());
export const addWorkflows = createAction('[ADD] Workflows', props<{workflows: Workflow[]}>());
export const createWorkflow = createAction('[CREATE] Workflow', props<{projectId: string, workflow: Workflow}>());
export const addWorkflow = createAction('[ADD] Workflow', props<{workflow: Workflow}>());
export const updateWorkflow = createAction('[UPDATE] Workflow', props<{projectId: string, workflow: Workflow}>());
export const replaceWorkflow = createAction('[REPLACE] Workflow', props<{workflow: Workflow}>());
export const deleteWorkflow = createAction('[DELETE] Workflow', props<{projectId: string, workflowId: string}>());
export const removeWorkflow = createAction('[REMOVE] Workflow', props<{workflowId: string}>());

// Deploy
export const getDeploys = createAction('[GET] Deploys', props<{projectId: string}>());
export const addDeploys = createAction('[ADD] Deploys', props<{deploys: Deploy[]}>());
export const createDeploy = createAction('[CREATE] Deploy', props<{projectId: string, deploy: Deploy}>());
export const addDeploy = createAction('[ADD] Deploy', props<{deploy: Deploy}>());
export const updateDeploy = createAction('[UPDATE] Deploy', props<{projectId: string, deploy: Deploy}>());
export const replaceDeploy = createAction('[REPLACE] Deploy', props<{deploy: Deploy}>());

// Log
export const getLogs = createAction('[GET] Logs', props<{projectId: string}>());
export const addLogs = createAction('[ADD] Logs', props<{logs: Log[]}>());
export const createLog = createAction('[CREATE] Log', props<{projectId: string, log: Log}>());
export const addLog = createAction('[ADD] Log', props<{log: Log}>());
export const updateLog = createAction('[UPDATE] Log', props<{projectId: string, log: Log}>());
export const replaceLog = createAction('[REPLACE] Log', props<{log: Log}>());

// Key
export const getKeys = createAction('[GET] Keys', props<{projectId: string}>());
export const addKeys = createAction('[ADD] Keys', props<{keys: Key[]}>());
export const createKey = createAction('[CREATE] Key', props<{projectId: string, key: Key}>());
export const addKey = createAction('[ADD] Key', props<{key: Key}>());
export const updateKey = createAction('[UPDATE] Key', props<{projectId: string, key: Key}>());
export const replaceKey = createAction('[REPLACE] Key', props<{key: Key}>());
export const deleteKey = createAction('[DELETE] Key', props<{projectId: string, keyId: string}>());
export const removeKey = createAction('[REMOVE] Key', props<{keyId: string}>());

// Billing
export const getBillings = createAction('[GET] Billings', props<{projectId: string}>());
export const addBillings = createAction('[ADD] Billings', props<{billings: Billing[]}>());
export const createBilling = createAction('[CREATE] Billing', props<{projectId: string, billing: Billing}>());
export const addBilling = createAction('[ADD] Billing', props<{billing: Billing}>());
export const updateBilling = createAction('[UPDATE] Billing', props<{projectId: string, billing: Billing}>());
export const replaceBilling = createAction('[REPLACE] Billing', props<{billing: Billing}>());
export const billingSuccess = createAction('[SUCCESS] Billing');
export const billingError = createAction('[ERROR] Billing');

// Usage
export const getUsages = createAction('[GET] Usages', props<{projectId: string}>());
export const addUsages = createAction('[ADD] Usages', props<{usages: Usage[]}>());
export const createUsage = createAction('[CREATE] Usage', props<{projectId: string, usage: Usage}>());
export const addUsage = createAction('[ADD] Usage', props<{usage: Usage}>());
export const updateUsage = createAction('[UPDATE] Usage', props<{projectId: string, usage: Usage}>());
export const replaceUsage = createAction('[REPLACE] Usage', props<{usage: Usage}>());

export const selectService = createAction('[SELECT] Service', props<{ serviceName: string, serviceId: string }>());
export const deselectService = createAction('[DESELECT] Service', props<{ serviceName: string, serviceId: string }>());

export const selectWindow = createAction('[SELECT] Window', props<{ windowName: string, windowId: string }>());
export const deselectWindow = createAction('[DESELECT] Window', props<{ windowName: string, windowId: string }>());

export const log = createAction('[LOG]', props<{ any: any }>())
export const requestError = createAction('[ERROR] Request', props<{ message: string, error: any }>());
export const clearStore = createAction('[CLEAR] Store');
export const clearData = createAction('[CLEAR] Data');
