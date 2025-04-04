import { createAction, props } from "@ngrx/store";
import { API, Auth, Billing, Deploy, Fn, Key, Log, Project, Schema, Storage, Usage, User, Validator, Document, Sub, DeployStatus, Instance, Request, Variable, Websocket, Queue, Scheduler, Register, ProjectSetup, ProjectData, ProjectSettings, Job, Pool, Code, CodeExport, Chat, ChatChunk } from "../interfaces/app.interface";

// User
export const getUser = createAction('[GET] User');
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

// Project
export const getProjectSetup = createAction('[GET] Project Setup');
export const addProjectSetup = createAction('[ADD] Project Setup', props<{setup: ProjectSetup}>());
export const getProjectData = createAction('[GET] Project Data', props<{projectId: string}>());
export const addProjectData = createAction('[ADD] Project Data', props<{data: ProjectData}>());
export const getProjectSettings = createAction('[GET] Project Settings', props<{projectId: string}>());
export const addProjectSettings = createAction('[ADD] Project Settings', props<{settings: ProjectSettings}>());

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

// Code
export const getCodes = createAction('[GET] Codes', props<{projectId: string}>());
export const addCodes = createAction('[ADD] Codes', props<{codes: Code[]}>());
export const createCode = createAction('[CREATE] Code', props<{projectId: string, code: CodeExport}>());
export const addCode = createAction('[ADD] Code', props<{code: Code}>());
export const updateCode = createAction('[UPDATE] Code', props<{projectId: string, code: CodeExport}>());
export const updateCodeSuccess = createAction('[UPDATE] Code Success', props<{code: CodeExport}>());
export const updateCodeError = createAction('[UPDATE] Code Error', props<{err: any, code: CodeExport}>());
export const replaceCode = createAction('[REPLACE] Code', props<{code: Code}>());
export const deleteCode = createAction('[DELETE] Code', props<{projectId: string, codeId: string}>());
export const removeCode = createAction('[REMOVE] Code', props<{codeId: string}>());

// Chat
export const getChats = createAction('[GET] Chats', props<{projectId: string}>());
export const addChats = createAction('[ADD] Chats', props<{chats: Chat[]}>());
export const createChat = createAction('[CREATE] Chat', props<{projectId: string, chat: Chat}>());
export const createChatSuccess = createAction('[CREATE] Chat Success', props<{chat: Chat}>());
export const createChatError = createAction('[CREATE] Chat Error', props<{err: any, chat: Chat}>());
export const addChat = createAction('[ADD] Chat', props<{chat: Chat}>());
export const updateChat = createAction('[UPDATE] Chat', props<{projectId: string, chat: Chat}>());
export const updateChatSuccess = createAction('[UPDATE] Chat Success', props<{chat: Chat}>());
export const updateChatError = createAction('[UPDATE] Chat Error', props<{err: any, chat: Chat}>());
export const replaceChat = createAction('[REPLACE] Chat', props<{chat: Chat}>());
export const streamChat = createAction('[STREAM] Chat', props<{projectId: string, chatId: string}>());
export const chunkChat = createAction('[CHUNK] Chat', props<{chatId: string, chunk: ChatChunk}>());
export const deleteChat = createAction('[DELETE] Chat', props<{projectId: string, chatId: string}>());
export const removeChat = createAction('[REMOVE] Chat', props<{chatId: string}>());

// Fn
export const getFns = createAction('[GET] Fns', props<{projectId: string}>());
export const addFns = createAction('[ADD] Fns', props<{fns: Fn[]}>());
export const createFn = createAction('[CREATE] Fn', props<{projectId: string, fn: Fn}>());
export const addFn = createAction('[ADD] Fn', props<{fn: Fn}>());
export const updateFn = createAction('[UPDATE] Fn', props<{projectId: string, fn: Fn}>());
export const replaceFn = createAction('[REPLACE] Fn', props<{fn: Fn}>());
export const deleteFn = createAction('[DELETE] Fn', props<{projectId: string, fnId: string}>());
export const removeFn = createAction('[REMOVE] Fn', props<{fnId: string}>());

// Request
export const getRequests = createAction('[GET] Requests', props<{projectId: string}>());
export const addRequests = createAction('[ADD] Requests', props<{requests: Request[]}>());
export const createRequest = createAction('[CREATE] Request', props<{projectId: string, request: Request, wideRequest: boolean}>());
export const addRequest = createAction('[ADD] Request', props<{request: Request}>());
export const updateRequest = createAction('[UPDATE] Request', props<{projectId: string, request: Request}>());
export const replaceRequest = createAction('[REPLACE] Request', props<{request: Request}>());
export const deleteRequest = createAction('[DELETE] Request', props<{projectId: string, requestId: string}>());
export const removeRequest = createAction('[REMOVE] Request', props<{requestId: string}>());

