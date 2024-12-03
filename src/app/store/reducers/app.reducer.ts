import { cloneDeep } from "lodash";
import { API, AppState, User, Storage, Schema, Validator, Workflow, App, Billing, Deploy, Key, Log, Usage, Project, Fn, Obj, Document, Sub, Instance, Request, Variable, Websocket, Queue, Scheduler, Register, ProjectSetup, ProjectData, ProjectSettings, Job, Argtype, Arr, Pool, Code, Chat, ChatChunk } from "../interfaces/app.interface";

// User

export const addUserFn: (state: AppState, user: User) => AppState = (state: AppState, user: User) => {
    if (!user) return { ...state };
    return { ...state, user };
}

// Project

export const addProjectSetupFn: (state: AppState, setup: ProjectSetup) => AppState = (state: AppState, setup: ProjectSetup) => {
    if (!setup) return { ...state };
    return {
        ...state,
        user: setup.user,
        apps: setup.apps,
        projects: setup.projects,
    };
}

export const addProjectDataFn: (state: AppState, data: ProjectData) => AppState = (state: AppState, data: ProjectData) => {
    if (!data) return { ...state };
    return {
        ...state,
        workflows: data.workflows,
        codes: data.codes,
        chats: data.chats,
        apis: data.apis,
        storages: data.storages,
        schemas: data.schemas,
        validators: data.validators,
        fns: data.fns,
        objs: data.objs,
        arrs: data.arrs,
        requests: data.requests,
        variables: data.variables,
        // websockets: data.websockets,
        // queues: data.queues,
        // schedulers: data.schedulers,
        documents: data.documents,
        argtypes: data.argtypes,
     };
}

export const addProjectSettingsFn: (state: AppState, settings: ProjectSettings) => AppState = (state: AppState, settings: ProjectSettings) => {
    if (!settings) return { ...state };
    return {
        ...state,
        instances: [settings.instance],
        deploys: settings.deploys,
        logs: settings.logs,
        keys: settings.keys,
        billings: settings.billings,
        usages: settings.usages,
        subs: settings.subs,
        pools: settings.pools,
        registers: settings.registers,
    };
}

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

// Code

export const addCodesFn: (state: AppState, codes: Code[]) => AppState = (state: AppState, codes: Code[]) => {
    if (!codes) return { ...state };
    return { ...state, codes: codes };
}

export const addCodeFn: (state: AppState, code: Code) => AppState = (state: AppState, code: Code) => {
    if (!code) return { ...state };
    return { ...state, codes: state.codes.concat([code]) };
}

export const replaceCodeFn: (state: AppState, code: Code) => AppState = (state: AppState, code: Code) => {
    if (!code) return { ...state };

    const codes = state.codes.map((existingCode) => {
        if (existingCode._id !== code._id) return existingCode;
        return code;
    });

    return { ...state, codes: codes };
}

export const removeCodeFn: (state: AppState, codeId: string) => AppState = (state: AppState, codeId: string) => {
    if (!codeId) return { ...state };
    return { ...state, codes: state.codes.filter((code) => code._id !== codeId) };
}

// Chat

export const addChatsFn: (state: AppState, chats: Chat[]) => AppState = (state: AppState, chats: Chat[]) => {
    if (!chats) return { ...state };
    return { ...state, chats: chats };
}

export const addChatFn: (state: AppState, chat: Chat) => AppState = (state: AppState, chat: Chat) => {
    if (!chat) return { ...state };
    return { ...state, chats: state.chats.concat([chat]) };
}

export const replaceChatFn: (state: AppState, chat: Chat) => AppState = (state: AppState, chat: Chat) => {
    if (!chat) return { ...state };

    const chats = state.chats.map((existingChat) => {
        if (existingChat._id !== chat._id) return existingChat;

        const updatedChat = cloneDeep(chat);
        updatedChat.messages = [...existingChat.messages, ...updatedChat.messages];

        return updatedChat;
    });

    return { ...state, chats: chats };
}

