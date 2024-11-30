import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AppRequest } from "../requests/app.request";
import { getUser, addUser, requestError, addAPI, addAPIs, createAPI, deleteAPI, getAPIs, removeAPI, replaceAPI, updateAPI, addStorage, addStorages, createStorage, deleteStorage, getStorages, removeStorage, replaceStorage, updateStorage, addSchema, addSchemas, createSchema, deleteSchema, getSchemas, removeSchema, replaceSchema, updateSchema, addValidator, addValidators, createValidator, deleteValidator, getValidators, removeValidator, replaceValidator, updateValidator, addWorkflow, addWorkflows, createWorkflow, deleteWorkflow, getWorkflows, removeWorkflow, replaceWorkflow, updateWorkflow, getApps, addApps, addBilling, addBillings, addDeploy, addDeploys, addKey, addKeys, addLog, addLogs, addUsage, addUsages, createBilling, createKey, createLog, createUsage, getBillings, getDeploys, getKeys, getLogs, getUsages, replaceBilling, replaceDeploy, replaceKey, replaceLog, replaceUsage, updateBilling, updateKey, updateLog, updateUsage, signupUser, authError, authSuccess, resendUser, confirmUser, forgotUser, resetUser, loginUser, logoutUser, refreshUser, checkUser, addProject, addProjects, createProject, deleteProject, getProjects, removeProject, replaceProject, updateProject, deleteKey, removeKey, billingError, billingSuccess, deployStartSuccess, deployStartError, addFn, addFns, addObj, addObjs, createFn, createObj, deleteFn, deleteObj, getFns, getObjs, removeFn, removeObj, replaceFn, replaceObj, updateFn, updateObj, addDocument, addDocuments, createDocument, deleteDocument, getDocuments, removeDocument, replaceDocument, updateDocument, addSub, addSubs, createSub, deleteSub, getSubs, removeSub, replaceSub, updateSub, startDeploy, stopDeploy, deployStopSuccess, deployStopError, getDeployStatus, getDeployStatusError, getDeployStatusSuccess, getInstances, addInstances, addRequest, addRequests, createRequest, deleteRequest, getRequests, removeRequest, replaceRequest, updateRequest, createRequestSuccess, addVariable, addVariables, createVariable, deleteVariable, getVariables, removeVariable, replaceVariable, updateVariable, addWebsocket, addWebsockets, createWebsocket, deleteWebsocket, getWebsockets, removeWebsocket, replaceWebsocket, updateWebsocket, addQueue, addQueues, createQueue, deleteQueue, getQueues, removeQueue, replaceQueue, updateQueue, addScheduler, addSchedulers, createScheduler, deleteScheduler, getSchedulers, removeScheduler, replaceScheduler, updateScheduler, addRegister, addRegisters, createRegister, deleteRegister, getRegisters, removeRegister, replaceRegister, updateRegister, getProjectSetup, addProjectSettings, addProjectSetup, getProjectData, addProjectData, getProjectSettings, getVariableValue, getVariableValueSuccess, addJobs, getJobs, getArgtypes, addArgtypes, addArr, addArrs, createArr, deleteArr, getArrs, removeArr, replaceArr, updateArr, addPool, addPools, createPool, deletePool, getPools, removePool, replacePool, updatePool, addCode, addCodes, createCode, deleteCode, getCodes, removeCode, replaceCode, updateCode, addChat, addChats, createChat, deleteChat, getChats, removeChat, replaceChat, updateChat } from "../actions/app.action";

@Injectable()
export class AppEffect {
    constructor(private actions$: Actions, private appRequest: AppRequest) {}