export const createRequestSuccess = createAction('[SUCCESS] Create Request', props<{request: Request, wideRequest: boolean}>());

// Variable
export const getVariables = createAction('[GET] Variables', props<{projectId: string}>());
export const addVariables = createAction('[ADD] Variables', props<{variables: Variable[]}>());
export const createVariable = createAction('[CREATE] Variable', props<{projectId: string, variable: Variable}>());
export const addVariable = createAction('[ADD] Variable', props<{variable: Variable}>());
export const updateVariable = createAction('[UPDATE] Variable', props<{projectId: string, variable: Variable}>());
export const replaceVariable = createAction('[REPLACE] Variable', props<{variable: Variable}>());
export const deleteVariable = createAction('[DELETE] Variable', props<{projectId: string, variableId: string}>());
export const removeVariable = createAction('[REMOVE] Variable', props<{variableId: string}>());

export const getVariableValue = createAction('[GET] Variable Value', props<{projectId: string, variableId: string}>());
export const getVariableValueSuccess = createAction('[SUCCESS] Get Variable Value');

// Websocket
export const getWebsockets = createAction('[GET] Websockets', props<{projectId: string}>());
export const addWebsockets = createAction('[ADD] Websockets', props<{websockets: Websocket[]}>());
export const createWebsocket = createAction('[CREATE] Websocket', props<{projectId: string, websocket: Websocket}>());
export const addWebsocket = createAction('[ADD] Websocket', props<{websocket: Websocket}>());
export const updateWebsocket = createAction('[UPDATE] Websocket', props<{projectId: string, websocket: Websocket}>());
export const replaceWebsocket = createAction('[REPLACE] Websocket', props<{websocket: Websocket}>());
export const deleteWebsocket = createAction('[DELETE] Websocket', props<{projectId: string, websocketId: string}>());
export const removeWebsocket = createAction('[REMOVE] Websocket', props<{websocketId: string}>());

// Queue
export const getQueues = createAction('[GET] Queues', props<{projectId: string}>());
export const addQueues = createAction('[ADD] Queues', props<{queues: Queue[]}>());
export const createQueue = createAction('[CREATE] Queue', props<{projectId: string, queue: Queue}>());
export const addQueue = createAction('[ADD] Queue', props<{queue: Queue}>());
export const updateQueue = createAction('[UPDATE] Queue', props<{projectId: string, queue: Queue}>());
export const replaceQueue = createAction('[REPLACE] Queue', props<{queue: Queue}>());
export const deleteQueue = createAction('[DELETE] Queue', props<{projectId: string, queueId: string}>());
export const removeQueue = createAction('[REMOVE] Queue', props<{queueId: string}>());

// Scheduler
export const getSchedulers = createAction('[GET] Schedulers', props<{projectId: string}>());
export const addSchedulers = createAction('[ADD] Schedulers', props<{schedulers: Scheduler[]}>());
export const createScheduler = createAction('[CREATE] Scheduler', props<{projectId: string, scheduler: Scheduler}>());
export const addScheduler = createAction('[ADD] Scheduler', props<{scheduler: Scheduler}>());
export const updateScheduler = createAction('[UPDATE] Scheduler', props<{projectId: string, scheduler: Scheduler}>());
export const replaceScheduler = createAction('[REPLACE] Scheduler', props<{scheduler: Scheduler}>());
export const deleteScheduler = createAction('[DELETE] Scheduler', props<{projectId: string, schedulerId: string}>());
export const removeScheduler = createAction('[REMOVE] Scheduler', props<{schedulerId: string}>());

// Register
export const getRegisters = createAction('[GET] Registers', props<{projectId: string}>());
export const addRegisters = createAction('[ADD] Registers', props<{registers: Register[]}>());
export const createRegister = createAction('[CREATE] Register', props<{projectId: string, register: Register}>());
export const addRegister = createAction('[ADD] Register', props<{register: Register}>());
export const updateRegister = createAction('[UPDATE] Register', props<{projectId: string, register: Register}>());
export const replaceRegister = createAction('[REPLACE] Register', props<{register: Register}>());
export const deleteRegister = createAction('[DELETE] Register', props<{projectId: string, registerId: string}>());
export const removeRegister = createAction('[REMOVE] Register', props<{registerId: string}>());

// Document
export const getDocuments = createAction('[GET] Documents', props<{projectId: string}>());
export const addDocuments = createAction('[ADD] Documents', props<{documents: Document[]}>());
export const createDocument = createAction('[CREATE] Document', props<{projectId: string, document: Document}>());
export const addDocument = createAction('[ADD] Document', props<{document: Document}>());
export const updateDocument = createAction('[UPDATE] Document', props<{projectId: string, document: Document}>());
export const replaceDocument = createAction('[REPLACE] Document', props<{document: Document}>());
export const deleteDocument = createAction('[DELETE] Document', props<{projectId: string, documentId: string}>());
export const removeDocument = createAction('[REMOVE] Document', props<{documentId: string}>());

