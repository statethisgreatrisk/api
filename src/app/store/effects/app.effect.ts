import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AppRequest } from "../requests/app.request";
import { getUser, addUser, requestError, addAPI, addAPIs, createAPI, deleteAPI, getAPIs, removeAPI, replaceAPI, updateAPI, addStorage, addStorages, createStorage, deleteStorage, getStorages, removeStorage, replaceStorage, updateStorage, addSchema, addSchemas, createSchema, deleteSchema, getSchemas, removeSchema, replaceSchema, updateSchema, addValidator, addValidators, createValidator, deleteValidator, getValidators, removeValidator, replaceValidator, updateValidator, addWorkflow, addWorkflows, createWorkflow, deleteWorkflow, getWorkflows, removeWorkflow, replaceWorkflow, updateWorkflow, getApps, addApps, addBilling, addBillings, addDeploy, addDeploys, addKey, addKeys, addLog, addLogs, addUsage, addUsages, createBilling, createDeploy, createKey, createLog, createUsage, getBillings, getDeploys, getKeys, getLogs, getUsages, replaceBilling, replaceDeploy, replaceKey, replaceLog, replaceUsage, updateBilling, updateDeploy, updateKey, updateLog, updateUsage, signupUser, authError, authSuccess, resendUser, confirmUser, forgotUser, resetUser, loginUser, logoutUser, refreshUser, checkUser, addProject, addProjects, createProject, deleteProject, getProjects, removeProject, replaceProject, updateProject, deleteKey, removeKey } from "../actions/app.action";

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

    createDeploy$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createDeploy),
            exhaustMap((action) => this.appRequest.createDeploy(action.projectId, action.deploy).pipe(
                map(data => addDeploy({ deploy: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
            )),
        );
    });

    updateDeploy$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateDeploy),
            exhaustMap((action) => this.appRequest.updateDeploy(action.projectId, action.deploy).pipe(
                map(data => replaceDeploy({ deploy: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
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
                map(data => addBilling({ billing: data })),
                catchError(err => of(requestError({ message: err.error, error: err })))
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
}