    // User

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUser),
            exhaustMap((action) => this.appRequest.getUser().pipe(
                map(data => addUser({ user: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // App

    getApps$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getApps),
            exhaustMap((action) => this.appRequest.getApps().pipe(
                map(data => addApps({ apps: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Auth

    authSignup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupUser),
            exhaustMap((action) => this.appRequest.authSignup(action.email, action.password).pipe(
                map(data => authSuccess({ action: 'signup', success: true, message: data })),
                catchError(err => of(authError({ action: 'signup', success: false, message: err.error })))
            )),
        );
    });

    authResend$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(resendUser),
            exhaustMap((action) => this.appRequest.authResend(action.email).pipe(
                map(data => authSuccess({ action: 'resend', success: true, message: data })),
                catchError(err => of(authError({ action: 'resend', success: false, message: err.error })))
            )),
        );
    });

    authConfirm$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(confirmUser),
            exhaustMap((action) => this.appRequest.authConfirm(action.email, action.confirmationCode).pipe(
                map(data => authSuccess({ action: 'confirm', success: true, message: data })),
                catchError(err => of(authError({ action: 'confirm', success: false, message: err.error })))
            )),
        );
    });

    authForgot$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(forgotUser),
            exhaustMap((action) => this.appRequest.authForgot(action.email).pipe(
                map(data => authSuccess({ action: 'forgot', success: true, message: data })),
                catchError(err => of(authError({ action: 'forgot', success: false, message: err.error })))
            )),
        );
    });

    authReset$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(resetUser),
            exhaustMap((action) => this.appRequest.authReset(action.email, action.password, action.confirmationCode).pipe(
                map(data => authSuccess({ action: 'reset', success: true, message: data })),
                catchError(err => of(authError({ action: 'reset', success: false, message: err.error })))
            )),
        );
    });

    authLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginUser),
            exhaustMap((action) => this.appRequest.authLogin(action.email, action.password).pipe(
                map(data => authSuccess({ action: 'login', success: true, message: data })),
                catchError(err => of(authError({ action: 'login', success: false, message: err.error })))
            )),
        );
    });

    authRefresh$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(refreshUser),
            exhaustMap((action) => this.appRequest.authRefresh().pipe(
                map(data => authSuccess({ action: 'refresh', success: true, message: data })),
                catchError(err => of(authError({ action: 'refresh', success: false, message: err.error })))
            )),
        );
    });

    authLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logoutUser),
            exhaustMap((action) => this.appRequest.authLogout(action.email).pipe(
                map(data => authSuccess({ action: 'logout', success: true, message: data })),
                catchError(err => of(authError({ action: 'logout', success: false, message: err.error })))
            )),
        );
    });

    authCheck$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(checkUser),
            exhaustMap((action) => this.appRequest.authCheck().pipe(
                map(data => authSuccess({ action: 'check', success: true, message: data })),
                catchError(err => of(authError({ action: 'check', success: false, message: err.error })))
            )),
        );
    });

    // Project

    getProjectSetup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProjectSetup),
            exhaustMap((action) => this.appRequest.getProjectSetup().pipe(
                map(data => addProjectSetup({ setup: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    getProjectData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProjectData),
            exhaustMap((action) => this.appRequest.getProjectData(action.projectId).pipe(
                map(data => addProjectData({ data: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    getProjectSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProjectSettings),
            exhaustMap((action) => this.appRequest.getProjectSettings(action.projectId).pipe(
                map(data => addProjectSettings({ settings: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    getProjects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getProjects),
            exhaustMap((action) => this.appRequest.getProjects().pipe(
                map(data => addProjects({ projects: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createProject$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createProject),
            exhaustMap((action) => this.appRequest.createProject(action.project).pipe(
                map(data => addProject({ project: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateProject$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateProject),
            exhaustMap((action) => this.appRequest.updateProject(action.projectId, action.project).pipe(
                map(data => replaceProject({ project: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteProject$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteProject),
            exhaustMap((action) => this.appRequest.deleteProject(action.projectId).pipe(
                map(data => removeProject({ projectId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // API

    getAPIs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAPIs),
            exhaustMap((action) => this.appRequest.getAPIs(action.projectId).pipe(
                map(data => addAPIs({ apis: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createAPI$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createAPI),
            exhaustMap((action) => this.appRequest.createAPI(action.projectId, action.api).pipe(
                map(data => addAPI({ api: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateAPI$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateAPI),
            exhaustMap((action) => this.appRequest.updateAPI(action.projectId, action.api).pipe(
                map(data => replaceAPI({ api: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteAPI$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteAPI),
            exhaustMap((action) => this.appRequest.deleteAPI(action.projectId, action.apiId).pipe(
                map(data => removeAPI({ apiId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Storage

    getStorages$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getStorages),
            exhaustMap((action) => this.appRequest.getStorages(action.projectId).pipe(
                map(data => addStorages({ storages: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    createStorage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createStorage),
            exhaustMap((action) => this.appRequest.createStorage(action.projectId, action.storage).pipe(
                map(data => addStorage({ storage: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    updateStorage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateStorage),
            exhaustMap((action) => this.appRequest.updateStorage(action.projectId, action.storage).pipe(
                map(data => replaceStorage({ storage: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    deleteStorage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteStorage),
            exhaustMap((action) => this.appRequest.deleteStorage(action.projectId, action.storageId).pipe(
                map(data => removeStorage({ storageId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Schema

    getSchemas$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getSchemas),
            exhaustMap((action) => this.appRequest.getSchemas(action.projectId).pipe(
                map(data => addSchemas({ schemas: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    createSchema$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createSchema),
            exhaustMap((action) => this.appRequest.createSchema(action.projectId, action.schema).pipe(
                map(data => addSchema({ schema: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    updateSchema$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateSchema),
            exhaustMap((action) => this.appRequest.updateSchema(action.projectId, action.schema).pipe(
                map(data => replaceSchema({ schema: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    deleteSchema$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteSchema),
            exhaustMap((action) => this.appRequest.deleteSchema(action.projectId, action.schemaId).pipe(
                map(data => removeSchema({ schemaId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Validator

    getValidators$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getValidators),
            exhaustMap((action) => this.appRequest.getValidators(action.projectId).pipe(
                map(data => addValidators({ validators: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    createValidator$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createValidator),
            exhaustMap((action) => this.appRequest.createValidator(action.projectId, action.validator).pipe(
                map(data => addValidator({ validator: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    updateValidator$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateValidator),
            exhaustMap((action) => this.appRequest.updateValidator(action.projectId, action.validator).pipe(
                map(data => replaceValidator({ validator: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    deleteValidator$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteValidator),
            exhaustMap((action) => this.appRequest.deleteValidator(action.projectId, action.validatorId).pipe(
                map(data => removeValidator({ validatorId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Workflow

    getWorkflows$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getWorkflows),
            exhaustMap((action) => this.appRequest.getWorkflows(action.projectId).pipe(
                map(data => addWorkflows({ workflows: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createWorkflow$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createWorkflow),
            exhaustMap((action) => this.appRequest.createWorkflow(action.projectId, action.workflow).pipe(
                map(data => addWorkflow({ workflow: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateWorkflow$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateWorkflow),
            exhaustMap((action) => this.appRequest.updateWorkflow(action.projectId, action.workflow).pipe(
                map(data => replaceWorkflow({ workflow: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteWorkflow$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteWorkflow),
            exhaustMap((action) => this.appRequest.deleteWorkflow(action.projectId, action.workflowId).pipe(
                map(data => removeWorkflow({ workflowId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Code

    getCodes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getCodes),
            exhaustMap((action) => this.appRequest.getCodes(action.projectId).pipe(
                map(data => addCodes({ codes: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createCode$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCode),
            exhaustMap((action) => this.appRequest.createCode(action.projectId, action.code).pipe(
                map(data => addCode({ code: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateCode$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateCode),
            exhaustMap((action) => this.appRequest.updateCode(action.projectId, action.code).pipe(
                map(data => replaceCode({ code: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteCode$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteCode),
            exhaustMap((action) => this.appRequest.deleteCode(action.projectId, action.codeId).pipe(
                map(data => removeCode({ codeId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Chat

    getChats$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getChats),
            exhaustMap((action) => this.appRequest.getChats(action.projectId).pipe(
                map(data => addChats({ chats: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    createChat$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createChat),
            exhaustMap((action) => this.appRequest.createChat(action.projectId, action.chat).pipe(
                map(data => addChat({ chat: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    updateChat$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateChat),
            exhaustMap((action) => this.appRequest.updateChat(action.projectId, action.variableId, action.chat).pipe(
                map(data => replaceChat({ chat: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    deleteChat$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteChat),
            exhaustMap((action) => this.appRequest.deleteChat(action.projectId, action.chatId).pipe(
                map(data => removeChat({ chatId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    

    // Fn

    getFns$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getFns),
            exhaustMap((action) => this.appRequest.getFns(action.projectId).pipe(
                map(data => addFns({ fns: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createFn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createFn),
            exhaustMap((action) => this.appRequest.createFn(action.projectId, action.fn).pipe(
                map(data => addFn({ fn: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateFn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateFn),
            exhaustMap((action) => this.appRequest.updateFn(action.projectId, action.fn).pipe(
                map(data => replaceFn({ fn: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteFn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteFn),
            exhaustMap((action) => this.appRequest.deleteFn(action.projectId, action.fnId).pipe(
                map(data => removeFn({ fnId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Obj

    getObjs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getObjs),
            exhaustMap((action) => this.appRequest.getObjs(action.projectId).pipe(
                map(data => addObjs({ objs: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createObj$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createObj),
            exhaustMap((action) => this.appRequest.createObj(action.projectId, action.obj).pipe(
                map(data => addObj({ obj: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateObj$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateObj),
            exhaustMap((action) => this.appRequest.updateObj(action.projectId, action.obj).pipe(
                map(data => replaceObj({ obj: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteObj$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteObj),
            exhaustMap((action) => this.appRequest.deleteObj(action.projectId, action.objId).pipe(
                map(data => removeObj({ objId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Arr

    getArrs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getArrs),
            exhaustMap((action) => this.appRequest.getArrs(action.projectId).pipe(
                map(data => addArrs({ arrs: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createArr$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createArr),
            exhaustMap((action) => this.appRequest.createArr(action.projectId, action.arr).pipe(
                map(data => addArr({ arr: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateArr$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateArr),
            exhaustMap((action) => this.appRequest.updateArr(action.projectId, action.arr).pipe(
                map(data => replaceArr({ arr: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteArr$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteArr),
            exhaustMap((action) => this.appRequest.deleteArr(action.projectId, action.arrId).pipe(
                map(data => removeArr({ arrId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Request

    getRequests$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getRequests),
            exhaustMap((action) => this.appRequest.getRequests(action.projectId).pipe(
                map(data => addRequests({ requests: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createRequest$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createRequest),
            exhaustMap((action) => this.appRequest.createRequest(action.projectId, action.request).pipe(
                mergeMap(data => [addRequest({ request: data }), createRequestSuccess({ request: data, wideRequest: action.wideRequest })]),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateRequest$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateRequest),
            exhaustMap((action) => this.appRequest.updateRequest(action.projectId, action.request).pipe(
                map(data => replaceRequest({ request: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteRequest$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteRequest),
            exhaustMap((action) => this.appRequest.deleteRequest(action.projectId, action.requestId).pipe(
                map(data => removeRequest({ requestId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Variable

    getVariables$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getVariables),
            exhaustMap((action) => this.appRequest.getVariables(action.projectId).pipe(
                map(data => addVariables({ variables: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    getVariableValue$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getVariableValue),
            exhaustMap((action) => this.appRequest.getVariableValue(action.projectId, action.variableId).pipe(
                mergeMap((data) => [replaceVariable({ variable: data }), getVariableValueSuccess()]),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createVariable$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createVariable),
            exhaustMap((action) => this.appRequest.createVariable(action.projectId, action.variable).pipe(
                map(data => addVariable({ variable: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateVariable$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateVariable),
            exhaustMap((action) => this.appRequest.updateVariable(action.projectId, action.variable).pipe(
                map(data => replaceVariable({ variable: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteVariable$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteVariable),
            exhaustMap((action) => this.appRequest.deleteVariable(action.projectId, action.variableId).pipe(
                map(data => removeVariable({ variableId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Websocket

    getWebsockets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getWebsockets),
            exhaustMap((action) => this.appRequest.getWebsockets(action.projectId).pipe(
                map(data => addWebsockets({ websockets: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createWebsocket$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createWebsocket),
            exhaustMap((action) => this.appRequest.createWebsocket(action.projectId, action.websocket).pipe(
                map(data => addWebsocket({ websocket: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateWebsocket$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateWebsocket),
            exhaustMap((action) => this.appRequest.updateWebsocket(action.projectId, action.websocket).pipe(
                map(data => replaceWebsocket({ websocket: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteWebsocket$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteWebsocket),
            exhaustMap((action) => this.appRequest.deleteWebsocket(action.projectId, action.websocketId).pipe(
                map(data => removeWebsocket({ websocketId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Queue

    getQueues$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getQueues),
            exhaustMap((action) => this.appRequest.getQueues(action.projectId).pipe(
                map(data => addQueues({ queues: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createQueue$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createQueue),
            exhaustMap((action) => this.appRequest.createQueue(action.projectId, action.queue).pipe(
                map(data => addQueue({ queue: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateQueue$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateQueue),
            exhaustMap((action) => this.appRequest.updateQueue(action.projectId, action.queue).pipe(
                map(data => replaceQueue({ queue: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteQueue$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteQueue),
            exhaustMap((action) => this.appRequest.deleteQueue(action.projectId, action.queueId).pipe(
                map(data => removeQueue({ queueId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Scheduler

    getSchedulers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getSchedulers),
            exhaustMap((action) => this.appRequest.getSchedulers(action.projectId).pipe(
                map(data => addSchedulers({ schedulers: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createScheduler$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createScheduler),
            exhaustMap((action) => this.appRequest.createScheduler(action.projectId, action.scheduler).pipe(
                map(data => addScheduler({ scheduler: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateScheduler$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateScheduler),
            exhaustMap((action) => this.appRequest.updateScheduler(action.projectId, action.scheduler).pipe(
                map(data => replaceScheduler({ scheduler: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteScheduler$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteScheduler),
            exhaustMap((action) => this.appRequest.deleteScheduler(action.projectId, action.schedulerId).pipe(
                map(data => removeScheduler({ schedulerId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Register

    getRegisters$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getRegisters),
            exhaustMap((action) => this.appRequest.getRegisters(action.projectId).pipe(
                map(data => addRegisters({ registers: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    createRegister$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createRegister),
            exhaustMap((action) => this.appRequest.createRegister(action.projectId, action.register).pipe(
                map(data => addRegister({ register: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    updateRegister$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateRegister),
            exhaustMap((action) => this.appRequest.updateRegister(action.projectId, action.register).pipe(
                map(data => replaceRegister({ register: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });
    
    deleteRegister$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteRegister),
            exhaustMap((action) => this.appRequest.deleteRegister(action.projectId, action.registerId).pipe(
                map(data => removeRegister({ registerId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Document

    getDocuments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDocuments),
            exhaustMap((action) => this.appRequest.getDocuments(action.projectId).pipe(
                map(data => addDocuments({ documents: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createDocument$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createDocument),
            exhaustMap((action) => this.appRequest.createDocument(action.projectId, action.document).pipe(
                map(data => addDocument({ document: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateDocument$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateDocument),
            exhaustMap((action) => this.appRequest.updateDocument(action.projectId, action.document).pipe(
                map(data => replaceDocument({ document: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteDocument$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteDocument),
            exhaustMap((action) => this.appRequest.deleteDocument(action.projectId, action.documentId).pipe(
                map(data => removeDocument({ documentId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Deploy

    getInstance$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getInstances),
            exhaustMap((action) => this.appRequest.getInstance(action.projectId).pipe(
                map(data => addInstances({ instance: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Deploy

    getDeploys$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDeploys),
            exhaustMap((action) => this.appRequest.getDeploys(action.projectId).pipe(
                map(data => addDeploys({ deploys: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    startDeploy$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(startDeploy),
            exhaustMap((action) => this.appRequest.startDeploy(action.projectId, action.deploy).pipe(
                mergeMap((data) => [addDeploy({ deploy: data }), deployStartSuccess()]),
                catchError(err => of(deployStartError(), requestError({ message: err.error, error: err })))
            )),
        );
    });

    stopDeploy$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(stopDeploy),
            exhaustMap((action) => this.appRequest.stopDeploy(action.projectId, action.deployId).pipe(
                mergeMap((data) => [replaceDeploy({ deploy: data }), deployStopSuccess()]),
                catchError(err => of(deployStopError(), requestError({ message: err.error, error: err })))
            )),
        );
    });

    getDeployStatus$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDeployStatus),
            exhaustMap((action) => this.appRequest.getDeployStatus(action.projectId, action.deployId).pipe(
                mergeMap((data) => [getDeployStatusSuccess({ status: data })]),
                catchError(err => of(getDeployStatusError(), requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Log

    getLogs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getLogs),
            exhaustMap((action) => this.appRequest.getLogs(action.projectId).pipe(
                map(data => addLogs({ logs: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createLog$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createLog),
            exhaustMap((action) => this.appRequest.createLog(action.projectId, action.log).pipe(
                map(data => addLog({ log: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateLog$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateLog),
            exhaustMap((action) => this.appRequest.updateLog(action.projectId, action.log).pipe(
                map(data => replaceLog({ log: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Job

    getJobs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getJobs),
            exhaustMap((action) => this.appRequest.getJobs(action.projectId).pipe(
                map(data => addJobs({ jobs: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Argtype

    getArgtypes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getArgtypes),
            exhaustMap(() => this.appRequest.getArgtypes().pipe(
                map(data => addArgtypes({ argtypes: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Key

    getKeys$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getKeys),
            exhaustMap((action) => this.appRequest.getKeys(action.projectId).pipe(
                map(data => addKeys({ keys: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createKey$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createKey),
            exhaustMap((action) => this.appRequest.createKey(action.projectId, action.key).pipe(
                map(data => addKey({ key: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateKey$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateKey),
            exhaustMap((action) => this.appRequest.updateKey(action.projectId, action.key).pipe(
                map(data => replaceKey({ key: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteKey$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteKey),
            exhaustMap((action) => this.appRequest.deleteKey(action.projectId, action.keyId).pipe(
                map(data => removeKey({ keyId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Billing

    getBillings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getBillings),
            exhaustMap((action) => this.appRequest.getBillings(action.projectId).pipe(
                map(data => addBillings({ billings: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createBilling$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createBilling),
            exhaustMap((action) => this.appRequest.createBilling(action.projectId, action.billing).pipe(
                mergeMap((data) => [addBilling({ billing: data }), billingSuccess()]),
                catchError(err => of(billingError(), requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateBilling$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateBilling),
            exhaustMap((action) => this.appRequest.updateBilling(action.projectId, action.billing).pipe(
                map(data => replaceBilling({ billing: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Usage

    getUsages$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUsages),
            exhaustMap((action) => this.appRequest.getUsages(action.projectId).pipe(
                map(data => addUsages({ usages: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createUsage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createUsage),
            exhaustMap((action) => this.appRequest.createUsage(action.projectId, action.usage).pipe(
                map(data => addUsage({ usage: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateUsage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateUsage),
            exhaustMap((action) => this.appRequest.updateUsage(action.projectId, action.usage).pipe(
                map(data => replaceUsage({ usage: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Sub

    getSubs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getSubs),
            exhaustMap((action) => this.appRequest.getSubs(action.projectId).pipe(
                map(data => addSubs({ subs: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createSub$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createSub),
            exhaustMap((action) => this.appRequest.createSub(action.projectId, action.sub).pipe(
                map(data => addSub({ sub: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateSub$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateSub),
            exhaustMap((action) => this.appRequest.updateSub(action.projectId, action.sub).pipe(
                map(data => replaceSub({ sub: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deleteSub$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteSub),
            exhaustMap((action) => this.appRequest.deleteSub(action.projectId, action.subId).pipe(
                map(data => removeSub({ subId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    // Pool

    getPools$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getPools),
            exhaustMap((action) => this.appRequest.getPools(action.projectId).pipe(
                map(data => addPools({ pools: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    createPool$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createPool),
            exhaustMap((action) => this.appRequest.createPool(action.projectId, action.pool).pipe(
                map(data => addPool({ pool: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updatePool$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePool),
            exhaustMap((action) => this.appRequest.updatePool(action.projectId, action.pool).pipe(
                map(data => replacePool({ pool: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    deletePool$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePool),
            exhaustMap((action) => this.appRequest.deletePool(action.projectId, action.poolId).pipe(
                map(data => removePool({ poolId: data.message })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

}