export const chunkChatFn: (state: AppState, chatId: string, chunk: ChatChunk) => AppState = (state: AppState, chatId: string, chunk: ChatChunk) => {
    if (!chatId) return { ...state };

    const messageId = chunk._id;
    const content = chunk.content;

    const chats = state.chats.map((chat) => {
        if (chat._id !== chatId) return chat;

        const newChat = cloneDeep(chat);
        const foundMessage = newChat.messages.find((message) => message._id === messageId);

        if (!foundMessage) {
            newChat.messages.push(chunk);
        } else {
            newChat.messages = newChat.messages.map((message) => {
                if (message._id !== messageId) return message;

                if (chunk.done) {
                    message.inputTokens = chunk.inputTokens;
                    message.outputTokens = chunk.outputTokens;
                } else {
                    message.content+= content;
                }

                return message;
            });
        }

        if (chunk.done) newChat.name = chunk.name;

        return newChat;
    });

    return { ...state, chats: chats };
}

export const removeChatFn: (state: AppState, chatId: string) => AppState = (state: AppState, chatId: string) => {
    if (!chatId) return { ...state };
    return { ...state, chats: state.chats.filter((chat) => chat._id !== chatId) };
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

// Arr

export const addArrsFn: (state: AppState, arrs: Arr[]) => AppState = (state: AppState, arrs: Arr[]) => {
    if (!arrs) return { ...state };
    return { ...state, arrs: arrs };
}

export const addArrFn: (state: AppState, arr: Arr) => AppState = (state: AppState, arr: Arr) => {
    if (!arr) return { ...state };
    return { ...state, arrs: state.arrs.concat([arr]) };
}

export const replaceArrFn: (state: AppState, arr: Arr) => AppState = (state: AppState, arr: Arr) => {
    if (!arr) return { ...state };

    const arrs = state.arrs.map((existingArr) => {
        if (existingArr._id !== arr._id) return existingArr;
        return arr;
    });

    return { ...state, arrs: arrs };
}

export const removeArrFn: (state: AppState, arrId: string) => AppState = (state: AppState, arrId: string) => {
    if (!arrId) return { ...state };
    return { ...state, arrs: state.arrs.filter((arr) => arr._id !== arrId) };
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

// Variable

export const addVariablesFn: (state: AppState, variables: Variable[]) => AppState = (state: AppState, variables: Variable[]) => {
    if (!variables) return { ...state };
    return { ...state, variables: variables };
}

export const addVariableFn: (state: AppState, variable: Variable) => AppState = (state: AppState, variable: Variable) => {
    if (!variable) return { ...state };
    return { ...state, variables: state.variables.concat([variable]) };
}

export const replaceVariableFn: (state: AppState, variable: Variable) => AppState = (state: AppState, variable: Variable) => {
    if (!variable) return { ...state };

    const variables = state.variables.map((existingVariable) => {
        if (existingVariable._id !== variable._id) return existingVariable;
        return variable;
    });

    return { ...state, variables: variables };
}

export const removeVariableFn: (state: AppState, variableId: string) => AppState = (state: AppState, variableId: string) => {
    if (!variableId) return { ...state };
    return { ...state, variables: state.variables.filter((variable) => variable._id !== variableId) };
}

// Websocket

export const addWebsocketsFn: (state: AppState, websockets: Websocket[]) => AppState = (state: AppState, websockets: Websocket[]) => {
    if (!websockets) return { ...state };
    return { ...state, websockets: websockets };
}

export const addWebsocketFn: (state: AppState, websocket: Websocket) => AppState = (state: AppState, websocket: Websocket) => {
    if (!websocket) return { ...state };
    return { ...state, websockets: state.websockets.concat([websocket]) };
}

export const replaceWebsocketFn: (state: AppState, websocket: Websocket) => AppState = (state: AppState, websocket: Websocket) => {
    if (!websocket) return { ...state };

    const websockets = state.websockets.map((existingWebsocket) => {
        if (existingWebsocket._id !== websocket._id) return existingWebsocket;
        return websocket;
    });

    return { ...state, websockets: websockets };
}

export const removeWebsocketFn: (state: AppState, websocketId: string) => AppState = (state: AppState, websocketId: string) => {
    if (!websocketId) return { ...state };
    return { ...state, websockets: state.websockets.filter((websocket) => websocket._id !== websocketId) };
}

// Queue

export const addQueuesFn: (state: AppState, queues: Queue[]) => AppState = (state: AppState, queues: Queue[]) => {
    if (!queues) return { ...state };
    return { ...state, queues: queues };
}

export const addQueueFn: (state: AppState, queue: Queue) => AppState = (state: AppState, queue: Queue) => {
    if (!queue) return { ...state };
    return { ...state, queues: state.queues.concat([queue]) };
}

export const replaceQueueFn: (state: AppState, queue: Queue) => AppState = (state: AppState, queue: Queue) => {
    if (!queue) return { ...state };

    const queues = state.queues.map((existingQueue) => {
        if (existingQueue._id !== queue._id) return existingQueue;
        return queue;
    });

    return { ...state, queues: queues };
}

export const removeQueueFn: (state: AppState, queueId: string) => AppState = (state: AppState, queueId: string) => {
    if (!queueId) return { ...state };
    return { ...state, queues: state.queues.filter((queue) => queue._id !== queueId) };
}

// Scheduler

export const addSchedulersFn: (state: AppState, schedulers: Scheduler[]) => AppState = (state: AppState, schedulers: Scheduler[]) => {
    if (!schedulers) return { ...state };
    return { ...state, schedulers: schedulers };
}

export const addSchedulerFn: (state: AppState, scheduler: Scheduler) => AppState = (state: AppState, scheduler: Scheduler) => {
    if (!scheduler) return { ...state };
    return { ...state, schedulers: state.schedulers.concat([scheduler]) };
}

export const replaceSchedulerFn: (state: AppState, scheduler: Scheduler) => AppState = (state: AppState, scheduler: Scheduler) => {
    if (!scheduler) return { ...state };

    const schedulers = state.schedulers.map((existingScheduler) => {
        if (existingScheduler._id !== scheduler._id) return existingScheduler;
        return scheduler;
    });

    return { ...state, schedulers: schedulers };
}

export const removeSchedulerFn: (state: AppState, schedulerId: string) => AppState = (state: AppState, schedulerId: string) => {
    if (!schedulerId) return { ...state };
    return { ...state, schedulers: state.schedulers.filter((scheduler) => scheduler._id !== schedulerId) };
}

// Register

export const addRegistersFn: (state: AppState, registers: Register[]) => AppState = (state: AppState, registers: Register[]) => {
    if (!registers) return { ...state };
    return { ...state, registers: registers };
}

export const addRegisterFn: (state: AppState, register: Register) => AppState = (state: AppState, register: Register) => {
    if (!register) return { ...state };
    return { ...state, registers: state.registers.concat([register]) };
}

export const replaceRegisterFn: (state: AppState, register: Register) => AppState = (state: AppState, register: Register) => {
    if (!register) return { ...state };

    const registers = state.registers.map((existingRegister) => {
        if (existingRegister._id !== register._id) return existingRegister;
        return register;
    });

    return { ...state, registers: registers };
}

export const removeRegisterFn: (state: AppState, registerId: string) => AppState = (state: AppState, registerId: string) => {
    if (!registerId) return { ...state };
    return { ...state, registers: state.registers.filter((register) => register._id !== registerId) };
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

    let joinedLogs: Log[] = cloneDeep(logs);

    joinedLogs = joinedLogs.map((log) => {
        log.logs = Object.values(log.logs.reduce((acc, str) => {
            const obj = JSON.parse(str);
            acc[obj._id] = str;
            return acc;
        }, {} as any));

        log.logs = log.logs.sort((a, b) => {
            const objA = JSON.parse(a);
            const objB = JSON.parse(b);
            return new Date(objA['date']).getTime() - new Date(objB['date']).getTime();
        });

        return log;
    });

    return { ...state, logs: joinedLogs };
}

export const addLogFn: (state: AppState, log: Log) => AppState = (state: AppState, log: Log) => {
    if (!log) return { ...state };
    return { ...state, logs: state.logs.concat([log]) };
}

export const addLogLineFn: (state: AppState, logId: string, logLine: string) => AppState = (state: AppState, logId: string, logLine: string) => {
    if (!logId || !logLine) return { ...state };

    const updatedLogs = cloneDeep(state.logs).map((log) => {
        if (log._id === logId) {
            log.logs.push(logLine);

            log.logs = Object.values(log.logs.reduce((acc, str) => {
                const obj = JSON.parse(str);
                acc[obj._id] = str;
                return acc;
            }, {} as any));

            log.logs = log.logs.sort((a, b) => {
                const objA = JSON.parse(a);
                const objB = JSON.parse(b);
                return new Date(objA['date']).getTime() - new Date(objB['date']).getTime();
            });
        }

        return log;
    });

    return { ...state, logs: updatedLogs };
}

export const replaceLogFn: (state: AppState, log: Log) => AppState = (state: AppState, log: Log) => {
    if (!log) return { ...state };

    const logs = state.logs.map((existingLog) => {
        if (existingLog._id !== log._id) return existingLog;
        return log;
    });

    return { ...state, logs: logs };
}

// Job

export const addJobsFn: (state: AppState, jobs: Job[]) => AppState = (state: AppState, jobs: Job[]) => {
    if (!jobs) return { ...state };

    const newJobs = jobs.filter((newJob) => {
        const foundJob = state.jobs.find((existingJob) => existingJob._id === newJob._id);
        return !foundJob;
    });

    if (!newJobs.length) return { ...state };

    return { ...state, jobs: state.jobs.concat(newJobs) };
}

export const addJobFn: (state: AppState, job: Job) => AppState = (state: AppState, job: Job) => {
    if (!job) return { ...state };

    const foundJob = state.jobs.find((existingJob) => existingJob._id === job._id);
    if (foundJob) return { ...state };

    return { ...state, jobs: state.jobs.concat([job]) };
}

// Argtype

export const addArgtypesFn: (state: AppState, argtypes: Argtype[]) => AppState = (state: AppState, argtypes: Argtype[]) => {
    if (!argtypes) return { ...state };
    return { ...state, argtypes: argtypes };
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

// Pool

export const addPoolsFn: (state: AppState, pools: Pool[]) => AppState = (state: AppState, pools: Pool[]) => {
    if (!pools) return { ...state };
    return { ...state, pools: pools };
}

export const addPoolFn: (state: AppState, pool: Pool) => AppState = (state: AppState, pool: Pool) => {
    if (!pool) return { ...state };
    return { ...state, pools: state.pools.concat([pool]) };
}

export const replacePoolFn: (state: AppState, pool: Pool) => AppState = (state: AppState, pool: Pool) => {
    if (!pool) return { ...state };

    const pools = state.pools.map((existingPool) => {
        if (existingPool._id !== pool._id) return existingPool;
        return pool;
    });

    return { ...state, pools: pools };
}

export const removePoolFn: (state: AppState, poolId: string) => AppState = (state: AppState, poolId: string) => {
    if (!poolId) return { ...state };
    return { ...state, pools: state.pools.filter((pool) => pool._id !== poolId) };
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
        codes: [],
        chats: [],
        fns: [],
        objs: [],
        arrs: [],
        requests: [],
        variables: [],
        websockets: [],
        queues: [],
        schedulers: [],
        registers: [],
        documents: [],
        argtypes: [],

        instances: [],
        deploys: [],
        logs: [],
        jobs: [],
        keys: [],
        billings: [],
        usages: [],
        subs: [],
        pools: [],

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
        codes: [],
        chats: [],
        fns: [],
        objs: [],
        arrs: [],
        requests: [],
        variables: [],
        websockets: [],
        queues: [],
        schedulers: [],
        registers: [],
        documents: [],
        argtypes: [],

        instances: [],
        deploys: [],
        logs: [],
        jobs: [],
        keys: [],
        billings: [],
        usages: [],
        subs: [],
        pools: [],

        view: { service: '', serviceId: '', window: '', windowId: '' },
    };
}