// Instance
export const getInstances = createAction('[GET] Instances', props<{projectId: string}>());
export const addInstances = createAction('[ADD] Instances', props<{instance: Instance}>());

// Deploy
export const getDeploys = createAction('[GET] Deploys', props<{projectId: string}>());
export const addDeploys = createAction('[ADD] Deploys', props<{deploys: Deploy[]}>());
export const startDeploy = createAction('[START] Deploy', props<{projectId: string, deploy: Deploy}>());
export const addDeploy = createAction('[ADD] Deploy', props<{deploy: Deploy}>());
export const stopDeploy = createAction('[STOP] Deploy', props<{projectId: string, deployId: string}>());
export const replaceDeploy = createAction('[REPLACE] Deploy', props<{deploy: Deploy}>());

export const deployStartSuccess = createAction('[SUCCESS] Deploy Start');
export const deployStartError = createAction('[ERROR] Deploy Start');
export const deployStopSuccess = createAction('[SUCCESS] Deploy Stop');
export const deployStopError = createAction('[ERROR] Deploy Stop');

export const getDeployStatus = createAction('[GET] Deploy Status', props<{projectId: string, deployId: string}>());
export const getDeployStatusSuccess = createAction('[SUCCESS] Deploy Status', props<{status: DeployStatus}>());
export const getDeployStatusError = createAction('[ERROR] Deploy Status');

// Log
export const getLogs = createAction('[GET] Logs', props<{projectId: string}>());
export const addLogs = createAction('[ADD] Logs', props<{logs: Log[]}>());
export const createLog = createAction('[CREATE] Log', props<{projectId: string, log: Log}>());
export const addLog = createAction('[ADD] Log', props<{log: Log}>());
export const updateLog = createAction('[UPDATE] Log', props<{projectId: string, log: Log}>());
export const replaceLog = createAction('[REPLACE] Log', props<{log: Log}>());
export const addLogLine = createAction('[ADD] Log line', props<{logId: string, logLine: string}>());

// Job
export const getJobs = createAction('[GET] Jobs', props<{projectId: string}>());
export const addJobs = createAction('[ADD] Jobs', props<{jobs: Job[]}>());
export const addJob = createAction('[ADD] Job', props<{job: Job}>());

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

// Sub
export const getSubs = createAction('[GET] Subs', props<{projectId: string}>());
export const addSubs = createAction('[ADD] Subs', props<{subs: Sub[]}>());
export const createSub = createAction('[CREATE] Sub', props<{projectId: string, sub: Sub}>());
export const addSub = createAction('[ADD] Sub', props<{sub: Sub}>());
export const updateSub = createAction('[UPDATE] Sub', props<{projectId: string, sub: Sub}>());
export const replaceSub = createAction('[REPLACE] Sub', props<{sub: Sub}>());
export const deleteSub = createAction('[DELETE] Sub', props<{projectId: string, subId: string}>());
export const removeSub = createAction('[REMOVE] Sub', props<{subId: string}>());

// Pool
export const getPools = createAction('[GET] Pools', props<{projectId: string}>());
export const addPools = createAction('[ADD] Pools', props<{pools: Pool[]}>());
export const createPool = createAction('[CREATE] Pool', props<{projectId: string, pool: Pool}>());
export const addPool = createAction('[ADD] Pool', props<{pool: Pool}>());
export const updatePool = createAction('[UPDATE] Pool', props<{projectId: string, pool: Pool}>());
export const replacePool = createAction('[REPLACE] Pool', props<{pool: Pool}>());
export const deletePool = createAction('[DELETE] Pool', props<{projectId: string, poolId: string}>());
export const removePool = createAction('[REMOVE] Pool', props<{poolId: string}>());

export const selectService = createAction('[SELECT] Service', props<{ serviceName: string, serviceId: string }>());
export const deselectService = createAction('[DESELECT] Service', props<{ serviceName: string, serviceId: string }>());

export const selectWindow = createAction('[SELECT] Window', props<{ windowName: string, windowId: string }>());
export const deselectWindow = createAction('[DESELECT] Window', props<{ windowName: string, windowId: string }>());

export const log = createAction('[LOG]', props<{ any: any }>())
export const requestError = createAction('[ERROR] Request', props<{ message: string, error: any }>());
export const clearStore = createAction('[CLEAR] Store');
export const clearData = createAction('[CLEAR] Data');
